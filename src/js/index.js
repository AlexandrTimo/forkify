import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, searchLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';




/** Global controller
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes
*/
const state = {}; //current sostoyanie stroki zaprosov


/**
 * SEARCH CONTROLLER 
 */
const controlSearch = async () => 
{
    // 1) Get query from view
    const query = searchView.getInput(); // input info

    if (query){

        // 2) Create new Search object and add to state
        state.search = new Search(query);

        // 3) prepear to new input 
        searchView.clearInput();
        searchView.clearResults();
        searchLoader(elements.searchRes); // method 'loader' with parent element of left side '.result'

        // Check processing for errors
        try
        {
            // 4) get result in Search() 
            await state.search.getResult();

            // 5) Render results(recipes) on UI
            clearLoader(); // delete 'loader'
            searchView.searchResults(state.search.recipes);
        }
        catch(error)
        {
            alert('Something wrong with Search processing!!!');
            clearLoader(); // delete 'loader'
        }
    }
};

// event for 'Search'
elements.searchForm.addEventListener('submit', e => 
{
    e.preventDefault();
    controlSearch();
});

// event for use 'button pages'
elements.searchButtomPage.addEventListener('click', e =>
{
    const btn = e.target.closest('.btn-inline'); // with method 'closest()' it help to find blizhyshee sovpadenie with class '.btn-inline'
    if (btn){
        const goToPage = parseInt(btn.dataset.goto, 10); // nahodim with help 'dataset' chemu rovna variable 'goto' + converting 'String' into 'Integer' 
        console.log(goToPage); //test
        searchView.clearResults(); // clear results before show new info
        searchView.searchResults(state.search.recipes, goToPage); // new info with - 'goToPage' variable.
    }
    
    
});




/**
 * RECIPE CONTROLLER 
 */

const controlRecipe = async () =>  
{
    const id = window.location.hash.replace('#', ''); // get #id from url and replace '#' to ''

    if (id)
    {
        // UI Prepare result

        // Create new object
        state.recipe = new Recipe(id);

        // Check processing for errors
        try
        {
            // Get result from getRecipe
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);

            // Parse ingredients (conveting)
            state.recipe.parseIngredients();

            // Calculate Serving and Time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // show Result
            console.log(state.recipe);
            

        }
        catch(error)
        {
            alert('Something wrong with Recipe processing!!!');
        }
    }
};


/* window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe); */

// easy way to get both events in one via 'forEach()'
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));