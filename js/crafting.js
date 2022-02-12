import items from "./items.js"
export default class crafring {
    constructor(data) {
        let {mainScene} = data
        this.mainScene = mainScene
        this.inventory = mainScene.player.inventory
        this.player = mainScene.player
        this.selected = 0
        this.items = []
    }

    updateItems() {
        this.items = []
        let craftables = Object.keys(items).filter(i => items[i].mats)
        for (let index = 0; index < craftables.length; index++) {
            const itemName = craftables[index]
            const mats = items[itemName].mats
            //Now chech if we have enough mats
            let lastMat = ""
            let matDetails = []
            let canCraft = true
            let qty = 0
            mats.forEach(mat => {
                qty = (lastMat === mat) ? qty - 1 : this.inventory.getItemQuantity(mat)
                let available = (qty > 0)
                matDetails.push({name: mat, frame: items[mat].frame, available})
                lastMat = mat
                if (!available) canCraft = false
            })
            this.items.push({name: itemName, frame: items[itemName].frame, matDetails, canCraft})
        }
        console.log(this.items)
    }
}
