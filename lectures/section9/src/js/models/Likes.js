export default class Likes{
    constructor(){
        this.likes = [];
    }

    addLike(id, title, author, img)
    {
        this.likes.push({ id, title, author, img});
        this.persistData();
        return this.likes[ this.likes.length -1];
    }

    deleteLike(id)
    {
        const position = this.likes.findIndex( el => el.id === id);
        if(position >= 0)
        {
            this.likes.splice(position,1);
            this.persistData();
        }
    }

    isLiked(id)
    {
        return (this.likes.findIndex( el => el.id ===id) !== -1);
    }

    getNumLikes()
    {
        return this.likes.length;
    }

    dump()
    {
        this.likes.forEach( e => console.log(e));
    }

    persistData()
    {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage ()
    {
        const storage = JSON.parse(localStorage.getItem('likes'));
        if (storage) this.likes = storage;
    }


}