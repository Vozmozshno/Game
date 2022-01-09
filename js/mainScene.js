export default class mainScene extends Phaser.Scene {
    constructor() {
        super('mainScene')
    }

    preload() {
        console.log('Preload')
        this.load.atlas('female','assets/images/townsfolkfemale.png','assets/images/townsfolkfemale_atlas.json')
        this.load.animation('female_anim','assets/images/townsfolkfemale_anim.json')
    }


    create() {
        console.log('create')
        this.player = new Phaser.Physics.Matter.Sprite(this.matter.world,0,0,'female','townsfolk_f_idle_1')
        this.add.existing(this.player);
        this.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })
    }

    update(){
        console.log(this.player.anims)
        this.player.anims.play('walkanimation',true)
        const speed = 2.5
        let playerVelocity = new Phaser.Math.Vector2();
        if(this.inputKeys.left.isDown) {
            playerVelocity.x = -1
        }else if(this.inputKeys.right.isDown) {
            playerVelocity.x = 1;
        }
        if(this.inputKeys.up.isDown) {
            playerVelocity.y = -1
        }else if(this.inputKeys.down.isDown) {
            playerVelocity.y = 1;
        }
        playerVelocity.normalize() // ?
        playerVelocity.scale(speed)
        this.player.setVelocity(playerVelocity.x,playerVelocity.y)
    }
}