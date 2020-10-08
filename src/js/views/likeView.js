import { elements } from './base';

export const toggleLikeBtn = (isLiked) => // Change love btn style if 'isLiked = true' or 'isLiked = false'
{
    //icons.svg#icon-heart-outlined
    const iconString = isLiked ? '' : '-outlined' // do the same in recipeView to keep 'Love btn' is 'active'
    // Change/taggle attribute in html 'Love btn' is active or NOT active     
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#icon-heart${iconString}`); 

};