//ES6
console.log(`##########`);
const years = [1990, 1965, 1982, 1937];

years.push(1985);
const arrRev = years.map( function (el, i, arr) {
    const num = arr[arr.length - 1 - i];
    // console.log(`${i} - ${el}`);
    // console.log(num);
    return num;
});

const years2 = years.map( (el, i, arr) => arr[arr.length - 1 - i]);

console.log(years);
console.log(years2);
console.log(arrRev);

console.log("##############");


class Person {
    constructor(name) { this.name = name; }

    myFriends(friends) {
        var arr = friends.map((el, i) => {
            return `${this.name} is friends with ${el} !`;
        });
        console.log(arr);
    }
}

let friends = ['Bob', 'Jane', 'Mark'];
const jo = new Person('John');
jo.myFriends(friends);

console.log(`###############`);
// const boxes = document.querySelectorAll('.box');
// boxes.forEach( el => console.log(el));


console.log("######END#########");