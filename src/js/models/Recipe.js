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
            alert(`Something went wrong! ${error}   :(((`);
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

    parseIngredients ()
    {
        const unitsLong = ['tablespoons', 'tablespoon', 'teaspoons', 'teaspoon', 'onces', 'once', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'tsp', 'tsp', 'oz', 'oz', 'cup', 'pound'];

        const newIngredient = this.ingredients.map(el =>
            {
                // 1. Uniform units
                let ingredient = el.toLowerCase();

                unitsLong.forEach((unit, i) =>
                {
                    ingredient = ingredient.replace(unit, unitsShort[i]); 
                });

                // 2. Remove parentheses
                ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
                
                // 3. Parse ingredients into count, unit and ingredient 
                const arrIng = ingredient.split(' ');

                //poisk matching of units (ex:'tbsp') in arrays: 'arrIng' and 'unitsShort' and return index of matching
                const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2)); 

                //Ex: [1, 1/2 , cup, milk] / [1, cup, milk]
                //Ex: [3, milk]
                //Ex: [milk]

                let objIng;

                if (unitIndex > -1) // There is a unit and number
                {
                    const arrCount = arrIng.slice(0, unitIndex);
                    let count;

                    if (arrCount.length === 1)
                    {
                        count = eval(arrIng[0].replace('-' , '+')); // replace '-' to '+'. Ex: "1 - 1/2" --> eval("1 + 1/2") --> "1.5" 
                    }
                    else
                    {
                        count = eval(arrIng.slice(0, unitIndex).join('+')); //Ex: [1, 1/2, cup, milk] is --> eval("1 + 1/2") --> "1.5"  ("eval" - zapuskaet Math virazhenie in array)
                    }

                    objIng = {
                        count,
                        unit: arrIng[unitIndex],
                        ingredient: arrIng.slice(unitIndex + 1).join(' ')
                    };
                }
                else if (parseInt(arrIng[0], 10)) // There is NO unit, but first element is a number
                {
                    objIng = {
                        count: parseInt(arrIng[0], 10),
                        unit: '',
                        ingredient: arrIng.slice(1).join(' ')
                    };
                }
                else if (unitIndex === -1) // There is NO num and NO unit in first position
                {
                    objIng = {
                        count: 1,
                        unit: '',
                        ingredient
                    };
                }

                return objIng;
            });

            this.ingredients = newIngredient;
    };
};