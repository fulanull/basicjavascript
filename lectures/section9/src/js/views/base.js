export const elementStrings = {
    loader: 'loader',
    recipeContainer: 'recipe',
    recipeLike: 'recipe__love',
    shoppingList:'shopping__list',
    likesList:'likes__list',
    MenuField:'likes__field',
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
    likesList: document.querySelector(`.${elementStrings.likesList}`),
    MenuField: document.querySelector(`.${elementStrings.MenuField}`),
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


export const limitRecipeTitle = (title, limit = 17) => {

    if (title.length > limit) {
        let i;
        for (i = limit; i > 0; --i) {
            if (title[i] == ' ') {
                break;
            }

            if (i == 0) {
                i = 17;
            }
        }
        return `${title.substring(0, i)} ...`;
    }

    return title;
};