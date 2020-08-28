import { elements, limitRecipeTitle } from "./base";

export const renderLike = ( likeItem) =>
{
    const htmlText = getLikeItemHTML(likeItem.id, likeItem.title, likeItem.author, likeItem.img);
    elements.likesList.insertAdjacentHTML('beforeend', htmlText);
}

export const toggleLikeButton = isLiked =>
{
    const iconString = isLiked ? '' : '-outlined';
    const el = document.querySelector('.recipe__love  use');
    el.setAttribute(`href`, `img/icons.svg#icon-heart${iconString}`)
}

export const deleteLike = id =>
{
    const el = elements.likesList.querySelector(`a[ href="#${id}"]`).parentElement;
    el.parentElement.removeChild(el);
}

export const toggleLikeMenu = (numLikes) => {
    elements.MenuField.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}

function getLikeItemHTML(id, title, author, img)
{
    const htmlText = `<li><a class="likes__link" href="#${id}"><figure class="likes__fig">
    <img src="${img}" alt="${title}"></figure><div class="likes__data"><h4 class="likes__name">${limitRecipeTitle(title)}</h4>
    <p class="likes__author">${author}</p></div></a></li>`;

    return htmlText;
}




