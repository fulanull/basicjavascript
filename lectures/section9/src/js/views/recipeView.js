import { elements } from "./base";
import { Fraction } from 'fractional';

export const prepareViewforResults = () => {
    clearResults();
};

export const renderRecipe = (recipe) =>
{
    let recipeHtml;
    recipeHtml += getFigureDivHTML(recipe.title, recipe.img);
    recipeHtml += getRecipeDetailsDivHTML(recipe.time, recipe.servings);
    if (recipe.ingredients)
    {
        recipeHtml += getRecipeIngredientsList(recipe.ingredients);
    }

    recipeHtml += getRecipeDirections(recipe);
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

const getRecipeDirections = recipe =>
{
    let auxHTML;

    auxHTML = `<div class="recipe__directions"><h2 class="heading-2">How to cook it</h2><p class="recipe__directions-text">
        This recipe was carefully designed and tested by<span class="recipe__by"> ${recipe.author}</span>. Please check out directions at their website.
    </p><a class="btn-small recipe__btn" href="${recipe.url}" target="_blank"><span>Directions</span><svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-right"></use></svg></a></div>`;

    return auxHTML
}

const getRecipeItem = (recipeItem) => {
    let auxHTML;

    auxHTML = `<li class="recipe__item"><svg class="recipe__icon"><use href="img/icons.svg#icon-check"></use>
            </svg><div class="recipe__count">${formatCount(recipeItem.count)}</div><div class="recipe__ingredient"><span class="recipe__unit">${recipeItem.unit}</span>${recipeItem.ingredient}</div></li>`;

    return auxHTML;
};

const formatCount = count => {
    const intPart = Math.trunc( count);
    let fractionPart ='';
    let intPartStr = '';

    if(intPart > 0 )
    {
        intPartStr = intPart;
    }

    const floatPart = count - intPart;
    if( floatPart !== 0)
    {
        fractionPart = (new Fraction(floatPart)).toString();
    }

    return `${intPartStr} ${fractionPart}`;
};
