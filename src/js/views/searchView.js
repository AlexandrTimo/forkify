import { elements } from './base'

//**
export const getInput = () => elements.searchInput.value; // info in input line

//**
export const clearInput = () => 
{
    elements.searchInput.value = ''; // Udalenie info from input form
};

//**
export const clearResults = () =>
{
    elements.searchResList.innerHTML = ''; // Udalenie info from result list
    elements.searchButtomPage.innerHTML = ''; // Udalenie buttons result list
};

//**
// videlenie i udalenie videlenia items (recipe)
export const hightlightSelected = id => 
{
    const resArr = Array.from(document.querySelectorAll('.results__link'));

    resArr.forEach(el => 
        {
            el.classList.remove('results__link--active');
        });

    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');


};


// Set limit words for title
//ex: 'Pasta with spinach and nuts'
// acc: 0 / acc + cur.length = 5 / arr = ['Pasta']
// acc: 5 / acc + cur.lentgth = 8 / arr = ['Pasta', 'with']
// acc: 8 / acc + cur.lentgth = 15 / arr = ['Pasta', 'with', 'spinach']
// acc: 15 / acc + cur.lentgth = 18 / arr = ['Pasta', 'with', 'spinach']
// acc: 18 / acc + cur.lentgth = 24 / arr = ['Pasta', 'with', 'spinach'] 

const limitRecipeTitle = (title, limit = 17) =>
{
    const arr = [];
    if (title.length > limit)
    {
        title.split(' ').reduce((acc, cur) =>
        {
            if (acc + cur.length <= limit)
            {
                arr.push(cur);
            }
            return acc + cur.length;
        }, 0);
        //return result
        return `${arr.join(' ')} ...`;
    }
    return title;
    
};

// priobrazuet code to html
const impResult = recipe =>
{
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup); // kuda vivesti result
};

// html code of 'button pages'
//type: 'prev' or 'next' 
const createBtn = (page, type) =>`

    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>

`;

// find kol-vo pages and show button if cur = 1, 2, 3 
const renderButtons = (page, numResult, resPerPage) => 
{
    const pages = Math.ceil(numResult / resPerPage);
    let button;

    if (page === 1 && pages > 1){
        // Show button 'next' on the right
        button = createBtn(page, 'next');
    }
    else if (page < pages){
        // Show both buttons
        button = ` 
            ${createBtn(page,'next')}
            ${createBtn(page,'prev')}
        `;
    }
    else if (page === pages && pages > 1){
        // Show 'prev' button on the left
        button = createBtn(page,'prev'); 
    }

    elements.searchButtomPage.insertAdjacentHTML('afterbegin', button);
};

//**
export const searchResults = (recipes, page = 1, resPerPage = 10) =>
{
    // Render results of current page
    const start = (page - 1) * resPerPage;// raschet pages with method 'slice()'
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(impResult); //kazhdiy element in the array provesti via 'impResult'

    // Render pagination results after 'click' a button 'next' or 'prev'
    renderButtons(page, recipes.length, resPerPage);
};