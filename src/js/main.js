import * as THREE from 'three';
import { CONFIG } from './config.js';
import { createScene, createCamera, createRenderer } from './components/scene.js';
import { createLighting } from './components/lighting.js';
import { createGround } from './components/ground.js';
import { createEnvironment } from './components/environment.js';
import { createJuggler } from './components/juggler.js';
import { createJugglingBalls, updateJugglingBalls } from './components/balls.js';
import { animateJuggler } from './components/animation.js';
import { setupResizeHandler } from './utils/resize.js';

function init() {
    // Create basic scene elements
    const scene = createScene();
    const camera = createCamera();
    const renderer = createRenderer();
    document.body.appendChild(renderer.domElement);

    // Add lighting
    const { ambientLight, directionalLight } = createLighting();
    scene.add(ambientLight);
    scene.add(directionalLight);

    // Add ground
    const ground = createGround();
    scene.add(ground);

    // Create environment
    const { cubeCamera, cubeRenderTarget, sky } = createEnvironment();
    scene.add(cubeCamera);
    scene.add(sky);

    // Create juggler and balls
    const juggler = createJuggler(scene, cubeRenderTarget.texture);
    scene.add(juggler);

    const balls = createJugglingBalls(scene, cubeRenderTarget.texture);
    balls.forEach(ball => scene.add(ball));

    // Setup resize handler
    setupResizeHandler(camera, renderer);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        const time = performance.now() / 1000;

        // Update environment map occasionally
        if (Math.floor(time * 10) % 10 === 0) {
            juggler.visible = false;
            balls.forEach(ball => ball.visible = false);
            cubeCamera.update(renderer, scene);
            juggler.visible = true;
            balls.forEach(ball => ball.visible = true);
        }

        // Update animations
        updateJugglingBalls(balls, time);
        animateJuggler(juggler, time);

        renderer.render(scene, camera);
    }

    animate();
}

init();
