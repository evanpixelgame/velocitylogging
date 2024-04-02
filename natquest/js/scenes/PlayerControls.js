export default class PlayerControls extends Phaser.Scene {
    constructor({ player, speed, velocity }) {
        super({ key: 'PlayerControls' });

        this.player = player;
        this.speed = speed;
        this.velocity = velocity;
        this.cursors = null; // Initialize cursors to null
    }

    create() {
        // Create controls for arrow keys and WASD
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });

        console.log("Received player in PlayerControls:", this.player, this.player.body); // Log player reference
        console.log("Received velocity in PlayerControls:", this.player.velocity, this.player.body.velocity);
    }

    update(time, delta) {
        // Update player controls logic
        if (!this.player) {
            return;
        }

        const playerBody = this.player.body;

        const velocityChange = 2; // Adjust based on desired speed
        if (this.cursors.left.isDown) {
            playerBody.velocity.x = -velocityChange;
        } else if (this.cursors.right.isDown) {
            playerBody.velocity.x = velocityChange;
        } else {
            playerBody.velocity.x = 0; // Stop horizontal movement when no input
        }

        if (this.cursors.up.isDown) {
            playerBody.velocity.y = -velocityChange;
        } else if (this.cursors.down.isDown) {
            playerBody.velocity.y = velocityChange;
        } else {
            playerBody.velocity.y = 0; // Stop vertical movement when no input
        }

        Matter.Body.setVelocity(playerBody, playerBody.velocity);
    }
}
