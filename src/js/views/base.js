
//**
export const elements = {
    searchForm: document.querySelector('.search'), //Button
    searchInput: document.querySelector('.search__field'), //input line 
    searchRes: document.querySelector('.results'), // parent element of left side of our web sait
    searchResList: document.querySelector('.results__list') //left side (result)
};

//**
export const elementString = { // create extra var for 'loader' (kill hardcode)
    loader: 'loader'
};

//**
export const searchLoader = parent => // insert 'loader' afterbegin (* - multiple function)
{
    const loader = `
        <div class="${elementString.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

//**
export const clearLoader = () => // delete 'loader' before find results
{
    const loader = document.querySelector(`.${elementString.loader}`);
    if (loader)
    {
        loader.parentElement.removeChild(loader);
    }}
