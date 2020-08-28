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
    }
}