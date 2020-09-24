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
}


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


//**
export const searchResults = recipes =>
{
    recipes.forEach(impResult); //kazhdiy element in the array provesti via 'impResult'
};