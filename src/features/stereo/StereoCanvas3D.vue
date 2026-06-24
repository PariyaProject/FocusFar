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

let animationFrameId: number;
let time = 0;
let lastCycleCount = 0;

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let cameraL: THREE.PerspectiveCamera;
let cameraR: THREE.PerspectiveCamera;
let mainCameraGroup: THREE.Group;
let particles: THREE.Points;

watch(() => props.isDynamic, (newVal) => {
  if (newVal) {
    time = 0;
    lastCycleCount = 0;
  }
});

const initThreeJS = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  scene = new THREE.Scene();
  scene.background = new THREE.Color('#0f172a');
  scene.fog = new THREE.FogExp2('#0f172a', 0.008);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xfffaed, 1.5);
  dirLight.position.set(50, 100, 20);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 500;
  dirLight.shadow.camera.left = -50;
  dirLight.shadow.camera.right = 50;
  dirLight.shadow.camera.top = 50;
  dirLight.shadow.camera.bottom = -50;
  scene.add(dirLight);

  // Environment Setup
  const groundGeo = new THREE.PlaneGeometry(2000, 2000, 100, 100);
  
  // Create low-poly terrain by displacing vertices
  const posAttribute = groundGeo.attributes.position;
  for (let i = 0; i < posAttribute.count; i++) {
    const x = posAttribute.getX(i);
    const y = posAttribute.getY(i); // This is Z in world coords because plane is rotated
    // Leave a wide flat road in the middle
    const absX = Math.abs(x);
    let blend = 0;
    if (absX > 25) {
      blend = Math.min((absX - 25) / 20, 1.0);
    }
    const z = (Math.sin(x * 0.1) * Math.cos(y * 0.1) * 4 + Math.sin(x * 0.03 + y * 0.02) * 15) * blend;
    posAttribute.setZ(i, z);
  }
  groundGeo.computeVertexNormals();

  const groundMat = new THREE.MeshStandardMaterial({ 
    color: '#1e293b', 
    flatShading: true,
    roughness: 0.8
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -2; // Lower the ground to avoid blocking the camera
  ground.receiveShadow = true;
  scene.add(ground);

  // Road
  const roadGeo = new THREE.PlaneGeometry(24, 2000);
  const roadMat = new THREE.MeshStandardMaterial({ color: '#334155', roughness: 0.9 });
  const road = new THREE.Mesh(roadGeo, roadMat);
  road.rotation.x = -Math.PI / 2;
  road.position.y = -1.95;
  road.receiveShadow = true;
  scene.add(road);

  // Road lines
  const lineGeo = new THREE.PlaneGeometry(0.6, 6);
  const lineMat = new THREE.MeshBasicMaterial({ color: '#cbd5e1' });
  for (let z = -1000; z < 100; z += 12) {
    const line = new THREE.Mesh(lineGeo, lineMat);
    line.rotation.x = -Math.PI / 2;
    line.position.set(0, -1.9, z);
    scene.add(line);
  }

  // Low-poly house
  const houseGroup = new THREE.Group();
  
  const houseBodyGeo = new THREE.BoxGeometry(16, 12, 16);
  const houseBodyMat = new THREE.MeshStandardMaterial({ color: '#f1f5f9' });
  const houseBody = new THREE.Mesh(houseBodyGeo, houseBodyMat);
  houseBody.position.y = 4;
  houseBody.castShadow = true;
  houseBody.receiveShadow = true;
  houseGroup.add(houseBody);

  const roofGeo = new THREE.ConeGeometry(14, 8, 4);
  const roofMat = new THREE.MeshStandardMaterial({ color: '#ef4444', flatShading: true });
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.y = 14;
  roof.rotation.y = Math.PI / 4;
  roof.castShadow = true;
  houseGroup.add(roof);

  houseGroup.position.set(0, 0, 50); // Target Z position
  scene.add(houseGroup);

  // Square Frames and Trees
  const treeGeo = new THREE.ConeGeometry(4, 16, 5);
  const treeMat = new THREE.MeshStandardMaterial({ color: '#059669', flatShading: true });
  const trunkGeo = new THREE.CylinderGeometry(0.8, 0.8, 3);
  const trunkMat = new THREE.MeshStandardMaterial({ color: '#78350f' });

  const frameMat = new THREE.MeshBasicMaterial({ color: '#38bdf8', transparent: true, opacity: 0.3, wireframe: true });
  
  // Reusable geometries for frames
  const pillarGeo = new THREE.BoxGeometry(0.6, 10, 0.6);
  const beamGeo = new THREE.BoxGeometry(16.6, 0.6, 0.6);

  for (let z = -1000; z < 50; z += 40) {
    // Square Frame
    const frameGroup = new THREE.Group();
    
    const leftPillar = new THREE.Mesh(pillarGeo, frameMat);
    leftPillar.position.set(-8, 5, 0);
    frameGroup.add(leftPillar);

    const rightPillar = new THREE.Mesh(pillarGeo, frameMat);
    rightPillar.position.set(8, 5, 0);
    frameGroup.add(rightPillar);

    const topBeam = new THREE.Mesh(beamGeo, frameMat);
    topBeam.position.set(0, 10, 0);
    frameGroup.add(topBeam);

    frameGroup.position.set(0, -2, z);
    scene.add(frameGroup);

    // Trees
    if (z % 40 === 0) {
      [ -12, 12 ].forEach(x => {
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.set(x + (Math.random()-0.5)*2, -0.5, z + (Math.random()-0.5)*10);
        trunk.castShadow = true;
        scene.add(trunk);
        
        const tree = new THREE.Mesh(treeGeo, treeMat);
        tree.position.set(trunk.position.x, 8, trunk.position.z);
        tree.castShadow = true;
        scene.add(tree);
      });
    }
  }

  // Draw Sun at infinity
  const sunGeo = new THREE.CircleGeometry(60, 32);
  const sunMat = new THREE.MeshBasicMaterial({ color: '#fde047' });
  const sun = new THREE.Mesh(sunGeo, sunMat);
  sun.position.set(0, 100, -1500);
  scene.add(sun);

  // Floating Fireflies (Particles)
  const particleCount = 2000;
  const particleGeo = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);
  const particleBasePos = new Float32Array(particleCount * 3);
  const particleRandoms = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    let x = (Math.random() - 0.5) * 100;
    let y = Math.random() * 30 - 2;
    let z = (Math.random() - 0.5) * 1000;
    
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
  const particleMat = new THREE.PointsMaterial({
    color: '#fde047',
    size: 0.5,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Cameras
  const fov = 60;
  cameraL = new THREE.PerspectiveCamera(fov, 1, 0.1, 2000);
  cameraR = new THREE.PerspectiveCamera(fov, 1, 0.1, 2000);
  mainCameraGroup = new THREE.Group();
  mainCameraGroup.add(cameraL);
  mainCameraGroup.add(cameraR);
  scene.add(mainCameraGroup);
};

const render = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const halfWidth = width / 2;

  // Handle dynamic resize
  if (canvas.width !== width || canvas.height !== height) {
    renderer.setSize(width, height, false);
  }

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

  const houseZ = 50; 
  const distanceRange = props.maxDistance - props.minDistance;
  let simulatedDistance = 0;
  
  if (props.mode === 'parallel') {
    simulatedDistance = props.minDistance + wave * distanceRange; 
  } else {
    simulatedDistance = props.maxDistance - wave * distanceRange;
  }

  const camZ = houseZ - simulatedDistance;
  mainCameraGroup.position.set(0, 1.5, camZ);

  // Animate particles
  if (!props.isPaused) {
    const pos = particles.geometry.attributes.position;
    const base = particles.geometry.attributes.basePosition;
    const rnds = particles.geometry.attributes.randoms;
    for (let i = 0; i < pos.count; i++) {
      let bx = base.getX(i);
      let by = base.getY(i);
      let bz = base.getZ(i);
      let rx = rnds.getX(i);
      let ry = rnds.getY(i);
      let rz = rnds.getZ(i);
      
      pos.setX(i, bx + Math.sin(time * 0.8 + rx) * 2);
      pos.setY(i, by + Math.cos(time * 0.6 + ry) * 2);
      pos.setZ(i, bz + Math.sin(time * 0.5 + rz) * 10);
    }
    pos.needsUpdate = true;
  }

  const sep_inf = props.mode === 'parallel' ? maxSep : minSep;
  const sep_near = props.mode === 'parallel' ? minSep : maxSep;

  const fovRad = (60 * Math.PI) / 180;
  
  // Gap between physical cameras in 3D world to achieve target disparity
  // Formula: G = 2 * Distance * tan(FOV/2) * (sep_inf - sep_near) / screenWidth
  let G = 2 * simulatedDistance * Math.tan(fovRad / 2) * (sep_inf - sep_near) / width;
  
  // Cap the gap to prevent cameras from moving inside the terrain or too far out
  if (G > 40) G = 40;
  if (G < -40) G = -40;

  cameraL.position.x = -G / 2;
  cameraR.position.x = G / 2;

  cameraL.aspect = halfWidth / height;
  cameraR.aspect = halfWidth / height;

  // setViewOffset logic to match infinity disparity perfectly
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
  if (renderer) {
    renderer.dispose();
  }
});
</script>

<template>
  <div class="w-full flex-1 min-h-[400px] relative overflow-hidden bg-[#0f172a] rounded-2xl shadow-inner">
    <canvas ref="canvasRef" class="w-full h-full block"></canvas>

    <!-- Stats -->
    <div v-if="isDynamic" class="absolute bottom-4 right-4 text-slate-400 font-mono text-sm pointer-events-none">
      {{ i18n.global.t('training.canvas.distance') }}: {{ (props.mode === 'parallel' ? minDistance + (Math.sin(time) + 1) / 2 * (maxDistance - minDistance) : maxDistance - (Math.sin(time) + 1) / 2 * (maxDistance - minDistance)).toFixed(1) }}m
    </div>
  </div>
</template>
