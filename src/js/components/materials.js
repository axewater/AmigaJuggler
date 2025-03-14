import * as THREE from 'three';

export function createBallMaterial(color, envMap) {
    return new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.8,
        roughness: 0.2,
        envMap: envMap
    });
}
