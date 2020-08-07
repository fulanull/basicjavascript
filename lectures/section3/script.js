///////////////////////////////////////
// Lecture: Hoisting



//IGOR: Me doing

//functions 
/*
var year = 1990;
calculateAge(year);

function calculateAge(year)
{
    console.log(2016 - year);
}

//retirement(1990);

var retirement = function (year)
{
    console.log(65 - (2016 - year));
}

retirement(1990);


//variables

var age = 23;

function foo()
{

    //console.log(age);
    var age = 65;
    console.log(age);
}

foo();
console.log(age);


//*/


///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = ' Hi!';
    second();

    function second() {
        var c = ' Hey!';
        console.log(a + b + c);
    }
}
//*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
//*/



///////////////////////////////////////
// Lecture: The this keyword

console.log(this)

window.onload = function()
{
    console.log("carreguei!");
}
// console.log(this)


var john = {
    name: "John",
    yearOfBirth:1990,
    calculateAge: function()
    {
        console.log(this);
        console.log(2020 - this.yearOfBirth);
    },
}

john.calculateAge();

//*/



