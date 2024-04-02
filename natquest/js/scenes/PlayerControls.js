//export default class PlayerControls {

/*
export default class PlayerControls extends Phaser.Scene {
    constructor(player, scene) {
        this.player = player;
        this.scene = scene;
        this.velocityChange = 2;
        this.cursors = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });
    } 
    
    */

    export default class PlayerControls extends Phaser.Scene {
    constructor(player, scene) {
        super({ key: 'PlayerControls' }); // Automatically calls the constructor of the superclass

        // Initialize properties
        this.player = player;
        this.scene = scene;
        this.velocityChange = 2;
          this.cursors = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });
    }

        create() {
              
          this.cursors = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });
        }

    update() {
        const playerBody = this.player.body;

        if (this.cursors.left.isDown) {
            playerBody.velocity.x = -this.velocityChange;
            console.log('forthcoingbook left');
        } else if (this.cursors.right.isDown) {
            playerBody.velocity.x = this.velocityChange;
        } else {
            playerBody.velocity.x = 0; // Stop horizontal movement when no input
        }

        if (this.cursors.up.isDown) {
            playerBody.velocity.y = -this.velocityChange;
        } else if (this.cursors.down.isDown) {
            playerBody.velocity.y = this.velocityChange;
        } else {
            playerBody.velocity.y = 0; // Stop vertical movement when no input
        }
    }
}




/*
export default class PlayerControls extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayerControls' });
 
        this.player = null;
        this.speed = 0;
       // this.velocity = { x: 0, y: 0 }
         this.velocityX = 0; // Pass velocityX
        this.velocityY = 0; 
       // this.cursors = null; // Initialize cursors to null
    }

    init(data) {
    this.player = data.player;
    this.speed = data.speed;
  //  this.velocity = data.velocity;
         this.velocityX = data.velocityX; // Pass velocityX
        this.velocityY = data.velocityY;
      //  this.scene = data.scene;
     //   this.map = data.map;

            console.log('Received Data:', data);
    console.log('Received Player:', data.player);
    console.log('Received Map:', data.map);
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
        // Update player controls logic
        if (!this.player) {
            return;
        }

        const playerBody = this.player.body;

        const velocityChange = 2; // Adjust based on desired speed
        if (this.cursors.left.isDown) {
            playerBody.velocity.x = -velocityChange;
            console.log('key is pressed left i think');
        } else if (this.cursors.right.isDown) {
            playerBody.velocity.x = velocityChange;
                  console.log('key is pressed right i think');
        } else {
            playerBody.velocity.x = 0; // Stop horizontal movement when no input
        }

        if (this.cursors.up.isDown) {
            playerBody.velocity.y = -velocityChange;
             console.log('key is pressed up i think');
        } else if (this.cursors.down.isDown) {
            playerBody.velocity.y = velocityChange;
             console.log('key is pressed down i think');
        } else {
            playerBody.velocity.y = 0; // Stop vertical movement when no input
        }

        playerBody.velocity.x = this.velocityX;
        playerBody.velocity.y = this.velocityY;
     //   Matter.Body.setVelocity(playerBody, playerBody.velocity.x);
     //   Matter.Body.setVelocity(playerBody, playerBody.velocity.y);
        Matter.Body.setVelocity(playerBody, { x: playerBody.velocity.x, y: playerBody.velocity.y });



        console.log("Received player in PlayerControls:", this.player, this.player.body); // Log player reference  //BOTH LOGGING SUCCESSFULLY
        console.log("Received velocity in PlayerControls:", this.player.velocity, this.player.body.velocity);
    }

}
*/
