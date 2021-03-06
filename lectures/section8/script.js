// this.onload = () => {
//   first();
// };

const second = () => {
  setTimeout(() => {
    console.log("Async Hey there!");
  }, 2000);
};

const first = () => {
  console.log("Hey there!");
  second();
  console.log("The end!");
};

//first()
console.log("################## PROMISSES ###########################");

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function printWarn(msg) {
  console.warn(`Supposed Warnning: ${msg}`);
  return getRecipe(msg[1]);
}

function printErr(msg) {
  console.error(`Supposed error: ${msg}`);
  return getRelated("Jonh");
}

function printResolved2(msg) {
  console.log(`printResolved2: ${msg}`);
  return getRelated("Jonh");
}

function printLast(msg) {
  console.log(`Print Last: ${msg}`);
  return printPromisses("Nada");
}

function rec1(msg) {
  console.log(`rec1: ${msg}`);
  // return getRelated("Jonh");
  return null;
}

function rec2(msg) {
  console.log(`rec2: ${msg}`);
}

function rec3(msg) {
  console.log(`rec3: ${msg}`);
  return printPromisses();
}

const recipesIds = [523, 883, 432, 974];
function promisseExecutor(resolve, reject) {
  const state = true;

  setTimeout(() => {
    // console.log(`Executing setTimeout from promisseExecutor`);
    if (state) {
      resolve(recipesIds);
    } else {
      reject("promisseExecutor forced problem!!!");
    }
  }, 1500);
}
const getIDs = new Promise(promisseExecutor);

function getRecipe(recID) {
  return new Promise((resolve, reject) => {
    setTimeout(
      (id) => {
        // console.log(`Executing setTimeout from getRecipe`);
        const recipe = { title: "Fresh tomato pasta", publisher: "Jonas" };
        resolve(`${id}: ${recipe.title}`);
        // reject(`getRecipe forced problem.`);
      },
      1500,
      recID
    );
  });
}

function getRelated(author) {
  return new Promise((resolve, reject) => {
    setTimeout(
      (rel) => {
        // console.log(`Executing setTimeout from getRelated`);
        const someShit = { title: "Italian Pizza", publisher: "Jonas" };
        resolve(`${rel}: ${someShit.title}`);
        // reject("getRelated forced problem.");
      },
      1500,
      author
    );
  });
}

function printPromisses(msg)
{
  return new Promise( (resolved, rejected) =>{
    console.log('PrintPromisses....');
    resolved(msg);
  } );
}

// getIDs.then(printWarn).catch(printErr);
// getIDs
//   .then(printWarn, printErr)
//   .then(printResolved2, rec1)
//   .then(printLast)
//   .catch(rec3);

// const p1 = getIDs.then(printWarn, printErr);
// const p2 = p1.then(printResolved2, rec1);
// const p3 = p2.then(printLast, rec3);
// p3.then(printAll, printAll);

// function printAll() {
//   console.log(p1);
//   console.log(p2);
//   console.log(p3);
//   return null;
// }

//Async FUNCTIONS ################################################

async function getRecipesAW()
{
  const IDs = await getIDs;
  console.log(IDs);
  const recipe = await getRecipe(IDs[1]);
  console.log(recipe);
  const author = await getRelated("Jonh");
  console.log(author);

  return recipe;

}
//getRecipesAW().then( msg => console.log(`It works!!! : ${msg}`));

//########### AJAX  CALLS - Time Wheather  ####################################
function getWeather(woeid)
{
  let pre = "https://cors-anywhere.herokuapp.com/"; //Workaroud -> js only allows requests in actual domain.
  const url = pre + `https://www.metaweather.com/api/location/${woeid}/`;
  // console.log(url);
  // pre = "";
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((obj) => {
      // console.log(obj);
      const today = obj.consolidated_weather[0];
      if(today)
      console.log(
        `${obj.title} / ${obj.parent.title} -> ${today.weather_state_name} ${today.the_temp}ºC`
      );
      // console.log(`${today.weather_state_name} ${today.the_temp}ºC`);
      // console.log(obj);
    })
    .catch((msg) => console.log("got error: " + msg));
}

// getWeather(455827);
// getWeather(455825);
// getWeather(44418);
// getWeather(2487956);
// getWeather(455819);
// getWeather(455826);
// getWeather(349859);
// getWeather(418440);
// getWeather(368148);
// getWeather(395269);
// getWeather();

//#Async #####################

async function getWeatherAsync(woeid)
{
  let pre = "https://cors-anywhere.herokuapp.com/"; //Workaroud -> js only allows requests in actual domain.
  const url = pre + `https://www.metaweather.com/api/location/${woeid}/`;
  try
  {
    const result = await fetch(url);
    const obj = await result.json();
    const today = obj.consolidated_weather[0];
    if (today){
      console.log(
        `${obj.title} / ${obj.parent.title} -> ${today.weather_state_name} ${today.the_temp}ºC`
      );
    }
  }
  catch(error)
  {
    console.warn(`I got the folling error: ${error}`);
  }

}

getWeatherAsync(455827);
getWeatherAsync(455825);
getWeatherAsync(44418);
// getWeatherAsync();

console.log("##################END###########################");
