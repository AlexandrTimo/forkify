import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likeView from './views/likeView';

import { elements, searchLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Like';




/** Global controller
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes
*/
const state = {}; //current sostoyanie stroki zaprosov
window.state = state;

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
        recipeView.clearRecipe(); // cleaning up "middle box" before new result 
        searchLoader(elements.recipe); //render 'loader' before show result

        // Render Selector of recipe (highlight selected earch item)
        if (state.search) searchView.hightlightSelected(id); // calling 'selection' of id - element

        // Create new object
        state.recipe = new Recipe(id);

        // Check processing for errors
        try
        {
            // Get result from getRecipe
            await state.recipe.getRecipe();
            //console.log(state.recipe.ingredients);

            // Parse ingredients (converting)
            state.recipe.parseIngredients();

            // Calculate Serving and Time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // show Result
            clearLoader();
            recipeView.renderRecipe(
                state.recipe, 
                state.likes.isLiked(id) // Love btn is false or true
            );
            
            

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


/**
 * LIST CONTROLLER 
 */

 const controlList = () =>
 {
    // Create new list if there is none yet
    if (!state.list) state.list = new List();

    // Add ingredients to shopping list and UI
    state.recipe.ingredients.forEach(el => 
    { 
        const item = state.list.addItem (el.count, el.unit, el.ingredient); // Add info to the object
        listView.renderList(item); // add to UI 
    });
    
 };

// Delete list

elements.shopping.addEventListener('click', e =>
{
    const id = e.target.closest('.shopping__item').dataset.itemid;

// handle delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *'))
    {
        // Delete from  state (list)
        state.list.deleteItem(id);
        // Delete from UI (list)
        listView.deleteList(id);
    }
    // handle count update button
    else if (e.target.matches('.shopping__count-value'))
    {
        //Update counter of ingredients
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);
    }
});



/**
 * LIKE CONTROLLER 
 */

//FOR TESTING
state.likes = new Likes();

const controlLikes = () =>
{
    if (!state.likes) state.likes = new Likes();

    const currentID = state.recipe.id;

    // User has NOT like yet current recipe
    if (!state.likes.isLiked(currentID))
    {
        // Add like to the list 
       const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        // Toggle button 'love' - off
        likeView.toggleLikeBtn(true);

        // Add like to the UI list
            console.log(state.likes);

    }
    // User HAS liked current recipe
    else
    {
        // Remove like to the list 
        state.likes.deleteLike(currentID);

        // Toggle button 'love' - on
        likeView.toggleLikeBtn(false);

        // Remove like to the UI list
        console.log(state.likes);

    };

};

//Handling recipe button clicks
elements.recipe.addEventListener('click', e =>
{
    if (e.target.matches('.btn-decrease, .btn-decrease *')) // multiple action (ex.buttons) -- 'matches()'method  
    {
       // Decrease button clicked
       if (state.recipe.servings > 1)
       {
            state.recipe.updateServings('dec'); // calculate new results
            recipeView.updateServingIngredients(state.recipe); // show on UI results
       }
    }
    else if (e.target.matches('.btn-increase, .btn-increase *'))
    {
       // Increase button clicked
       state.recipe.updateServings('inc');
       recipeView.updateServingIngredients(state.recipe);
    }
    else if (e.target.matches('.recipe__btn--shopping, .recipe__btn--shopping *'))
    {   
        // Added and remove ingredients to/from the 'shopping list'
        controlList();
    }
    else if (e.target.matches('.recipe__love, .recipe__love *'))
    {
        // Added and remove recipe to/from 'like list'
        controlLikes();
    }

    //console.log(state.recipe);
});

