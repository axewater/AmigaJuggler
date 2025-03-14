import * as THREE from 'three';

export function createLighting() {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    
    return { ambientLight, directionalLight };
}
