export const elements = {
    searchResults: document.querySelector(".results"),
    searchResultList: document.querySelector(".results__list"),
    searchResultPage: document.querySelector(".results__pages"),
    searchBnt: document.querySelector(".search__btn"),
    searchForm: document.querySelector(".search"),
    searchInput: document.querySelector(".search__field"),
};

export const elementStrings = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `<div class="${elementStrings.loader}"><svg> <use href="img/icons.svg#icon-cw"></use> </svg></div>`;
    clearLoader(parent);
    parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = parent => {
    // console.log(`I'm a function!`);
    const child = parent.querySelector(`.${elementStrings.loader}`);
    if( child)
    {
        parent.removeChild( child);
    }
};