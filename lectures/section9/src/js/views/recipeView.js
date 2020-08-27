import { elements } from "./base";

export const prepareViewforResults = () => {
    clearResults();
};

export const renderRecipe = (recipe) =>
{
    console.log(`${recipe}`);
    console.log(recipe);
    let recipeHtml;
    recipeHtml += getFigureDivHTML(recipe.title, recipe.image_url);
    recipeHtml += getRecipeDetailsDivHTML( 666, 30);
    if (recipe.ingredients)
    {
        recipeHtml += getRecipeIngredientsList(recipe.ingredients);
    }


    elements.recipeContainer.innerHTML = recipeHtml;

};

const clearResults = () => {
    elements.recipeContainer.innerHTML = "";
};

const getFigureDivHTML = (title, imgUrl) =>
{
    return `<figure class="recipe__fig"><img src="${imgUrl}" alt="${title}" class="recipe__img"><h1 class="recipe__title"><span>${title}</span></h1></figure>`;
};

const getRecipeDetailsDivHTML = (minutes, servesXPeople) => {
    let auxHTML ;

    auxHTML = `<div class="recipe__details"><div class="recipe__info"><svg class="recipe__info-icon">
        <use href="img/icons.svg#icon-stopwatch"></use></svg><span class="recipe__info-data recipe__info-data--minutes">${minutes}</span>
        <span class="recipe__info-text"> minutes</span></div>`;

    auxHTML += `<div class="recipe__info"><svg class="recipe__info-icon"><use href="img/icons.svg#icon-man"></use></svg>
    <span class="recipe__info-data recipe__info-data--people">${servesXPeople}</span><span class="recipe__info-text"> servings</span>
    <div class="recipe__info-buttons"><button class="btn-tiny"><svg><use href="img/icons.svg#icon-circle-with-minus"></use>
    </svg></button><button class="btn-tiny"><svg><use href="img/icons.svg#icon-circle-with-plus"></use></svg></button></div></div>`;

    auxHTML += `<button class="recipe__love"><svg class="header__likes"><use href="img/icons.svg#icon-heart-outlined"></use>
    </svg></button></div>`;

    return auxHTML;
};

const getRecipeIngredientsList = (ingredients) => {
    let auxHTML;
    auxHTML = `<div class="recipe__ingredients"><ul class="recipe__ingredient-list">`;

    ingredients.forEach(recipeItem => {

        auxHTML += getRecipeItem(recipeItem);
    });

    // auxHTML += ``;

    auxHTML += `<button class="btn-small recipe__btn"><svg class="search__icon"><use href="img/icons.svg#icon-shopping-cart"></use>
    </svg><span>Add to shopping list</span></button></div>`;

    return auxHTML;
};

const getRecipeItem = (recipeItem) => {
    let auxHTML;
    let name, amount, unit;

    [name, amount, unit] = parseDataItem(recipeItem);
    auxHTML = `<li class="recipe__item"><svg class="recipe__icon"><use href="img/icons.svg#icon-check"></use>
            </svg><div class="recipe__count">${amount}</div><div class="recipe__ingredient"><span class="recipe__unit">${unit}</span>${name}</div></li>`;

    // auxHTML = ``;

    return auxHTML;
};

const parseDataItem = (recipeItem) =>
{
    const words = recipeItem.split(' ');
    const name = words.slice(2,words.length).join(' ');


    return [` ${name} `, words[0], words[1]];
};
