import * as THREE from 'three';

export function createGround() {
    const groundGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,  // White (will be tinted by the texture)
        roughness: 0.8,
        side: THREE.DoubleSide,
    });

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2;
    ground.receiveShadow = true;

    // Create checkerboard texture
    const size = 512;  // Increased size for better quality
    const data = new Uint8Array(size * size * 3);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const stride = (i * size + j) * 3;
            const isGreen = (i + j) % 2 === 0;
            data[stride] = isGreen ? 0 : 255;      // Red
            data[stride + 1] = isGreen ? 128 : 255; // Green
            data[stride + 2] = 0;                 // Blue
        }
    }
    
    const texture = new THREE.DataTexture(data, size, size, THREE.RGBFormat);
    texture.repeat.set(4, 4);  // Repeat the texture 4 times in each direction
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    groundMaterial.map = texture;

    return ground;
}
