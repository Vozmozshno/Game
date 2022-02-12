import mainScene from "./mainScene.js";
import inventoryScene from "./inventoryScene.js";
import craftingScene from "./craftingScene.js";

const config = {
    width:512,
    height:512,
    backgroundColor : '#999999',
    type : Phaser.AUTO,
    parent : 'survivalGame',
    scene : [mainScene,inventoryScene,craftingScene],
    scale : {
        zoom:1.5,
    },
    physics : {
        default : 'matter',
        matter :{
            debug : false,
            gravity : {y:0},
        }
    },
    plugins : {
        scene : [
            {
                plugin : PhaserMatterCollisionPlugin.default,
                key : 'matterCollision',
                mapping : 'matterCollision'
            }
        ]
    }
}
new Phaser.Game(config)