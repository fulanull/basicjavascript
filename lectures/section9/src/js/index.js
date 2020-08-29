import Search from "./models/Search";
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader, elementStrings } from './views/base';
import Recipe from "./models/Recipe";
import * as recipeView from './views/recipeView';
import List from "./models/List";
import * as listView from './views/listView';
import Likes from "./models/Likes";
import * as viewLikes from './views/viewLikes';

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
});


elements.recipeContainer.addEventListener('click', e => {
    let changed;
    if (e.target.matches('use[href="img/icons.svg#icon-circle-with-minus"]')) {
        changed = state.recipe.updateServings('dec');
    }
    else if (e.target.matches('use[href="img/icons.svg#icon-circle-with-plus"]')) {
        changed = state.recipe.updateServings('inc');
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    } else if (e.target.matches(`.${elementStrings.recipeLike}, .${elementStrings.recipeLike} *`)) {
        controlLikes();
    }

    if (changed) {
        recipeView.updateServingsIngredients(state.recipe);
    }
});

elements.shoppingList.addEventListener('click', e => {
    const me = e.target.closest('.shopping__item');
    const id = me.dataset.itemid;

    //Handle Delete
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        // console.log('Clicou onde queria:' + e.target.value);
        state.list.updateCount(id, parseFloat(e.target.value, 10));
        // console.log(state.list.getItem(id));
    }
});

// elements.searchResultList.addEventListener('click', controllerRecipe);
window.addEventListener('hashchange', controllerRecipe);


//restore liked recipes on page loads

window.addEventListener( 'load' ,(e) => {
    state.likes = new Likes();
    state.likes.readStorage();
    viewLikes.toggleLikeMenu(state.likes.getNumLikes());
    state.likes.likes.forEach( viewLikes.renderLike );
    // console.log(state.likes);
}) ;


//Recipe CONTROLLER

async function controllerRecipe(e) {
    // const item = e.target.closest(`.${elementStrings.searchResultLink}`);
    const item = window.location.hash;
    // console.log(item);
    // console.log(location);
    // console.log(location.hash);

    if (item) {
        // const id = parseInt( item.dataset.id, 16);
        // const id = item.dataset.id;
        const id = item.split('#')[1];
        // console.log(`got Id ${id} from  ${item.dataset.id}`);

        state.recipe = new Recipe(id);

        try {
            //prepare UI fot the results
            recipeView.prepareViewforResults();
            renderLoader(elements.recipeContainer);

            //Highlight Selected search item
            searchView.highlightSelected(id);

            //get recipe
            await state.recipe.getResults();

            // console.log(state.recipe);
            // console.log(state.recipe.result);

            //render recipe
            let liked = false;
            if (state.likes)
            {
                liked = state.likes.isLiked(id);
            }
            recipeView.renderRecipe(state.recipe, liked);

            // if(state.likes) viewLikes.toggleLikeButton( state.likes.isLiked(id));

        } catch (error) {
            recipeView.prepareViewforResults();
            console.log('Error here' + error);
            // alert('Error here!');
        }
        clearLoader(elements.recipeContainer);

    }
    // const item = e.target.closest('.results__link');
};




/**
 * LIST CONTROLLER
 */
function controlList ()
{
    //Create a new list if there is none yet
    if(!state.list) state.list = new List();

    //Add each ingredient to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);

        //render data
        listView.renderItem(item);
    });
}


/**
 * LIKES CONTROLLER
 */

 function controlLikes()
 {
     if (state.recipe)
     {
         const rcp = state.recipe;

         const liked = state.likes.isLiked(rcp.id);
         if( liked )
         {
             state.likes.deleteLike(rcp.id);
             viewLikes.deleteLike(rcp.id);
         }else{
             const likeItem = state.likes.addLike(rcp.id, rcp.title, rcp.author, rcp.img);
             viewLikes.renderLike(likeItem);
         }
         viewLikes.toggleLikeMenu(state.likes.getNumLikes());
         viewLikes.toggleLikeButton(!liked);

     }
 }


console.warn("Remove this click bellow.");
// elements.searchInput.value = "pie";
elements.searchInput.value = "pizza";
elements.searchBnt.click();
console.log("The end!!!  #########################################");
