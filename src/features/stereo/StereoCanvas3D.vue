<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { i18n } from '../../i18n';
import * as THREE from 'three';

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
const statsRef = ref<HTMLElement | null>(null);

let resizeObserver: ResizeObserver | null = null;
let containerWidth = 800;
let containerHeight = 400;

let animationFrameId: number;
let time = 0;
let lastCycleCount = 0;

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let cameraL: THREE.PerspectiveCamera;
let cameraR: THREE.PerspectiveCamera;
let mainCameraGroup: THREE.Group;
let focalCrystal: THREE.Group;
let tunnelRings: THREE.Group;
let backgroundNebula: THREE.Mesh;
let particleSystem: THREE.Points;

watch(() => props.isDynamic, (newVal) => {
  if (newVal) {
    time = 0;
    lastCycleCount = 0;
  }
});

const initThreeJS = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(window.devicePixelRatio);
  
  const parent = canvas.parentElement;
  if (parent) {
    resizeObserver = new ResizeObserver((entries) => {
      if (entries.length > 0) {
        const { width, height } = entries[0].contentRect;
        containerWidth = width;
        containerHeight = height;
        renderer.setSize(width, height, false);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
    });
    resizeObserver.observe(parent);
  } else {
    containerWidth = canvas.clientWidth;
    containerHeight = canvas.clientHeight;
    renderer.setSize(containerWidth, containerHeight, false);
  }
  
  scene = new THREE.Scene();
  scene.background = new THREE.Color('#050510');
  scene.fog = new THREE.FogExp2('#050510', 0.0025);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  const neonCyan = new THREE.PointLight(0x00f3ff, 2, 200);
  neonCyan.position.set(-20, 10, 20);
  scene.add(neonCyan);

  const neonMagenta = new THREE.PointLight(0xff00ff, 2, 200);
  neonMagenta.position.set(20, -10, 80);
  scene.add(neonMagenta);

  // Background Nebula (Wormhole Core)
  const nebulaGeo = new THREE.PlaneGeometry(1000, 1000);
  
  const canvasGradient = document.createElement('canvas');
  canvasGradient.width = 512;
  canvasGradient.height = 512;
  const ctx = canvasGradient.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.1, 'rgba(0, 243, 255, 0.8)');
    grad.addColorStop(0.5, 'rgba(138, 43, 226, 0.4)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
  }
  
  const nebulaTex = new THREE.CanvasTexture(canvasGradient);
  const nebulaMat = new THREE.MeshBasicMaterial({
    map: nebulaTex,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    color: 0xffffff
  });
  
  backgroundNebula = new THREE.Mesh(nebulaGeo, nebulaMat);
  backgroundNebula.position.set(0, 0, -1500);
  scene.add(backgroundNebula);

  // Starfield
  const particleCount = 5000;
  const particleGeo = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);
  const particleBasePos = new Float32Array(particleCount * 3);
  const particleRandoms = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    // Cylinder distribution for a tunnel
    const radius = 15 + Math.random() * 150;
    const theta = Math.random() * Math.PI * 2;
    const x = Math.cos(theta) * radius;
    const y = Math.sin(theta) * radius;
    const z = (Math.random() - 0.5) * 3000;
    
    particlePos[i * 3] = x;
    particlePos[i * 3 + 1] = y;
    particlePos[i * 3 + 2] = z;
    
    particleBasePos[i * 3] = x;
    particleBasePos[i * 3 + 1] = y;
    particleBasePos[i * 3 + 2] = z;
    
    particleRandoms[i * 3] = Math.random() * Math.PI * 2;
    particleRandoms[i * 3 + 1] = Math.random() * Math.PI * 2;
    particleRandoms[i * 3 + 2] = Math.random() * Math.PI * 2;
  }
  
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
  particleGeo.setAttribute('basePosition', new THREE.BufferAttribute(particleBasePos, 3));
  particleGeo.setAttribute('randoms', new THREE.BufferAttribute(particleRandoms, 3));
  
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x88ccff,
    size: 0.8,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  
  particleSystem = new THREE.Points(particleGeo, particleMaterial);
  scene.add(particleSystem);

  // Tunnel Rings (Replacing Trees/Road)
  tunnelRings = new THREE.Group();
  const ringGeo = new THREE.TorusGeometry(18, 0.15, 8, 64);
  const ringMat = new THREE.MeshBasicMaterial({ 
    color: 0x00f3ff, 
    wireframe: true, 
    transparent: true, 
    opacity: 0.15,
    blending: THREE.AdditiveBlending 
  });
  
  for (let z = -1000; z < 1000; z += 50) {
    // Skip rings near the focal crystal to avoid intersection
    if (Math.abs(z - 50) < 30) continue;
    
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(0, 0, z);
    
    // Add some random geometric debris
    const debrisGeo = new THREE.IcosahedronGeometry(Math.random() * 2 + 0.5, 0);
    const debrisMat = new THREE.MeshStandardMaterial({ 
      color: 0x8a2be2, 
      roughness: 0.2, 
      metalness: 0.8,
      flatShading: true
    });
    
    for(let j=0; j<3; j++) {
      const debris = new THREE.Mesh(debrisGeo, debrisMat);
      const angle = Math.random() * Math.PI * 2;
      const dRadius = 22 + Math.random() * 10;
      debris.position.set(Math.cos(angle) * dRadius, Math.sin(angle) * dRadius, z + (Math.random()-0.5)*20);
      debris.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, 0);
      tunnelRings.add(debris);
    }
    
    tunnelRings.add(ring);
  }
  scene.add(tunnelRings);

  // Focal Crystal (Replacing the House)
  focalCrystal = new THREE.Group();
  
  // Outer wireframe crystal
  const outerGeo = new THREE.IcosahedronGeometry(1.25, 0);
  const outerMat = new THREE.MeshBasicMaterial({ 
    color: 0xff00ff, 
    wireframe: true,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending
  });
  const outerCrystal = new THREE.Mesh(outerGeo, outerMat);
  focalCrystal.add(outerCrystal);
  
  // Inner solid crystal
  const innerGeo = new THREE.OctahedronGeometry(0.75, 0);
  const innerMat = new THREE.MeshStandardMaterial({ 
    color: 0x00f3ff,
    roughness: 0.1,
    metalness: 0.9,
    flatShading: true,
    emissive: 0x004488,
    emissiveIntensity: 0.5
  });
  const innerCrystal = new THREE.Mesh(innerGeo, innerMat);
  focalCrystal.add(innerCrystal);
  
  // Internal light to make it glow
  const crystalLight = new THREE.PointLight(0xffffff, 2, 50);
  focalCrystal.add(crystalLight);

  focalCrystal.position.set(0, 0, 50); // Target Z position
  scene.add(focalCrystal);

  // Cameras
  const fov = 60;
  cameraL = new THREE.PerspectiveCamera(fov, 1, 0.1, 3000);
  cameraR = new THREE.PerspectiveCamera(fov, 1, 0.1, 3000);
  mainCameraGroup = new THREE.Group();
  mainCameraGroup.add(cameraL);
  mainCameraGroup.add(cameraR);
  scene.add(mainCameraGroup);
};

