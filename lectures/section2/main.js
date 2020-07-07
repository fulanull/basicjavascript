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


for(var i=0; i < aBills.length ; ++i )
{
	aTips[i] = billTax( aBills[i]);
	aFinalAmount[i] = aTips[i] + aBills[i];
}


console.log("Bills:", aBills);
console.log("Tips:", aTips);
console.log("Total Amount:", aFinalAmount);


//*/

//Objects and properties  ###############################################
//Challenge 4 ###############################################
/*
function getObject(pFullName, pMass, pHeight)
{
	var lObject =
	{
		fullName: pFullName,
		mass: pMass,
		height: pHeight,
		calculateBMI: function ()
		{
			this.bmi = this.height*this.height;
			this.bmi = this.mass/this.bmi;
			return this.bmi;
		},
		compareBMI: function (person)
		{
			if( this.bmi === person.bmi)
			{
				console.log(this.fullName + " and " + person.fullName + " have the same BMI!");
			}else if ( this.bmi >= person.bmi) {
				console.log(this.fullName + " has greater BMI than " + person.fullName + "!");
			}
			else
			{
				console.log(person.fullName + " has greater BMI than " + this.fullName + "!");
			}
		},


	};
	lObject.calculateBMI();
	return lObject;
}


var aux = getObject("Igor Menezes", 72, 1.79);
var mark = getObject("Mark John", 70, 1.70);
var john = getObject("John Mark", 70, 1.80);
console.log(aux.fullName);
console.log(typeof aux);
console.log(aux);
mark.compareBMI(john);

//*/


//Challenge 5 ###############################################

var restaurantObj = function(pBillValue)
{
	var objTmp =
	{
		billValue: pBillValue,
		calculateTotalAmount: function()
			{
				var tax = 0.1;
				if(this.billValue < 50 )
				{
					tax = 0.2;
				}
				else if (this.billValue < 200) {
					tax = 0.15;
				}
				this.calculatedTip = tax*this.billValue;
				this.totalAmount = this.billValue + this.calculatedTip;
			},
		printTotal: function()
			{
				console.log(this.billValue + (" (value) ") + this.calculatedTip + " (tip) = " + this.totalAmount + " (Total Amount).");
			},

	};

	objTmp.calculateTotalAmount();
	return objTmp;
}


var billValuesArray = [124,48,268,180,42];
var aRestaurants = [];
var aTipsAverage = 0;
for (var i=0; i < billValuesArray.length; ++i )
{
	aRestaurants.push( restaurantObj( billValuesArray[i]));
	console.log("Restaurant", i+1)
	aTipsAverage += aRestaurants[i].calculatedTip;
	// aRestaurants[i].printTotal();
}
aTipsAverage /= i;
// for(var i = 0; i < aRestaurants ; ++i)
// {

// }


var restaurantMarkObj = function(pBillValue)
{
	var objTmp =
	{
		billValue: pBillValue,
		calculateTotalAmount: function()
			{
				var tax = 0.25;
				if(this.billValue < 100 )
				{
					tax = 0.2;
				}
				else if (this.billValue < 300) {
					tax = 0.1;
				}
				this.calculatedTip = tax*this.billValue;
				this.totalAmount = this.billValue + this.calculatedTip;
			},
		printTotal: function()
			{
				console.log(this.billValue + (" (value) ") + this.calculatedTip + " (tip) = " + this.totalAmount + " (Total Amount).");
			},

	};

	objTmp.calculateTotalAmount();
	return objTmp;
}


var billValuesArray = [77,375,110,45];
var bRestaurants = [];
var bTipsAverage = 0;
for (var i=0; i < billValuesArray.length; ++i )
{
	bRestaurants.push( restaurantMarkObj( billValuesArray[i]));
	console.log("Restaurant", i+1)
	bTipsAverage += bRestaurants[i].calculatedTip;
	// aRestaurants[i].printTotal();
}
bTipsAverage /= i;

switch (true) {
	case aTipsAverage  == bTipsAverage:
		console.log("Same amount in tips");
		break;
		case aTipsAverage >= bTipsAverage:
		console.log("A has paided the greater amount in tips");
		break;
	default:
		console.log("B has paided the greater amount in tips");
		break;
}




//*/