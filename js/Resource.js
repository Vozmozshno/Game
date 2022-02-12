import matterEntity from "./matterEntity.js";
export default class  Resource extends matterEntity{
    static preload(scene){
        scene.load.atlas('resources','assets/images/resources.png','assets/images/resources_atlas.json')
        scene.load.audio('tree','assets/audio/tree.mp3')
        scene.load.audio('rock','assets/audio/rock.mp3')
        scene.load.audio('bush','assets/audio/bush.mp3')
        scene.load.audio('pickup','assets/audio/pickup.mp3')
    }

    constructor(data) {
        let {scene,resource} = data
        // super(scene.matter.world,resource.x,resource.y,'resources',resource.type);
        let drops = JSON.parse(resource.properties.find(p=>p.name == 'drop').value)
        let depth = resource.properties.find(p=>p.name == 'depth').value
        super({scene,x:resource.x,y:resource.y,texture:'resources',frame:resource.type,drops,depth,health:5,name:resource.type})
        let yOrigin = resource.properties.find(p=>p.name == 'yOrigin').value
        //this.sound = this.scene.sound.add(this.name)
        this.y = this.y + this.height * (yOrigin - 0.5)
        const {Bodies} = Phaser.Physics.Matter.Matter
        var resourcesCollider = Bodies.circle(this.x,this.y,12,{isSensor:false,label:'resourcesCollider'})
        this.setExistingBody(resourcesCollider)
        this.setStatic(true)
        this.setOrigin(0.5,yOrigin)

    }

}