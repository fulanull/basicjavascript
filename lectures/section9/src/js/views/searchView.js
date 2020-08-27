import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const renderResults = (recipes, page=1, resultsPerPage = 5) => {
    if (recipes) {
        let start = (page -1)*resultsPerPage;
        let end = start + resultsPerPage;
        start = (start > recipes.length ? recipes.length - resultsPerPage : start);
        end = (end > recipes.length ? recipes.length : end);

        // console.log(`Page: ${page} - PerPage: ${resultsPerPage} - start: ${start} - end: ${end} - length: ${recipes.length}`);
        renderButtons(page, recipes.length, resultsPerPage);

        for (let i = start; i < end ; ++ i)
        {
            renderRecipe( recipes[i]);
        }
        // recipes.slice(start, end).forEach(renderRecipe);
    }
};

export const prepareViewforResults = () => {
    clearInput();
    clearResults();
};

const renderRecipe = (recipe) => {
    const markup = `<li><a class="results__link" href="#${recipe.recipe_id}" data-id="${recipe.recipe_id}"><figure class="results__fig">
    <img src="${recipe.image_url}" alt="${recipe.title}"></figure><div class="results__data"><h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
    <p class="results__author">${recipe.publisher}</p></div></a></li>`;
    elements.searchResultList.insertAdjacentHTML("beforeend", markup);

    //   recipe.title;
    //   recipe.social_rank;
    //   recipe.publisher_url;
    //   recipe.source_url;
};

const renderButtons = (page, numResults, resPerPage) =>
{
    const pages = Math.ceil(numResults/resPerPage);
    let htmlText = '';

    if(page > 1 )
    {
        //show prev page number
        htmlText = createButton(page-1, false);
    }

    if(page < pages)
    {
        //show nextPage Button
        htmlText += createButton(page + 1, true);
    }
    elements.searchResultPage.innerHTML = htmlText;
}

const createButton = (page, fowardButton = true) => {
    return `<button class="btn-inline results__btn--${fowardButton ? 'next' : 'prev'}" data-goto="${page}" ><svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${fowardButton ? 'right' : 'left'}"></use></svg><span>Page ${page}</span></button>`;
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