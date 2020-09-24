import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, searchLoader, clearLoader } from './views/base';




/** Global controller
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes
*/
const state = {}; //current sostoyanie stroki zaprosov

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


        // 4) get result in Search() 
        await state.search.getResult();

        // 5) Render results(recipes) on UI
        clearLoader(); // delete 'loader'
        searchView.searchResults(state.search.recipes);
    }
}


elements.searchForm.addEventListener('submit', e => 
{
    e.preventDefault();
    controlSearch();
});