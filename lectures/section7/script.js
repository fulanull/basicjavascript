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


//ES5
function test5()
{
    console.log(arguments);
}

//test5(1,2,3,4,5);


console.log(`###############Challenge 8###############################`);

class Place
{
    constructor(name, buildYear)
    {
        this.name = name;
        this.buildYear = buildYear;
    }

    calculateAge()
    {
        const d = new Date();
        return d.getFullYear() - this.buildYear;
    }

    static averageAge( ...arr )
    {
        let age = 0;
        for(let x of arr)
        {
            age += x.calculateAge();
            // console.log(x.calculateAge());
        }

        return age/arr.length;
    }
}



class Park extends Place {
  constructor(name, buildYear, numberOfTrees, parkArea) {
    super(name, buildYear);
    this.numberOfTrees = numberOfTrees;
    this.parkArea = parkArea;
  }

  treeDensity()
  {
      const density = this.numberOfTrees/this.parkArea;
      console.log(`The park ${this.name} has tree density of ${density} trees per m²`);
      return density;
  }
}


class Street extends Place {
  constructor(name, buildYear, streetLength, size= Street.NORMAL) {
    super(name, buildYear);

    this.length = streetLength;
    this.size = size;

  }
  static TINY = 'tiny';
  static SMALL = 'small';
  static NORMAL = 'normal';
  static BIG = 'big';
  static HUGE = 'huge';


  static averageLength(...arr) {
    let lenght = 0;
    for (let x of arr) {
      lenght += x.length;
    }
    return [lenght , lenght / arr.length];
  }

  info()
  {
      console.log(`The Street ${this.name} has ${this.length}m and it's considerd ${this.size}.`);
  }
}



//average ages of parks
const p1 = new Park('p1', 1990, 900, 1800);
const p2 = new Park('p2', 1980, 400, 600);
const p3 = new Park('p3', 1970, 7000, 5000);
const parks = [p1,p2, p3];

//1.
parks.forEach(el => el.treeDensity() );

//2.
const parkAvaregeAge = Place.averageAge(...parks);
console.log(`The parks average age is ${parkAvaregeAge} years;`);

//3.
console.log(
  `${
    parks.find((el) => el.numberOfTrees >= 1000).name
  }  has more than 1000 trees.`
);

//4. and 5.
const s1 = new Street("s1", 1990, 700, Street.SMALL);
const s2 = new Street("s2", 1980, 500, Street.TINY);
const s3 = new Street("s3", 1970, 800);
const s4 = new Street("s4", 1970, 8500, Street.HUGE);
const streets = [s1, s2, s3, s4];
// s1.info();

// streets.forEach( el => el.info() );
const [lengthStr, streetAvaregeLength] = Street.averageLength(...streets);
console.log(`The streets have a total of ${lengthStr}m length with average lenght of ${streetAvaregeLength} m.`);


console.log("######END#########");