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
       this.player = data.player;
         console.log(this.player);
       //  this.player.body = data.playerBody;
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
    const playerBody = this.player.body;

 this.scene.launch('PlayerControls', { player: this.player });

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
console.log(this.player);
    // Delay starting the NewScene by 10 seconds
           if (this.player && this.player.body) {
                  console.log(this.player);
                  console.log(this.player.body);
    this.time.delayedCall(2000, () => {
        console.log('Starting NewScene...');
        this.scene.start('NewScene', {
               player: this.player,
            //playerBody: this.player.body,
          //  playerX: this.player.body.position.x,
        //    playerY: this.player.body.position.y
        });
    }, [], this);
           }
  }
      
  update(time, delta) {

        // Get player's position
    let posX = this.player.body.position.x;
    let posY = this.player.body.position.y;
        let velX = this.player.body.velocity.x;
          let velY = this.player.body.velocity.y;
         console.log(posX, posY, velX, velY);
        
 //   console.log("Player position: x =", x, ", y =", y);
// Matter.Body.setVelocity(this.player, { x: velX, y: velY });
  }
}

window.OpenWorld = OpenWorld;
