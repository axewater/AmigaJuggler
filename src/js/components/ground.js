import * as THREE from 'three';

export function createGround() {
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x005500,
        roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2;
    ground.receiveShadow = true;
    return ground;
}

export function createCheckerboard() {
    const geometry = new THREE.PlaneGeometry(100, 100, 100, 100);
    const material = new THREE.MeshBasicMaterial({ vertexColors: true });
    
    const positions = geometry.attributes.position;
    const colors = [];
    
    for (let i = 0; i < positions.count; i++) {
        const x = Math.floor(positions.getX(i) + 50) / 2;
        const z = Math.floor(positions.getZ(i) + 50) / 2;
        
        if ((Math.floor(x) + Math.floor(z)) % 2 === 0) {
            colors.push(0.3, 0.3, 0.3);
        } else {
            colors.push(0.7, 0.7, 0.7);
        }
    }
    
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const checkerboard = new THREE.Mesh(geometry, material);
    checkerboard.rotation.x = -Math.PI / 2;
    checkerboard.position.y = -1.99;
    return checkerboard;
}
