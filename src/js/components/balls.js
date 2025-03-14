import * as THREE from 'three';
import { CONFIG } from '../config.js';
import { createBallMaterial } from './materials.js';

export function createJugglingBalls(scene, envMap) {
    const balls = [];
    const ballGeometry = new THREE.SphereGeometry(CONFIG.BALL_RADIUS * 0.8, 32, 32);

    CONFIG.JUGGLING.BALL_COLORS.forEach(color => {
        const ball = new THREE.Mesh(
            ballGeometry,
            createBallMaterial(color, envMap)
        );
        ball.castShadow = true;
        balls.push(ball);
        scene.add(ball);
    });

    return balls;
}

export function updateJugglingBalls(balls, time) {
    const { HEIGHT, WIDTH, DEPTH, SPEED } = CONFIG.JUGGLING;
    const phaseOffset = 2 * Math.PI / balls.length;

    balls.forEach((ball, i) => {
        const phase = time * SPEED + i * phaseOffset;
        const x = Math.sin(phase) * WIDTH;
        
        const normalizedY = ((phase + Math.PI) % (2 * Math.PI)) / (2 * Math.PI);
        let y;

        if (normalizedY < 0.5) {
            const t = normalizedY * 2;
            y = HEIGHT * (1 - Math.pow(2 * t - 1, 2));
        } else {
            const handHeight = 4;
            y = handHeight + Math.sin((normalizedY - 0.5) * 2 * Math.PI) * 0.5; // Add slight up-down movement
        }

        const z = Math.cos(phase) * DEPTH;
        ball.position.set(x, y, z);
    });
}
