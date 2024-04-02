import { PlayerSprite } from './PlayerSprite.js';
import { sensorMapSet, createCollisionObjects,
       // sensorHandler
       } from './collisionHandler.js';

export default class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });
    
    this.map = null;
    this.player = null; 
    this.collisionObjects = null; 
    this.transitionSensors = null; // Add transitionSensors property
    this.engine = null;
   this.world = null;
  }

  init(data) {
        this.openWorldScene = data.OpenWorld;
  }
      
  preload() {
  }
       
  create() {
    // Create Matter.js engine
    this.matterEngine = Phaser.Physics.Matter.Matter.World;
    this.engine = this.matter.world;
     this.world = this.matterEngine.create({
    // your Matter.js world options here
  });

    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
        this.scene.launch('MobileControls', { player: this.player, speed: this.speed });
    }

    this.scene.launch('CompUI', { OpenWorld: this, player: this.player, speed: this.speed, map: this.map, camera: this.cameras.main });

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

    this.player = new PlayerSprite(this, 495, 325, 'player'); // Create the player object, just took away this.world as 2nd argument

 this.scene.launch('PlayerControls', { player: this.player });

    console.log(this.player.body);
    console.log('Player World:', this.player.body.world);
    console.log('Player Body:', this.player.body);
console.log('Player GameObject:', this.player.gameObject);
          console.log('Player Body GameObject:', this.player.body.gameObject);
             console.log('Player Body GameObject layer:', this.player.body.gameObject.layer);

// Set world bounds for the player
const boundaryOffset = 2; // Adjust this value as needed
const worldBounds = new Phaser.Geom.Rectangle(
    boundaryOffset,
    boundaryOffset,
    map.widthInPixels - 2 * boundaryOffset,
    map.heightInPixels - 2 * boundaryOffset
);

this.matter.world.setBounds(0, 0, worldBounds.width, worldBounds.height);
          
           console.log(this.world);

    this.collisionObjects = createCollisionObjects(this, map);
   this.sensorMapping = sensorMapSet(this, map, this.sensorID);  
//this.sensorHandling = sensorHandler(this, map, this.player); 
          
    // Constrain the camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cameras.main.setZoom(2);

    this.player.scene.matter.world.on('collisionstart', (eventData) => {
    // Loop through pairs of colliding bodies
    eventData.pairs.forEach(pair => {
        // Check if the player is one of the bodies involved in the collision
        if (pair.bodyA === player.body || pair.bodyB === player.body) {
            // Get the other body involved in the collision
            const otherBody = pair.bodyA === player.body ? pair.bodyB : pair.bodyA;
            const isCustom = otherBody.isSensor == true;

            if (isCustom) {
                switch (otherBody.customID) {
                    case 'OpenWorldToInsideRoom':
                        console.log('You hit a transition sensor!');
                        // Perform actions specific to this sensor
                        console.log('youve hit the sensor by the door');
                        scene.scene.start('InsideRoom', {
                              player: this.player,
                              playerX: this.player.body.position.x,
                              playerY: this.player.body.position.y
                        });
                        break;
                    // Add more cases for other sensors if needed
                }
            }
        }
    });
});

  }
      
  update(time, delta) {

        // Get player's position
    let x = this.player.body.position.x;
    let y = this.player.body.position.y;
    console.log("Player position: x =", x, ", y =", y);
  }
}

window.OpenWorld = OpenWorld;
