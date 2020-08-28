export const elementStrings = {
    loader: 'loader',
    recipeContainer: 'recipe',
    shoppingList:'shopping__list',
    searchResults: "results",
    searchResultList: "results__list",
    searchResultLink: "results__link",
    searchResultPage: "results__pages",
    searchBnt: "search__btn",
    searchPageBtn:"btn-inline",
    searchForm: "search",
    searchInput: "search__field",
}

export const elements = {
    recipeContainer: document.querySelector(`.${elementStrings.recipeContainer}`),
    shoppingList: document.querySelector(`.${elementStrings.shoppingList}`),
    searchResults: document.querySelector(`.${elementStrings.searchResults}`),
    searchResultList: document.querySelector(`.${elementStrings.searchResultList}`),
    searchResultPage: document.querySelector(`.${elementStrings.searchResultPage}`),
    searchBnt: document.querySelector(`.${elementStrings.searchBnt}`),
    searchForm: document.querySelector(`.${elementStrings.searchForm}`),
    searchInput: document.querySelector(`.${elementStrings.searchInput}`),
};

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