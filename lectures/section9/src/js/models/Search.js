import axios from "axios";

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const url = "https://forkify-api.herokuapp.com/api/search?&q=" + this.query;
        // console.log(`url: ${this.query} -> ${url}`);

        try {
            const res = await axios(url);
            this.result = res.data.recipes;
            //   console.log(this.result);
            return this.result;
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }
}
