import axios from 'axios'; //'axios' eto dvizhok kotorii upgrade access to URL

export default class Recipe {
    constructor (id)
    {
        this.id = id;
    };

    async getRecipe()
    {
        try
        {
            const res = await axios (`http://forkify-api.herokuapp.com/api/get?rId=${this.id}`); //poisk recipe via '#recipe_id'
            //console.log(res);
            // add new info inside new object 
            this.title = res.data.recipe.title;
            this.autor = res.data.recipe.publisher;
            this.ingredients = res.data.recipe.ingredients;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
        }

        catch (error){
            console.log(error);
            alert(`Somethins went wrong! ${error}   :(((`);
        }
    };

    calcTime() 
    {
        // Assuming that we need 15 min for each 3 ingredients
        const num = this.ingredients.length;
        const periods = Math.ceil (num / 3);
        this.time = periods * 15;
    };

    calcServings()
    {
        // Serving for 4 people
        this.servings = 4;
    };
};