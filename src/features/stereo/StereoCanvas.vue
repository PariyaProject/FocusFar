<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { i18n } from '../../i18n';

const props = defineProps<{
  mode: 'cross' | 'parallel';
  isDynamic: boolean;
  intensity: number;
  speed: number;
  isPaused: boolean;
  minDistance: number;
  maxDistance: number;
  usePhysicalCalibration: boolean;
  userIPD: number;
  screenDiagonal: number;
}>();

const emit = defineEmits<{
  (e: 'cycle', count: number): void
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number;
let time = 0;
let lastCycleCount = 0;

watch(() => props.isDynamic, (newVal) => {
  if (newVal) {
    time = 0;
    lastCycleCount = 0;
  }
});

// === PURE 3D GEOMETRY ENGINE ===
const focalLength = 600; // Pixels (determines Field of View)
const cameraY = 1.5; // Meters (Camera height above ground)

const drawBackground = (ctx: CanvasRenderingContext2D) => {
  // Stars at infinity
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  for (let i = 0; i < 150; i++) {
    let rx = (Math.sin(i * 1234) * 1500);
    let ry = -20 - (Math.cos(i * 4321) * 800);
    if (ry < -50) {
      // Stars are at infinity, so parallax is always 0 relative to local center
      ctx.beginPath(); 
      ctx.arc(rx, ry, Math.abs(Math.sin(i)) * 1.5 + 0.5, 0, 7); 
      ctx.fill();
    }
  }

  // Glowing Sun at infinity (moved higher up to prevent washing out the house)
  ctx.beginPath();
  ctx.arc(0, -70, 40, 0, 7);
  ctx.fillStyle = '#fde047';
  ctx.shadowColor = '#fde047';
  ctx.shadowBlur = 50;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Wireframe Mountains at infinity
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-4000, 0);
  for (let x = -4000; x <= 4000; x += 150) {
    // Asymmetric mountain generation using multiple sine waves
    let wave1 = Math.sin(x * 0.005);
    let wave2 = Math.cos(x * 0.011 + 1.5);
    let wave3 = Math.sin(x * 0.02 + 0.5);
    let height = -50 - (wave1 + wave2 * 0.5 + wave3 * 0.25) * 40;
    ctx.lineTo(x, height);
  }
  ctx.lineTo(4000, 0);
  ctx.stroke();

  // Horizon Line
  ctx.strokeStyle = '#475569';
  ctx.beginPath(); ctx.moveTo(-2000, 0); ctx.lineTo(2000, 0); ctx.stroke();
};

