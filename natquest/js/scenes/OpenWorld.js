import { PlayerSprite } from './PlayerSprite.js';
import { sensorMapSet, createCollisionObjects, sensorHandler } from './collisionHandler.js';

export default class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    this.map = null;
    this.player = null;
    this.collisionObjects = null; 
    this.transitionSensors = null; // Add transitionSensors property
    this.engine = null;
   this.world = null;
   this.cursors = null;
  }

  init(data) {
        this.openWorldScene = data.OpenWorld;
  }
      
  preload() {
    
  }
       
  create() {
    this.matterEngine = Phaser.Physics.Matter.Matter.World;
    this.engine = this.matter.world;
     this.world = this.matterEngine.create({
    // your Matter.js world options here
  });

    this.scene.launch('CompUI', { OpenWorld: this, player: this.player, speed: this.speed, map: this.map, camera: this.cameras.main });

    // Load map
    const map = this.make.tilemap({ key: 'map' });

    // Load tileset
    const tilesetsData = [
        { name: 'tilesheetTerrain', key: 'tilesheetTerrain' },
        { name: 'tilesheetInterior', key: 'tilesheetInterior' },
        { name: 'tilesheetBuildings', key: 'tilesheetBuildings' },
        { name: 'tilesheetWalls', key: 'tilesheetWalls' },
        { name: 'tilesheetObjects', key: 'tilesheetObjects' },
        { name: 'tilesheetFlourishes', key: 'tilesheetFlourishes' }
    ];

    const tilesets = [];
    tilesetsData.forEach(tilesetData => {
        tilesets.push(map.addTilesetImage(tilesetData.name, tilesetData.key));
    });

    // Create layers using all tilesets
    const layers = [];
    for (let i = 0; i < map.layers.length; i++) {
        layers.push(map.createLayer(i, tilesets, 0, 0));
    }

  this.player = new PlayerSprite(this, 495, 325, 'player', 0, 0); //last two arguments are initial velocity x, y
 // this.matter.world.add(this.engine.world, this.player.body);

    
const boundaryOffset = 2; // Adjust this value as needed
const worldBounds = new Phaser.Geom.Rectangle(
    boundaryOffset,
    boundaryOffset,
    map.widthInPixels - 2 * boundaryOffset,
    map.heightInPixels - 2 * boundaryOffset
);

this.matter.world.setBounds(0, 0, worldBounds.width, worldBounds.height);

    this.collisionObjects = createCollisionObjects(this, map);
   this.sensorMapping = sensorMapSet(this, map, this.sensorID);  //this.transitionSensors?
   this.sensorHandling = sensorHandler(this, map, this.player); //used to have this.transitionSensors as an argument then it became  this.sensorID
          
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    const startMenuScene = this.scene.get('StartMenu');
    this.cameras.main.setZoom(2);
   // this.cursors = this.input.keyboard.createCursorKeys();
      this.cursors = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });


  }

  
update(time, delta) {
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
update(time, delta) {
    if (!this.player) {
        return;
    }

    const playerBody = this.player.body;
  console.log(playerBody);
  console.log(playerBody.velocity);

    // Handle keyboard input for player movement
    let forceX = 0;
    let forceY = 0;

    if (this.cursors.left.isDown) {
        forceX -= 0.01; // Adjust this value as needed
        console.log('Left key is down');
    } else if (this.cursors.right.isDown) {
        forceX += 0.01; // Adjust this value as needed
        console.log('Right key is down');
    }

    if (this.cursors.up.isDown) {
        forceY -= 0.01; // Adjust this value as needed
        console.log('Up key is down');
    } else if (this.cursors.down.isDown) {
        forceY += 0.01; // Adjust this value as needed
        console.log('Down key is down');
    }

    // Update velocities using Body.updateVelocities
  //  Body.updateVelocities(playerBody);

    // Apply forces to the player body
    playerBody.force.x += forceX;
    playerBody.force.y += forceY;

    // Apply constraints, such as limiting maximum speed
    Matter.Body.setAngularVelocity(playerBody, 0); //ensures player doesnt rotate
     const maxVelocity = .5; // Adjust this value as needed
    const currentVelocity = playerBody.velocity;
    const currentSpeed = Math.sqrt(currentVelocity.x * currentVelocity.x + currentVelocity.y * currentVelocity.y);
    if (currentSpeed > maxVelocity) {
        const scale = maxVelocity / currentSpeed;
        Matter.Body.setVelocity(playerBody, {
            x: currentVelocity.x * scale,
            y: currentVelocity.y * scale
        });

    // Finally, you may need to adjust the position based on the velocity
}
}
  */
}

window.OpenWorld = OpenWorld;
