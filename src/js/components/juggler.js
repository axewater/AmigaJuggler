import * as THREE from 'three';
import { CONFIG } from '../config.js';
import { createBallMaterial } from './materials.js';

export function createJuggler(envMap) {
    const juggler = new THREE.Group();
    const ballGeometry = new THREE.SphereGeometry(CONFIG.BALL_RADIUS, 32, 32);

    // Head
    const head = new THREE.Mesh(ballGeometry, createBallMaterial(0xE0E0E0, envMap));
    head.position.set(0, 7, 0);
    head.castShadow = true;
    juggler.add(head);

    // Create torso
    const torsoColors = [0xFF0000, 0x0000FF, 0xFFFF00];
    torsoColors.forEach((color, i) => {
        const torso = new THREE.Mesh(ballGeometry, createBallMaterial(color, envMap));
        torso.position.set(0, 6 - i, 0);
        torso.castShadow = true;
        juggler.add(torso);
    });

    // Add arms
    addArms(juggler, ballGeometry, envMap);
    
    // Add legs
    addLegs(juggler, ballGeometry, envMap);

    return juggler;
}

function addArms(juggler, geometry, envMap) {
    // Left arm parts
    const leftArmParts = [
        { pos: [-1, 6, 0], color: 0x00FF00 },    // shoulder
        { pos: [-1.5, 5, 0], color: 0xFF00FF },  // arm
        { pos: [-2, 4, 0], color: 0xE0E0E0 }     // hand
    ];

    // Right arm parts (mirrored)
    const rightArmParts = leftArmParts.map(part => ({
        pos: [Math.abs(part.pos[0]), part.pos[1], part.pos[2]],
        color: part.color
    }));

    [...leftArmParts, ...rightArmParts].forEach(part => {
        const mesh = new THREE.Mesh(geometry, createBallMaterial(part.color, envMap));
        mesh.position.set(...part.pos);
        mesh.castShadow = true;
        juggler.add(mesh);
    });
}

function addLegs(juggler, geometry, envMap) {
    const legParts = [
        { pos: [-0.7, 3, 0], color: 0x00FFFF },  // hip
        { pos: [-0.7, 2, 0], color: 0xFFA500 },  // leg
        { pos: [-0.7, 1, 0], color: 0x8B4513 }   // foot
    ];

    // Create both legs (left and right)
    [-1, 1].forEach(side => {
        legParts.forEach(part => {
            const mesh = new THREE.Mesh(geometry, createBallMaterial(part.color, envMap));
            mesh.position.set(part.pos[0] * side, part.pos[1], part.pos[2]);
            mesh.castShadow = true;
            juggler.add(mesh);
        });
    });
}
