import UIBaseScene from "./UIBaseScene.js";
import inventory from "./inventory.js"
export default class craftingScene extends UIBaseScene{
    constructor() {
        super("craftingScene");
        this.craftingSlots = []
        this.uiScale = 1.0
    }

    init(data) {
         let {mainScene} = data
         this.mainScene = mainScene
         this.crafting = mainScene.crafting
         this.crafting.inventory.subscribe(() => this.updateCraftableSLots())
    }

    create() {
        this.updateCraftableSLots()
    }

    destroyCraftingSlot(craftingSlot){
        craftingSlot.matItems.forEach(m => m.destroy())
        craftingSlot.item.destroy()
        craftingSlot.destroy()
    }
    updateCraftableSLots() {
        this.crafting.updateItems()
        for (let index = 0; index < this.crafting.items.length/2; index++) {
            if(this.craftingSlots[index]) this.destroyCraftingSlot(this.craftingSlots[index])
            const craftableItem = this.crafting.items[index]
            let x = this.margin  + this.tileSize / 2
            let y = index * this.tileSize * 1.1 + this.game.config.height / 2
            this.craftingSlots[index] = this.add.sprite(x,y,"items",11)
            this.craftingSlots[index].item = this.add.sprite(x,y,"items",craftableItem.frame)
            this.craftingSlots[index].item.tint = craftableItem.canCraft ? 0xffffff : 0x555555
            this.craftingSlots[index].matItems = []
            for (let i = 0; i < craftableItem.matDetails.length; i++) {
                let scale = 0.75
                const matItem = craftableItem.matDetails[i]
                this.craftingSlots[index].matItems[i] = this.add.sprite(x + this.tileSize + i * this.tileSize * scale, y, "items", matItem.frame)
                this.craftingSlots[index].matItems[i].setScale(scale)
                this.craftingSlots[index].matItems[i].tint = matItem.available ? 0xffffff : 0x555555
            }

        }

    }
}