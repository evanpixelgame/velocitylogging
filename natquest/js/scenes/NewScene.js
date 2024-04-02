import { PlayerSprite } from './PlayerSprite.js';
import { sensorMapSet, createCollisionObjects } from './collisionHandler.js';

export default class NewScene extends Phaser.Scene {
  constructor() {
    super({ key: 'NewScene' });
    
    this.map = null;
    this.player = null; 
    this.collisionObjects = null; 
    this.transitionSensors = null; // Add transitionSensors property
    this.engine = null;
    this.world = null;
  }

  init(data) {
    // Initialize scene properties from the data passed from the previous scene
    this.player = data.player;
    // You can also access other data passed if needed, such as playerX and playerY
  }

  preload() {
    // Load assets needed for the scene
    // For example, load tilemaps, tilesets, spritesheets, etc.
  }
       
  create() {
    // Use the existing Matter.js engine and world from the OpenWorld scene
    this.engine = this.scene.get('OpenWorld').engine;
    this.world = this.scene.get('OpenWorld').world;

    // Create the map
    const map = this.make.tilemap({ key: 'insidemap' });
    // Load tilesets and create layers

    // Create layers using all tilesets
    const tilesets = [];
    const layers = [];
    for (let i = 0; i < map.layers.length; i++) {
      layers.push(map.createLayer(i, tilesets, 0, 0));
    }

    // Set world bounds for the player
    const boundaryOffset = 2;
    const worldBounds = new Phaser.Geom.Rectangle(
      boundaryOffset,
      boundaryOffset,
      map.widthInPixels - 2 * boundaryOffset,
      map.heightInPixels - 2 * boundaryOffset
    );

    // Set up collision objects and sensor mapping
    this.collisionObjects = createCollisionObjects(this, map);
    this.sensorMapping = sensorMapSet(this, map, this.sensorID);

    // Constrain the camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
  }
      
  update(time, delta) {
    // Update logic for the scene, if necessary
  }
}

window.NewScene = NewScene;