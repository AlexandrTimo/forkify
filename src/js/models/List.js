import uniqid from 'uniqid';

export default class List {

    constructor ()
    {
        this.items = [];
    }

    addItem (count, unit, ingredient) 
    {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem (id)
    {
        const index = this.items.findIndex(el => el.id === id); // find 'index' by 'id' element
        //[2,4,8] splice method --> splice(1,1) return 4. Original = [2,8]
        //[2,4,8] slice method --> slice method (1,2) return 4. Original = [2,4,8]    
        this.items.splice(index, 1); // delate index + id from list
    }

    updateCount (id, newCount)
    {
        this.items.find(el => el.id === id).count = newCount; // find 'element' in the List by 'id'
    }
}