const render = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const width = containerWidth;
  const height = containerHeight;
  const halfWidth = width / 2;

  let minSeparation = 120;
  let maxSeparation = 250;

  if (props.usePhysicalCalibration) {
    const cssWidth = window.screen.width;
    const cssHeight = window.screen.height;
    const cssDiagonal = Math.sqrt(cssWidth * cssWidth + cssHeight * cssHeight);
    const physicalDiagonalMm = props.screenDiagonal * 25.4;
    const pixelsPerMm = cssDiagonal / physicalDiagonalMm;
    const ipdPixels = props.userIPD * pixelsPerMm;

    if (props.mode === 'parallel') {
      maxSeparation = ipdPixels;
      minSeparation = ipdPixels * 0.4;
    } else {
      minSeparation = ipdPixels;
      maxSeparation = ipdPixels + (width * 0.3);
    }
  } else {
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
  
  const wave = (Math.sin(time) + 1) / 2;

  if (typeof (window as any).currentMinSep === 'undefined') (window as any).currentMinSep = minSeparation;
  if (typeof (window as any).currentMaxSep === 'undefined') (window as any).currentMaxSep = maxSeparation;
  
  (window as any).currentMinSep += (minSeparation - (window as any).currentMinSep) * 0.05;
  (window as any).currentMaxSep += (maxSeparation - (window as any).currentMaxSep) * 0.05;

  const minSep = (window as any).currentMinSep;
  const maxSep = (window as any).currentMaxSep;

  const distanceRange = props.maxDistance - props.minDistance;
  let simulatedDistance = 0;
  
  if (props.mode === 'parallel') {
    simulatedDistance = props.minDistance + wave * distanceRange; 
  } else {
    simulatedDistance = props.maxDistance - wave * distanceRange;
  }
  
  // Update UI stats directly avoiding Vue reactivity overhead per frame
  if (statsRef.value && props.isDynamic) {
    const label = i18n.global.t('training.canvas.distance');
    statsRef.value.innerText = `${label}: ${simulatedDistance.toFixed(1)}m`;
  }

  // Camera moves to maintain simulatedDistance from the target crystal
  // Since camera looks down the -Z axis, the camera must be at crystalZ + simulatedDistance
  const crystalZ = 50; 
  const camZ = crystalZ + simulatedDistance;
  mainCameraGroup.position.set(0, 1.5, camZ);

  // Animate objects
  if (!props.isPaused) {
    // Rotate the focal crystal
    if (focalCrystal) {
      focalCrystal.rotation.x += 0.005 * props.speed;
      focalCrystal.rotation.y += 0.01 * props.speed;
      focalCrystal.children[0].rotation.y -= 0.015 * props.speed; // Inner crystal counter-rotates
    }

    // Slowly rotate the entire tunnel
    if (tunnelRings) {
      tunnelRings.rotation.z += 0.001 * props.speed;
    }

    // Rotate background nebula slowly
    if (backgroundNebula) {
      backgroundNebula.rotation.z -= 0.0005 * props.speed;
    }

    // Animate particles (flowing towards the camera)
    if (particleSystem) {
      const pos = particleSystem.geometry.attributes.position;
      const base = particleSystem.geometry.attributes.basePosition;
      const rnds = particleSystem.geometry.attributes.randoms;
      
      for (let i = 0; i < pos.count; i++) {
        let bx = base.getX(i);
        let by = base.getY(i);
        let bz = base.getZ(i);
        let rx = rnds.getX(i);
        let ry = rnds.getY(i);
        let rz = rnds.getZ(i);
        
        // Particles flow from deep space towards the camera
        let newZ = bz + (time * 100 * props.speed) % 3000;
        if (newZ > 1000) newZ -= 3000; // Loop back
        
        // Add some swirling motion based on time
        const swirlAngle = time * 0.5 + rz;
        const radiusOffset = Math.sin(time * 2 + rx) * 5;
        
        const currentRadius = Math.sqrt(bx*bx + by*by) + radiusOffset;
        const currentTheta = Math.atan2(by, bx) + swirlAngle * 0.1;
        
        pos.setX(i, Math.cos(currentTheta) * currentRadius);
        pos.setY(i, Math.sin(currentTheta) * currentRadius);
        pos.setZ(i, newZ);
      }
      pos.needsUpdate = true;
    }
  }

  const fovRad = (60 * Math.PI) / 180;
  const focalLength = height / (2 * Math.tan(fovRad / 2));

  const sep_inf = props.mode === 'parallel' ? maxSep : minSep;
  const sep_near = props.mode === 'parallel' ? minSep : maxSep;

  // Calculate physically correct IPD based on desired disparity range
  // Using 0.3m as the physical calibration distance (human reading distance) to perfectly match 2D mode's kinematic ratio!
  const calibrationDistance = 0.3;
  const G_mag = Math.abs(maxSep - minSep) * calibrationDistance / focalLength;
  const G = props.mode === 'parallel' ? G_mag : -G_mag;

  cameraL.position.x = -G / 2;
  cameraR.position.x = G / 2;

  cameraL.aspect = halfWidth / height;
  cameraR.aspect = halfWidth / height;

  // Shift viewports so objects at infinity have exactly sep_inf pixel separation
  const shift = (halfWidth - sep_inf) / 2;
  
  cameraL.setViewOffset(halfWidth, height, -shift, 0, halfWidth, height);
  cameraR.setViewOffset(halfWidth, height, shift, 0, halfWidth, height);

  cameraL.updateProjectionMatrix();
  cameraR.updateProjectionMatrix();

  renderer.setScissorTest(true);

  // Render Left
  renderer.setViewport(0, 0, halfWidth, height);
  renderer.setScissor(0, 0, halfWidth, height);
  renderer.render(scene, cameraL);

  // Render Right
  renderer.setViewport(halfWidth, 0, halfWidth, height);
  renderer.setScissor(halfWidth, 0, halfWidth, height);
  renderer.render(scene, cameraR);
  
  animationFrameId = requestAnimationFrame(render);
};

onMounted(() => {
  initThreeJS();
  render();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId);
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  if (renderer) {
    renderer.dispose();
  }
});
</script>

<template>
  <div class="w-full flex-1 min-h-[400px] relative overflow-hidden bg-[#0f172a] rounded-2xl shadow-inner">
    <canvas ref="canvasRef" class="w-full h-full block"></canvas>

    <!-- Stats -->
    <div v-if="isDynamic" ref="statsRef" class="absolute bottom-4 right-4 text-slate-400 font-mono text-sm pointer-events-none">
      {{ i18n.global.t('training.canvas.distance') }}: 0.0m
    </div>
  </div>
</template>
