const minSep = 100;
const maxSep = 300;
const focalLength = 600;
const calibrationDistance = 0.3;
const simulatedDistance = 0.3; // nearest

const sep_inf = maxSep; // parallel mode
const G_mag = Math.abs(maxSep - minSep) * calibrationDistance / focalLength;
const G = G_mag; // parallel mode

function simulate(containerWidth, containerHeight) {
    const width = containerWidth;
    const height = containerHeight;
    const halfWidth = width / 2;
    
    const fovRad = 2 * Math.atan(height / (2 * focalLength));
    
    const shift = (halfWidth - sep_inf) / 2;
    
    // We want to calculate the screen_x of the left sun in the left viewport.
    // The sun is at (0, 0, -simulatedDistance). Relative to cameraL (-G/2, 0, 0):
    // It's at x = G/2.
    // In THREE.js, the projection matrix maps x to NDC_x.
    // Near plane width: W = 2 * near * tan(fov/2) * aspect = 2 * near * (height / (2 * focalLength)) * (halfWidth / height)
    // W = near * halfWidth / focalLength.
    // A point at Z = -simulatedDistance projects to near plane x = (G/2) * (near / simulatedDistance).
    // The camera has an offset. The near plane is shifted by -shift * (near / focalLength).
    // So relative to the near plane center, the object is at: (G/2) * (near / simulatedDistance) + shift * (near / focalLength).
    // The left edge of the near plane is at -W/2.
    // So distance from left edge = (W/2) + (G/2) * (near / simulatedDistance) + shift * (near / focalLength).
    // The viewport width is halfWidth pixels.
    // So screen_x = (Distance from left edge) / W * halfWidth.
    // screen_x = [ (near * halfWidth / focalLength / 2) + (G/2) * (near / simulatedDistance) + shift * (near / focalLength) ] / (near * halfWidth / focalLength) * halfWidth
    // screen_x = [ halfWidth / 2 + (G/2) * (focalLength / simulatedDistance) + shift ]
    
    // Substitute G = (maxSep - minSep) * calibrationDistance / focalLength
    // (G/2) * (focalLength / simulatedDistance) = (maxSep - minSep) * (calibrationDistance / simulatedDistance) / 2 = parallax / 2.
    const parallax = (maxSep - minSep) * (calibrationDistance / simulatedDistance);
    
    const screen_x_L_local = halfWidth / 2 + parallax / 2 + shift;
    const absolute_L = screen_x_L_local; // Left viewport starts at 0
    
    // Right sun
    // Object relative to cameraR (G/2, 0, 0) is at x = -G/2.
    // Offset is +shift.
    // screen_x_R_local = halfWidth / 2 - parallax / 2 - shift;
    const screen_x_R_local = halfWidth / 2 - parallax / 2 - shift;
    const absolute_R = halfWidth + screen_x_R_local; // Right viewport starts at halfWidth
    
    console.log(`Width: ${width}, Height: ${height}`);
    console.log(`Left Sun Absolute X: ${absolute_L}`);
    console.log(`Right Sun Absolute X: ${absolute_R}`);
    console.log(`Distance between suns: ${absolute_R - absolute_L}`);
    console.log(`Left sun from screen center: ${halfWidth - absolute_L}`);
    console.log(`Right sun from screen center: ${absolute_R - halfWidth}`);
    console.log('---------------------------');
}

simulate(800, 600);
simulate(1200, 600);
simulate(1200, 800);
