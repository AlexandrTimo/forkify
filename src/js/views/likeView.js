import { elements } from './base';
import { limitRecipeTitle } from './searchView';

export const toggleLikeBtn = (isLiked) => // Change love btn style if 'isLiked = true' or 'isLiked = false'
{
    //icons.svg#icon-heart-outlined
    const iconString = isLiked ? '' : '-outlined' // do the same in recipeView to keep 'Love btn' is 'active'
    // Change/taggle attribute in html 'Love btn' is active or NOT active     
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#icon-heart${iconString}`); 

};

export const toggleLikeMenu = numLikes =>
{
    // Show icon love or hidden
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = like =>
{
    // Render liked recipe into UI favor list 
    const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
    `;

    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id =>
{
    // Delete liked recipe into UI favor list 
    const el = document.querySelector(`.likes__link[href*="#${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
}
