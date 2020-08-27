import Search from "./models/Search";
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader, elementStrings } from './views/base';
import Recipe from "./models/Recipe";
import * as recipeView from './views/recipeView';

console.log("str");

/** Global state of the app
 * -Search object
 * -Current recipe object
 * -Shopping list object
 * -Liked recipes
 */
const state = {};

const controlSearch = async () => {
    //1) Get query from the view
    const query = searchView.getInput();
    //2) Create a new search Object and add to State
    if (query) {
        state.search = new Search(query);

        //3) prepare UI for the results
        searchView.prepareViewforResults();
        renderLoader(elements.searchResults);


        //4) Search for recipes
        await state.search.getResults();
        // console.log(await state.search.result);
        // console.log(state.search.result);

        //5) Render the search results in UI
        searchView.renderResults(state.search.result);
        // state.search.result.forEach((a, i) => {
        //     if (i < 5) {
        //         console.log(`id: ${a.recipe_id} - ${a.title}`);
        //     };

        // });
        clearLoader(elements.searchResults);
    }
};

elements.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    controlSearch();
    console.log(`Hi`);

    // console.log(e.target);
    // console.log(e);
    // console.log(`Valor: ${e.value}`);
});

elements.searchResultPage.addEventListener("click", e =>{
    const btn = e.target.closest(`.${elementStrings.searchPageBtn}`);

    if(btn)
    {
        // const page = parseInt(btn.attributes['data-goto'].value);
        const gotoPage = parseInt(btn.dataset.goto, 10);
        searchView.prepareViewforResults();
        searchView.renderResults(state.search.result, gotoPage);
    }
} );

elements.searchResultList.addEventListener('click', async function (e) {
    const item = e.target.closest(`.${elementStrings.searchResultLink}`);
    console.log(item);

    if(item)
    {
        // const id = parseInt( item.dataset.id, 16);
        const id = item.dataset.id;
        console.log(`got Id ${id} from  ${item.dataset.id}`);

        state.recipe = new Recipe(id);

        //prepare UI fot the results
        recipeView.prepareViewforResults();
        renderLoader(elements.recipeContainer);

        //get recipe
        await state.recipe.getResults();

        // console.log(state.recipe);
        // console.log(state.recipe.result);

        //render recipe
        recipeView.renderRecipe(state.recipe.result);
        clearLoader(elements.recipeContainer);

    }
    // const item = e.target.closest('.results__link');
});

console.warn("Remove this click bellow.");
elements.searchInput.value = "pie";
elements.searchBnt.click();
console.log("The end!!!  #########################################");
