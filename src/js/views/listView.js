import { elements } from './base';

// Added new item into the list ****
export const renderList = item =>
{
    const markup = `

        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.count < 0 ? item.count = 0 : item.count}" step="${item.count < 0 ? item.count = 0 : item.count}" class="shopping__count-value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    elements.shopping.insertAdjacentHTML('beforeend', markup);
};

// Delete item from the list ****
export const deleteList = id =>
{
    const item = document.querySelector(`[data-itemid="${id}"]`);

    if (item) 
    {
        item.parentElement.removeChild(item);
    }
};