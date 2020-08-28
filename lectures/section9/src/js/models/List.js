import uniqid from 'uniqid'

export default class List{
    constructor()
    {
        this.items = [];
    }

    addItem(count, unit, ingredient)
    {
        const id = uniqid();
        this.items.push({id, count, unit, ingredient});
        return this.items [ this.items.length -1];
    }

    getItem(id)
    {
        return this.items.find(el => el.id === id);
    }

    deleteItem(id)
    {
        const position = this.items.findIndex( el => el.id === id);
        this.items.splice(position,1);
    }

    updateCount(id, newCount)
    {
        this.items.find(el => el.id === id).count = newCount ;
    }
}