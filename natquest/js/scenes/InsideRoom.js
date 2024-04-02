import { PlayerSprite } from './PlayerSprite.js';
import { sensorMapSet, createCollisionObjects, sensorHandler } from './collisionHandler.js';

export default class InsideRoom extends Phaser.Scene {
  constructor() {
    super({ key: 'InsideRoom' });
  }


  init(data) {
 this.player = data.player;
}
  
  preload() {
  }

  create() {

    // Create the new map using the loaded tilemap
    const map = this.make.tilemap({ key: 'insidemap' });

    // Load tileset
    const tilesetsData = [
        { name: 'tilesheetInterior', key: 'tilesheetInterior' },
        { name: 'tilesheetWalls', key: 'tilesheetWalls' },
        { name: 'tilesheetObjects', key: 'tilesheetObjects' },
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

    // Set world bounds for the player
    const boundaryOffset = 2;
    const worldBounds = new Phaser.Geom.Rectangle(
        boundaryOffset,
        boundaryOffset,
        map.widthInPixels - 2 * boundaryOffset,
        map.heightInPixels - 2 * boundaryOffset
    );

      this.collisionObjects = createCollisionObjects(this, map);
      this.sensorMapping = sensorMapSet(this, map, this.sensorID);  
      this.sensorHandling = sensorHandler(this, map, this.player);

    
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

  }

  update(time, delta) {
  }
}

window.InsideRoom = InsideRoom;
