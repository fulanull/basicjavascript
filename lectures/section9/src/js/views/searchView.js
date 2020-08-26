import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const renderResults = (recipes) => {
    if (recipes) {
        recipes.forEach((element) => {
            renderRecipe(element);
        });
    }
};

export const prepareViewforResults = () => {
    clearInput();
    clearResults();
};

const renderRecipe = (recipe) => {
    const markup = `<li><a class="results__link" href="#${recipe.recipe_id}"><figure class="results__fig">
    <img src="${recipe.image_url}" alt="${recipe.title}"></figure><div class="results__data"><h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
    <p class="results__author">${recipe.publisher}</p></div></a></li>`;
    elements.searchResultList.insertAdjacentHTML("beforeend", markup);

    //   recipe.title;
    //   recipe.social_rank;
    //   recipe.publisher_url;
    //   recipe.source_url;
};

const clearInput = () => {
    elements.searchInput.value = "";
};
const clearResults = () => {
    elements.searchResultList.innerHTML = "";
};

const limitRecipeTitle = (title, limit = 17) => {

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