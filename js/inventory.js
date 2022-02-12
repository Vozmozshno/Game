import items from "./items.js"
export default class inventory {
    constructor() {
        this.maxColums = 8
        this.maxRows = 3
        this.selected = 0
        this.observers = []
       this.items = {
       }
        
    }

    subscribe(fn) {
        this.observers.push(fn)
    }
    unsubscribe(fn){
        this.observers = this.observers.filter(subscriber => subscriber !== fn)
    }

    broadcast(){
        this.observers.forEach(subscriber => subscriber())
    }

//
    addItem(item){
        let existingKey = Object.keys(this.items).find(key => this.items[key].name === item.name)
        console.log('ite,',item.name)
        console.log( existingKey )
        if(existingKey){
            this.items[existingKey].quantity += item.quantity
        }else{
            for(let index = 0; index < this.maxColums*this.maxRows;index++){
                let existingItem = this.items[index]
                if(!existingItem){
                    this.items[index] = item
                    break
                }
            }
        }
        this.broadcast()
    }
    getItem(index){
        return this.items[index]

    }

    moveItem(start,end){
        console.log(`start ${start} end ${end}`)
        if(start === end || this.items[end]) return
        this.items[end] = this.items[start]
        delete this.items[start]
        this.broadcast()
    }

    get selectedItem() {
        return this.items[this.selected]
    }

    getItemFrame(item){
        return items[item.name].frame
    }

    getItemQuantity(itemName){
        return Object.values(this.items).filter(i => i.name === itemName).map(i => i.quantity).reduce((accumulater,currentValue) => accumulater + currentValue,0)
    }
}