export default class PlayerControls extends Phaser.Scene {
    constructor({ player, speed, velocity }) {
        super({ key: 'PlayerControls' });

        this.player = player;
        this.speed = speed;
        this.velocity = velocity;
 /*
        // Create controls for arrow keys and WASD
  this.cursors = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });
  */
    }

    init(data) {
    // Retrieve player reference and speed from the data object
    this.player = data.player;
   this.velocity = data.velocity;
  console.log("Received player in PlayerControls:", this.player, this.player.body); // Log player reference
        console.log("Received velocity in PlayerControls:", this.player.velocity, this.player.body.velocity);

                  // Create controls for arrow keys and WASD
  this.cursors = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });
  
  }

  
  preload() {

  }

  create() {

          // Create controls for arrow keys and WASD
  this.cursors = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });
  

      
  }


update(time, delta) {

      console.log("Received player in PlayerControls:", this.player, this.player.body); // Log player reference
        console.log("Received velocity in PlayerControls:", this.player.velocity, this.player.body.velocity);
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

/*
    // Play appropriate animation based on movement direction
    if (velocityX !== 0 || velocityY !== 0) {
        if (velocityX > 0) {
            this.player.anims.play('walking-right', true);
        } else if (velocityX < 0) {
            this.player.anims.play('walking-left', true);
        } else if (velocityY < 0) {
            this.player.anims.play('walking-down', true);
        } else if (velocityY > 0) {
            this.player.anims.play('walking-up', true);
        }
    } else {
        // Stop animation when no movement
        this.player.anims.stop();
    }
   this.player.setRotation(0);
*/
}
