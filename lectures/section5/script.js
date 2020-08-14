//function constructor

window.onload = function ()
{
    console.log('Loaded');
    john.calculateAge();
    jane.calculateAge();


}

var Person = function (name, yearOfBirth, job) { 
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    // this.calculateAge = function()
    // {
    //     console.log(2020 - this.yearOfBirth);
    // }
}

Person.prototype.year = 2020;
Person.prototype.calculateAge = function () {
    console.log( this.name + ' has ' + (this.year - this.yearOfBirth) + ' years!');
}


var john = new Person('John', 1990, 'teacher');
var jane= new Person('Jane', 1985, 'Secretary');


