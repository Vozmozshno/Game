import mainScene from "./mainScene.js";

const config = {
    width:1080,
    height:512,
    backgroundColor : '#333333',
    type : Phaser.AUTO,
    parent : 'survivalGame',
    scene : [mainScene],
    scale : {
        zoom:2,
    },
    physics : {
        default : 'matter',
        matter :{
            debug : true,
            gravity : {y:0},
        }
    },
    plugins : {
        scene : [
            {
                plugin : PhaserMatterCollisionPlugin,
                key : 'matterCollision',
                mapping : 'matterCollision'
            }
        ]
    }
}
new Phaser.Game(config)