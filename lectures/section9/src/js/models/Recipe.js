import axios from "axios";

export default class Recipe{
    constructor(id) {
        this.id = id;
    }

    async getResults() {
        const url = "https://forkify-api.herokuapp.com/api/get?rId=" + this.id;
        // console.log(`url: ${this.id} -> ${url}`);

        try {
            const res = await axios(url);
            // this.result = res.data.recipe;
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.author_url = res.data.recipe.publisher_url;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            this.social_rank = res.data.recipe.social_rank;

            this.calcTime();
            this.calcServings();
            // console.log(this.result);
            // this.printData();
            return this;
        } catch (error) {
            console.error(`Error: ${error}`);
            throw error;
            // alert(`Error: ${error}`);
        }
    }

    calcTime () {
        //Assuming that each 3 ingredients take 15min
        const numIngredients = this.ingredients.length;
        const periods = Math.ceil( numIngredients/3);
        this.time = periods*15;
    }

    calcServings()
    {
        this.servings = 4;
    }

    printData() {
        console.log(`title - ${this.title}`);
        console.log(`author - ${this.author}`);
        console.log(`author_url - ${this.author_url}`);
        console.log(`img - ${this.img}`);
        console.log(`url - ${this.url}`);
        console.log(`ingredients - ${this.ingredients}`);
        console.log(`social_rank - ${this.social_rank}`);
    }
}