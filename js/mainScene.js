import Player from "./Player.js";
import Resource from "./Resource.js";
import Enemy from "./Enemy.js"
import crafring from "./crafting.js";

export default class mainScene extends Phaser.Scene {
    constructor() {
        super('mainScene')
        this.enemies = []
    }

    preload() {
        Player.preload(this)
        Resource.preload(this)
        Enemy.preload(this)
        this.load.image('tiles','assets/images/RPG Nature Tileset.png')
        this.load.tilemapTiledJSON('map','assets/images/Map1.json')
    }

    create() {
        const map = this.make.tilemap({key: 'map'})
        this.map = map
        const tileset = map.addTilesetImage('RPG Nature Tileset','tiles',32,32,0,0)

        const layer1 = map.createLayer('Tyle layer 1',tileset,0,0)
        const layer2 = map.createLayer('Tyle layer 2',tileset,0,0)

        layer1.setCollisionByProperty({Collides:true})
        this.matter.world.convertTilemapLayer(layer1)

        this.map.getObjectLayer('Resources').objects.forEach(resource => new Resource({scene: this, resource}))
        this.map.getObjectLayer('Enemies').objects.forEach(enemy =>this.enemies.push(new Enemy({scene: this, enemy})))

        this.player = new Player({scene: this, x: 200, y: 200, texture: 'townsfolkfemale', frame: 'townsfolk_f_idle_1'})
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })

        let camera = this.cameras.main
        camera.zoom = 1.5
        camera.startFollow(this.player)
        camera.setLerp(0.08,0.08)
        camera.setBounds(0,0,this.game.config.width,this.game.config.height)
        this.scene.launch('inventoryScene',{mainScene : this})
        this.crafting  = new crafring({mainScene:this})
        this.scene.launch('craftingScene',{mainScene : this})
    }
    update() {
        this.enemies.forEach(enemy =>enemy.update())
        this.player.update()
    }
}