const drawGround = (ctx: CanvasRenderingContext2D, isLeft: boolean, camZ: number, physicalIPD: number) => {
  const project = (X: number, Y: number, Z: number) => {
    const Z_rel = Z - camZ;
    if (Z_rel <= 0.1) return null;
    const eyeOffsetX = isLeft ? -physicalIPD / 2 : physicalIPD / 2;
    const X_rel = X - eyeOffsetX;
    return {
      x: focalLength * X_rel / Z_rel,
      y: focalLength * Y / Z_rel
    };
  };

  const drawWirePoly = (pts: {x:number, y:number, z:number}[], color: string) => {
    const projs = pts.map(p => project(p.x, p.y, p.z));
    if (projs.includes(null)) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(projs[0]!.x, projs[0]!.y);
    for(let i=1; i<projs.length; i++) ctx.lineTo(projs[i]!.x, projs[i]!.y);
    ctx.lineTo(projs[0]!.x, projs[0]!.y);
    ctx.stroke();
  };

  const zStart = camZ + 1.0; // Restored to 1.0 since physical IPD is normal now
  const zEnd = camZ + 1000;

  // Wireframe Road Edges
  drawWirePoly([
    {x: -3.0, y: cameraY, z: zStart},
    {x: 3.0, y: cameraY, z: zStart},
    {x: 3.0, y: cameraY, z: zEnd},
    {x: -3.0, y: cameraY, z: zEnd}
  ], '#64748b');

  // Road Dashes (True 3D physical positions)
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 4;
  ctx.beginPath();
  let dashStartZ = Math.floor((camZ + 1.0) / 8) * 8;
  if (dashStartZ < camZ + 1.0) dashStartZ += 8;
  for (let z = dashStartZ; z < camZ + 250; z += 8) {
    let p1 = project(0, cameraY, z);
    let p2 = project(0, cameraY, z + 4.0);
    if (p1 && p2) {
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
  }
  ctx.stroke();

  // 3D Grid Lines (Optic flow)
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  let gridStartZ = Math.floor((camZ + 1.0) / 10) * 10;
  if (gridStartZ < camZ + 1.0) gridStartZ += 10;
  for (let z = gridStartZ; z < camZ + 250; z += 10) {
    let p1 = project(-100, cameraY, z);
    let p2 = project(100, cameraY, z);
    if (p1 && p2) {
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
  }
  for (let x = -30; x <= 30; x += 3) {
    if (Math.abs(x) <= 3.0) continue; // Skip lines on the road
    let p1 = project(x, cameraY, zStart);
    let p2 = project(x, cameraY, zEnd);
    if (p1 && p2) {
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
  }
  ctx.stroke();
};

const drawBeautifulHouse = (ctx: CanvasRenderingContext2D, isLeft: boolean, camZ: number, houseZ: number, visualScale: number, physicalIPD: number) => {
  const Z_rel = houseZ - camZ;
  if (Z_rel <= 0.1) return;
  const eyeOffsetX = isLeft ? -physicalIPD / 2 : physicalIPD / 2;
  const X_rel = 0 - eyeOffsetX;
  
  const x = focalLength * X_rel / Z_rel;
  
  // Drone lift-off safety
  const maxYOnScreen = 120;
  const maxHouseY = (maxYOnScreen * Z_rel) / focalLength;
  const houseY_world = Math.min(cameraY, maxHouseY);
  const y = focalLength * houseY_world / Z_rel;

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(visualScale, visualScale);
  
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.beginPath(); ctx.ellipse(0, 0, 40, 8, 0, 0, 7); ctx.fill();

  // House body
  const bodyGrad = ctx.createLinearGradient(0, -50, 0, 0);
  bodyGrad.addColorStop(0, '#f1f5f9');
  bodyGrad.addColorStop(1, '#94a3b8');
  ctx.fillStyle = bodyGrad;
  ctx.fillRect(-35, -50, 70, 50);
  ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.strokeRect(-35, -50, 70, 50);
  
  // Door
  ctx.fillStyle = '#6366f1'; ctx.fillRect(-10, -25, 20, 25);
  ctx.fillStyle = '#fcd34d'; ctx.beginPath(); ctx.arc(5, -12, 2.5, 0, 7); ctx.fill();
  
  // Windows
  ctx.fillStyle = '#7dd3fc';
  ctx.fillRect(-28, -30, 12, 12); ctx.fillRect(16, -30, 12, 12);
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5;
  ctx.beginPath(); 
  ctx.moveTo(-22, -30); ctx.lineTo(-22, -18); ctx.moveTo(-28, -24); ctx.lineTo(-16, -24);
  ctx.moveTo(22, -30); ctx.lineTo(22, -18); ctx.moveTo(16, -24); ctx.lineTo(28, -24);
  ctx.stroke();
  
  // Chimney
  ctx.fillStyle = '#b91c1c'; ctx.fillRect(15, -75, 10, 20);

  // Roof
  const roofGrad = ctx.createLinearGradient(0, -80, 0, -50);
  roofGrad.addColorStop(0, '#ef4444');
  roofGrad.addColorStop(1, '#7f1d1d');
  ctx.fillStyle = roofGrad;
  ctx.beginPath();
  ctx.moveTo(-45, -50); ctx.lineTo(0, -80); ctx.lineTo(45, -50);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  ctx.restore();

};

const render = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;

  // Clear screen ONCE with a unified solid dark background
  // This allows the left and right eyes to overlap without erasing each other's lines
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, width, height);
  
  const centerX = width / 2;
  const centerY = height / 2;

  let minSeparation = 120;
  let maxSeparation = 250;

  if (props.usePhysicalCalibration) {
    // Physical calibration mode
    // screen.width/height is the CSS pixel resolution
    const cssWidth = window.screen.width;
    const cssHeight = window.screen.height;
    const cssDiagonal = Math.sqrt(cssWidth * cssWidth + cssHeight * cssHeight);
    
    // Diagonal in mm
    const physicalDiagonalMm = props.screenDiagonal * 25.4;
    
    // Calculate how many CSS pixels represent 1 mm
    const pixelsPerMm = cssDiagonal / physicalDiagonalMm;
    
    // Calculate exact IPD in pixels
    const ipdPixels = props.userIPD * pixelsPerMm;

    if (props.mode === 'parallel') {
      // For parallel, max separation (infinity) is exactly the user's IPD
      // Min separation can be a bit closer (e.g. 50% of IPD)
      maxSeparation = ipdPixels;
      minSeparation = ipdPixels * 0.4;
    } else {
      // For cross mode, IPD dictates the realistic scale.
      // At infinity (minSeparation), it's still IPD.
      minSeparation = ipdPixels;
      // Max separation can be larger
      maxSeparation = ipdPixels + (width * 0.3);
    }
  } else {
    // Legacy intensity mode
    if (props.mode === 'parallel') {
      minSeparation = 80;
      maxSeparation = 80 + 220 * props.intensity;
    } else {
      minSeparation = 100;
      maxSeparation = 100 + Math.min(width * 0.5, 600) * props.intensity;
    }
  }

  if (props.isDynamic && !props.isPaused) {
    time += 0.01 * props.speed;
    const currentCycleCount = Math.floor(time / (Math.PI * 2));
    if (currentCycleCount > lastCycleCount) {
      lastCycleCount = currentCycleCount;
      emit('cycle', currentCycleCount);
    }
  }
  
  // Wave goes from 0 to 1
  const wave = (Math.sin(time) + 1) / 2;

  // Smooth parameter lerping to prevent instant snapping when user adjusts UI settings
  if (typeof (window as any).currentMinSep === 'undefined') (window as any).currentMinSep = minSeparation;
  if (typeof (window as any).currentMaxSep === 'undefined') (window as any).currentMaxSep = maxSeparation;
  
  (window as any).currentMinSep += (minSeparation - (window as any).currentMinSep) * 0.05;
  (window as any).currentMaxSep += (maxSeparation - (window as any).currentMaxSep) * 0.05;

  const minSep = (window as any).currentMinSep;
  const maxSep = (window as any).currentMaxSep;

  // --- TRUE OPTICAL KINEMATICS ---
  // The user wants the ENTIRE WORLD to breathe in and out together ("往复效果").
  // To achieve this physically, the target (house) stays fixed, and the CAMERA moves back and forth.
  const houseZ = 50; 
  let simulatedDistance = 0; // The actual Z_rel distance

  // We use the configured distance range from props.
  const distanceRange = props.maxDistance - props.minDistance;
  
  if (props.mode === 'parallel') {
    simulatedDistance = props.minDistance + wave * distanceRange; 
  } else {
    simulatedDistance = props.maxDistance - wave * distanceRange;
  }

  // Camera moves to maintain simulatedDistance from the house
  const camZ = houseZ - simulatedDistance;

  // Visual scale is STRICTLY tied to perspective physics to prevent Vergence-Accommodation Conflict!
  const baseScale = 25.0; 
  const visualScale = baseScale / simulatedDistance;

  // --- EXACT PHYSICAL IPD CALCULATION ---
  const sep_inf = props.mode === 'parallel' ? maxSep : minSep;
  const sep_near = props.mode === 'parallel' ? minSep : maxSep;
  const viewportDistance = sep_inf;
  
  // Calibrate physical IPD to yield normal human IPD, preventing perspective distortion
  const calibrationDistance = 0.3;
  const physicalIPD = ((sep_inf - sep_near) * calibrationDistance) / focalLength;

  const leftCenter = centerX - viewportDistance / 2;
  const rightCenter = centerX + viewportDistance / 2;

  // Draw Left Eye View
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, width / 2, height);
  ctx.clip();
  ctx.globalCompositeOperation = 'screen'; // Environment is additive
  ctx.translate(leftCenter, centerY);
  drawBackground(ctx);
  drawGround(ctx, true, camZ, physicalIPD);
  ctx.globalCompositeOperation = 'source-over'; // House is solid color
  drawBeautifulHouse(ctx, true, camZ, houseZ, visualScale, physicalIPD);
  ctx.restore();

  // Draw Right Eye View
  ctx.save();
  ctx.beginPath();
  ctx.rect(width / 2, 0, width / 2, height);
  ctx.clip();
  ctx.globalCompositeOperation = 'screen'; // Environment is additive
  ctx.translate(rightCenter, centerY);
  drawBackground(ctx);
  drawGround(ctx, false, camZ, physicalIPD);
  ctx.globalCompositeOperation = 'source-over'; // House is solid color
  drawBeautifulHouse(ctx, false, camZ, houseZ, visualScale, physicalIPD);
  ctx.restore();

  // Draw a subtle center divider to help visually separate the viewports
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, height);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // Draw alignment dots (helps with initial lock)
  // Dots sit exactly below the house
  const dotY = centerY + 100 * visualScale;
  const houseProjLeft = focalLength * (physicalIPD / 2) / simulatedDistance;
  const houseProjRight = focalLength * (-physicalIPD / 2) / simulatedDistance;
  const leftX = leftCenter + houseProjLeft;
  const rightX = rightCenter + houseProjRight;
  ctx.beginPath(); ctx.arc(leftX, dotY, 4 * Math.min(1.5, visualScale), 0, Math.PI*2); ctx.fillStyle = '#cbd5e1'; ctx.fill();
  ctx.beginPath(); ctx.arc(rightX, dotY, 4 * Math.min(1.5, visualScale), 0, Math.PI*2); ctx.fillStyle = '#cbd5e1'; ctx.fill();

  // Draw unobtrusive text in bottom right corner
  if (props.isDynamic) {
    ctx.fillStyle = '#475569';
    ctx.font = '14px monospace';
    ctx.textAlign = 'right';
    const distText = simulatedDistance.toFixed(1) + 'm';
    const label = i18n.global.t('training.canvas.distance');
    ctx.fillText(`${label}: ${distText}`, width - 20, height - 20);
  }

  animationFrameId = requestAnimationFrame(render);
};

const resize = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const parent = canvas.parentElement;
  if (parent) {
    const dpr = window.devicePixelRatio || 1;
    // We want the canvas to fill the parent
    canvas.width = parent.clientWidth * dpr;
    canvas.height = parent.clientHeight * dpr;
    canvas.style.width = `${parent.clientWidth}px`;
    canvas.style.height = `${parent.clientHeight}px`;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }
};

onMounted(() => {
  window.addEventListener('resize', resize);
  // wait a tick for layout
  setTimeout(() => {
    resize();
    render();
  }, 0);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize);
  cancelAnimationFrame(animationFrameId);
});
</script>

<template>
  <div class="w-full flex-1 min-h-[400px] relative overflow-hidden bg-[#0f172a] rounded-2xl shadow-inner">
    <canvas ref="canvasRef" class="w-full h-full block"></canvas>
  </div>
</template>
