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
            this.result = res.data.recipe;
            // console.log(this.result);
            return this.result;
        } catch (error) {
            // console.error(`Error: ${error}`);
            alert(`Error: ${error}`);
        }
    }
}