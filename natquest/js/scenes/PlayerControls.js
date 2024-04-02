export default class PlayerControls extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayerControls' });
         this.velocityChange = 2;// This is now an acceleration value for Matter.js
    }

    init(data) {
        this.player = data.player;
    }

    create() {
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });
    }

  update() {
    if (!this.player) return; // Guard clause
    console.log(this.player);
    // Ensure we're accessing the Matter.js body directly
    const playerBody = this.player.body;

    // Define a constant velocity value
    const velocity = this.velocityChange; // This might need adjustment based on your scale

    // Initialize velocity changes to 0
    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.left.isDown) {
        velocityX = -velocity; // Move left
    } else if (this.cursors.right.isDown) {
        velocityX = velocity; // Move right
    }

    if (this.cursors.up.isDown) {
        velocityY = -velocity; // Move up
    } else if (this.cursors.down.isDown) {
        velocityY = velocity; // Move down
    }

    // Set the player's velocity directly
    // Ensure we're working with the Matter body, which might require adjusting how you access the player's body
    Matter.Body.setVelocity(playerBody, { x: velocityX, y: velocityY });

    // Optional: Reset to zero velocity if no key is pressed
    if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
        Matter.Body.setVelocity(playerBody, { x: 0, y: 0 });
    }
}

}

window.PlayerControls = PlayerControls;
