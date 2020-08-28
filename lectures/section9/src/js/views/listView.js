import { elements } from "./base";

export const renderShoppingList = listItem => {

    let listItemHTML;
    listItem.forEach (el =>{
        listItemHTML += getItemHTML(el);
    });

    elements.shoppingList.innerHTML = listItemHTML;

};

export const renderItem = item => {
    const itemHTML = getItemHTML (item.id, item.count, item.unit, item.ingredient);
    elements.shoppingList.insertAdjacentHTML('beforeend', itemHTML);
}

export const deleteItem = id => {
    const element = elements.shoppingList.querySelector(`li[data-itemid="${id}"]`); //IGOER PODE TER ERRO AQUI
    elements.shoppingList.removeChild(element);
}

const getItemHTML = (id, count, unit, ingredient) => {
    const itemHTML = `<li class="shopping__item" data-itemid="${id}"><div class="shopping__count">
                        <input type="number" value="${count}" step="${count}" class="shopping__count-value"><p>${unit}</p>
                    </div>
                    <p class="shopping__description">${ingredient}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>`;

    return itemHTML;
}