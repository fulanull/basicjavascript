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
            this.parseIngredients();
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

    parseIngredients(){
        const unitsLong = ['tablespoons', 'tablespoon',  'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'cans' ];
        const unitsShort = ['tbsp'      , 'tbsp'      , 'oz'    , 'oz'    , 'tsp'      , 'tsp'     , 'cup' , 'pound' , 'can' ];
        const removibleWords = ['whole', ];

        unitsLong.push('packages');
        unitsShort.push('package');
        unitsLong.push('slices');
        unitsShort.push('slice');
        unitsLong.push('slice');
        unitsShort.push('slice');
        unitsLong.push('pinch');
        unitsShort.push('pinch');
        unitsLong.push('tsp.');
        unitsShort.push('tsp');
        unitsLong.push('tb.');
        unitsShort.push('tb');
        unitsShort.push('tsp');
        unitsLong.push('ripe');
        unitsShort.push('ripe');

        // unitsLong.push();
        // unitsShort.push();

        const newIngredients = this.ingredients.map(el => {
            //1- Uniform units
            el = el.toLowerCase();
            let ingredient;
            removibleWords.forEach(el2 => ingredient = el.replace(el2, '' ));

            // console.log(`Testing: ${ingredient} - ${el}`); //IGOR:

            unitsLong.forEach( (unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
                // if(el !== ingredient)
                // {
                //     console.log(`changed from ${unit} to ${unitsShort[i]}`);
                // }
            });

            //2- Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

            //3- Parse ingredients into count, unit and ingredient
            const arrIngredient = ingredient.split(' ');
            const unitIndex = arrIngredient.findIndex( el2 => { return unitsShort.includes(el2) });



            let objIngredient = {
                count: 1,
                unit: '.',
                ingredient: '####'
            };

            if( unitIndex > -1)
            {
                //There is an unit
                objIngredient.unit = arrIngredient[unitIndex];
                objIngredient.ingredient = ' ' + arrIngredient.slice(unitIndex + 1).join(' ');
                // objIngredient.count = arrIngredient[unitIndex -1];


                if (parseInt(arrIngredient[0], 10)) {

                    if(unitIndex === 0)
                    {

                    } else  if( unitIndex === 1)
                    {
                        if (arrIngredient[0].indexOf('-') === -1 )
                        {
                            objIngredient.count = eval( `${arrIngredient[0].replace('-', '+')}`);
                        }
                        else
                        {
                            objIngredient.count = eval( `${arrIngredient[0].replace('-', '+')}/2`);
                        }
                        // console.log(`#1: ${arrIngredient[0]}`);
                        // console.log(`eval: ${objIngredient.count} || ${el}`);//IGOR:

                    }else if(unitIndex === 2 )
                    {
                        const aux = `(${arrIngredient[0]} + ${arrIngredient[1]})/2`;
                        objIngredient.count = eval(aux);
                        // console.log(`#2: ${arrIngredient[0]}`);
                        // console.log(`eval: ${objIngredient.count} || ${el}`);//IGOR:
                    }
                    else{
                        objIngredient.count = arrIngredient[0];
                        // console.log(`Testing: ${ingredient} || ${el}`);//IGOR:
                        // console.warn('Miouuuu');
                    }
                }else //if()
                {
                    console.log(`Testing: ${ingredient} || ${el}`);//IGOR:
                    console.warn('Nao deu');
                }


            } else if (parseInt(arrIngredient[0], 10)) {
                //there is no unit, but first element is an number
                objIngredient.count = arrIngredient[0];

                // console.log(`First Number: ${arrIngredient[0]}`);
                // console.log(`Testing: ${ingredient} || ${el}`);//IGOR:
                objIngredient.ingredient = arrIngredient.slice(1).join(' ');

            } else if (unitIndex == -1) {
                //There isn't an unit neither a number
                objIngredient.ingredient = ingredient;
                console.log(`Lost: ${arrIngredient[0]}`);
                console.log(`Lost: ${ingredient} || ${el}`);//IGOR:
                objIngredient.unit = '';

            }

            return objIngredient;

        });
        // console.log(this.ingredients);
        // console.log(newIngredients);
        this.ingredients = newIngredients;
    }
}