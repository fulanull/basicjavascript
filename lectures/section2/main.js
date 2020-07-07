console.log("oi5")

/*
function bmi (vMass, vHeigh)
{
	rbmi = vHeigh*vHeigh;
	rbmi = vMass/rbmi;
	return rbmi;
}



var markMass = 70;
var markHeight = 1.70;

var johnMass = 70;
var johnHeight = 1.60;

var markBMI = bmi(markMass, markHeight);
var johnBMI = bmi(johnMass, johnHeight);

var bMarkBmi = markBMI > johnBMI;

var msgLog = "Mark has " + (bMarkBmi? "": "not ") + "greater BMI than John."
console.log(markBMI, johnBMI);
console.log(msgLog);

//*/

function carregou()
{
	console.log("Carregou");
}

document.onload = carregou;

var age = 30

if (age < 13)
{
	console.log("Child");
} else if (age <20) {
	console.log("Teenager");	
}else if (age < 30) {
	console.log("Young man");		
}else {
	console.log("Man");		
}


//challenge 2

var meanJohn = (89+120+103)/3;
var meanMike = (116+94+123)/3;
var meanMary = (97+134+105)/3;

switch (true) {
	case meanJohn === meanMike:
		console.log("It's a tie between John and Mike!", meanJohn);
		break;
	case meanJohn > meanMike:
		switch (true) {
			case meanJohn == meanMary:
				console.log("It's a tie between John and Mary!", meanJohn);
				break;
			case meanJohn > meanMary:
				console.log("John's time wins!", meanJohn);
				break;
			default:
				console.log("Mary's time wins!", meanMary);
				break;
		}
		break;
	default:
		switch (true) {
			case meanMike == meanMary:
				console.log("It's a tie between Mike and Mary!", meanMike);
				break;
			case meanMike > meanMary:
				console.log("Mike's time wins!", meanMike);
				break;
			default:
				console.log("Mary's time wins!", meanMary);
		}
}
 //arrays  ##############################################################
/*
var names = ['John', 'Mark', 'Jane'];
var years = new Array(1990, 1969, 1948);
years[years.length] = 1954;//inserts in end

years.push(1985); //inserts in end
years.unshift(1900); //inserts in begging
console.log( years);


console.log(years.pop()) //removes from the end
console.log (years.shift()) //removes from the begging

console.log(years.indexOf(1948)); //returns the index if there is an element, -1 otherwise.
console.log( names);
console.log( years);

for (i in names )
{
	console.log("Nomes " + names[i]);
}

//*/

//Challenge 3 ###############################################
/*
function billTax(billAmount)
{
	var tax = 0.1;
	if(billAmount < 50 )
	{
		tax = 0.2;
	}
	else if (billAmount < 200) {
		tax = 0.15;
	}

	return tax*billAmount;

}


var aBills =[124,84,268];
// var aBills =[10,100,1000];
var aTips = [];
var aFinalAmount = [];


for(i=0; i < aBills.length ; ++i )
{
	aTips[i] = billTax( aBills[i]);
	aFinalAmount[i] = aTips[i] + aBills[i];
}


console.log("Bills:", aBills);
console.log("Tips:", aTips);
console.log("Total Amount:", aFinalAmount);


//*/

//Objects and properties  ###############################################


//*/