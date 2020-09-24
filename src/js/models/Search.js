import axios from 'axios';  //'axios' eto dvizhok kotorii upgrade access to URL



export default class Search {
    constructor (query){
        this.query = query;
    }
        async getResult ()
        {
            try {
                const res = await axios(`http://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
                this.recipes = res.data.recipes;
                //console.log(this.recipes);
            }
            catch (error){
                alert(error);
        }
    }
}
