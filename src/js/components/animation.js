import { CONFIG } from '../config.js';

export function animateJuggler(juggler, time) {
    const { ARM_SWING_SPEED, ARM_SWING_AMOUNT, BODY_BOUNCE_AMOUNT, BODY_BOUNCE_SPEED } = CONFIG.ANIMATION;
    
    // Body bounce
    const bounce = Math.sin(time * BODY_BOUNCE_SPEED) * BODY_BOUNCE_AMOUNT;
    juggler.position.y = bounce;
    
    // Arm movement
    const leftArmSwing = Math.sin(time * ARM_SWING_SPEED) * ARM_SWING_AMOUNT + ARM_SWING_AMOUNT;
    const rightArmSwing = Math.sin(time * ARM_SWING_SPEED + Math.PI) * ARM_SWING_AMOUNT + ARM_SWING_AMOUNT;
    
    // Update arm positions
    juggler.children.forEach(part => {
        if (part.name === 'leftArm') {
            part.position.y = 5 - leftArmSwing;
        } else if (part.name === 'rightArm') {
            part.position.y = 5 - rightArmSwing;
        } else if (part.name === 'leftHand') {
            part.position.y = 4 - leftArmSwing * 1.5;
        } else if (part.name === 'rightHand') {
            part.position.y = 4 - rightArmSwing * 1.5;
        }
    });
}
