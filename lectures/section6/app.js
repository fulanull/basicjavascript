window.onload = function () {
    controller.init();

    examples();
}


//BUDGET CONTROLLER
var budgetController = (function () {


    var Expense = function (id, description, value)
    {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percent = -1;
    };

    Expense.prototype.calcPercentage = function( totalIncome)
    {
        this.percent = -1;
        if(totalIncome)
        {
            this.percent = Math.round( (this.value / totalIncome) * 100) ;
        }
        return this.getPercentage();
    };

    Expense.prototype.getPercentage = function ()
    {
        return this.percent;
    };

    var Income = function (id, description, value)
    {
        this.id = id;
        this.description = description;
        this.value = value;
    };


    var data = {
        allItems : {
            exp:[],
            inc:[],
        },
        totals: {
            exp: 0,
            inc: 0,
        },
        budget:0,
        percentage: -1,
    };

    var calculateTotal = function (type)
    {
        var sum = 0;

        for( var x of data.allItems[type] )
        {
            sum += x.value;
        }
        data.totals[type] = sum;

    };

    return {
        example:function (){ console.log('hi1'); },
        addItem: function (type, des, val)
        {
            var newItem, ID;


            ID = 0;
            if( data.allItems[type].length > 0)
            {
                ID = data.allItems[type][data.allItems[type].length-1].id+1;
            }

            switch (type) {
                case 'exp':
                    newItem = new Expense (ID, des, val);
                    data.totals.exp += val;
                    break;
                case 'inc':
                    newItem = new Income (ID, des, val);
                    data.totals.inc += val;
                    break;
                default:
                    console.log('something is wrong! 1')
                    newItem = null;
                    break;
            }
            data.allItems[type].push(newItem);
            return newItem;
        },
        calculateBudget: function ()
        {
            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            // calculate the percentage of income tha we spent

            data.percentage = -1 ;
            if(data.totals.inc)
            {
                data.percentage = Math.round( (data.totals.exp / data.totals.inc) * 100) ;
            }

            return this.getBudget();
        },
        caculatePercentages: function ()
        {
            var i, totalInc;

            totalInc = data.totals.inc;
            var allPerc = data.allItems.exp.map( function(element, index) {
                return element.calcPercentage(totalInc);
            });

            return allPerc;
        },
        getPercentages: function ()
        {
            var allPerc = data.allItems.exp.map(function(element, index, arr)
                {
                    return element.getPercentage();
                });
            return allPerc;
        },
        deleteItem: function (type, id)
        {
            var elementToBeRemoved, i;
            for( i=0; i < data.allItems[type].length; ++i)
            {
                if( id === data.allItems[type][i].id )
                {
                    elementToBeRemoved = data.allItems[type][i];
                    data.allItems[type].splice(i, 1);
                    break;
                }
            }

        },
        getBudget: function ()
        {
            return { budget:data.budget, totalInc:data.totals.inc, totalExp:data.totals.exp, percentage: data.percentage };
        }
    }
})();



//UI CONTROLLER
var UIController = (function (){


    var DOMstrings = {
        parentContainer: '.container',
        expenseContainer: '.expenses__list',
        inputBtn : '.add__btn',
        incomeContainer : '.income__list',
        inputDescription:'.add__description',
        inputType: '.add__type',
        inputValue : '.add__value',
        budgetLabel: '.budget__value',
        incomeLable:'.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        expensesPercLabel: '.item__percentage',
        dateLabel:'.budget__title--month',
    }


    function getIncomeHTML(id, description, value)
    {
        return '<div class="item clearfix" id="inc-' + id + '"><div class="item__description">' + description + '</div><div class="right clearfix"><div class="item__value">' +  value + ' </div><div class="item__delete"><button class="item__delete--btn" ><i class="ion-ios-close-outline"></i></button></div></div></div>'
    };


    function getExpenseHTML(id, description, value, percent)
    {
        return '<div class="item clearfix" id="exp-' + id + '"><div class="item__description">' + description + '</div><div class="right clearfix"><div class="item__value">' + value + '</div><div class="item__percentage"> ' + percent + '% </div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
    };


    formatNumber = function (num, type)
    {
        /*
            + or - before a number
            exactly 2 decimal points
            comma separating the thousands
        */
        var numSplit, numInt, numDec;
        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');
        numInt = numSplit[0];
        numDec = numSplit[1];

        if (numInt.length > 3 )
        {
            numInt =  numInt.substring(0, numInt.length-3) + ',' + numInt.substring(numInt.length-3, numInt.length);
        }



        return ((type === 'exp' ? '- ': '+ ' ) + numInt + '.' + numDec);

    };


    return {
        example:function (){ console.log('hi2'); },
        addLIstItem: function (newItem, type)
        {
            var htmlMark;
            var htmlContent;
            if(type === 'exp')
            {
                htmlMark = document.querySelector(DOMstrings.expenseContainer);
                htmlContent = getExpenseHTML(newItem.id, newItem.description, formatNumber(newItem.value, type), newItem.percent);
            }
            else if (type == 'inc')
            {
                htmlMark = document.querySelector(DOMstrings.incomeContainer);
                htmlContent = getIncomeHTML(newItem.id, newItem.description, formatNumber(newItem.value, type));
            }

            htmlMark.insertAdjacentHTML('beforeend', htmlContent);

        },
        changedType: function (event)
        {
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
                );

            for(var x of fields)
            {
                x.classList.toggle('red-focus');
            }

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },
        deleteLIstItem: function (selectorID)
        {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },
        displayBudget: function (obj)
        {
            var type = (obj.totalInc >= obj.totalExp ? 'inc': 'exp');
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber( obj.budget, type );
            document.querySelector(DOMstrings.incomeLable).textContent = formatNumber( obj.totalInc, 'inc' );
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            document.querySelector(DOMstrings.percentageLabel).textContent =   ( obj.percentage > 0 ?  "" + obj.percentage + "%" : "--" );

        },
        displayMonth: function()
        {
            var now, year, month, months;
            now = new Date();
            year = now.getFullYear();
            month = now.getMonth();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            // console.log('###');
            // console.log(now);
            // console.log(now.getFullYear());
            // console.info(now.getMonth());
            // console.info(now.toLocaleDateString());
            document.querySelector(DOMstrings.dateLabel).textContent =  months[month] +  ' (' + now.getFullYear() + ')';

        },
        displayPercentages: function(percentages)
        {
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
            for(var i in percentages)
            {
                fields[i].textContent = ( percentages[i] > 0 ? percentages[i] + ' %' : '--');
            }
        },
        getInput: function () {


            var addType = document.querySelector(DOMstrings.inputType);
            var addDescription = document.querySelector(DOMstrings.inputDescription);
            var addValue = document.querySelector(DOMstrings.inputValue);

            var type = addType.value; //inc or exp
            var description = addDescription.value;
            var value = addValue.value;
            value = parseFloat(value);

            //Change to &&
            if(description && value && value > 0)
            {
                addDescription.value=null;
                addValue.value = null;
                addDescription.focus();
                return {type:type, description:description, value:value};
            }

            return null;
        },
        getDOMstrings: function () { return DOMstrings; },
    }
})();



//GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl ){

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
            // console.log(event);
            // console.log(event.keyCode);
            // console.log(event.which);
            if ( event.keyCode === 13 || event.which === 13 ) //Hit [Enter]
            {
                console.log("Enter was pressed!");
                ctrlAddItem();
            }
        });


        document.querySelector(DOM.parentContainer).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);

    };

    var updateBudget = function ()
    {
        // 1. Calculate the budget
        var budget = budgetCtrl.calculateBudget();
        // 2. return the budget
        // 3. Display the budget on the UI
        // console.log(budget);
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function ()
    {
        // 1. calculate Percentages
        //2. Read Percentages from budget controller
        var percentages = budgetCtrl.caculatePercentages();

        //3. Update User Interface
        UICtrl.displayPercentages(percentages);

    };

    var ctrlAddItem = function () {
        var input, newItem;
        // 0. Checks if display is filled
        // 1. Get  the field input data
        input = UICtrl.getInput();
        // console.log(input);
        // 2. Add the item to the budget controller
        if(input)
        {
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3. Add the iten to the UI
            UICtrl.addLIstItem(newItem, input.type);
            // 4. Calculate and update the budget
            updateBudget();
            //5. Calculte and update Percentages
            updatePercentages();

        }

        console.log('it works!');

    };


    var ctrlDeleteItem = function (event)
    {
        var itemID, splitID, ID, type;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID)
        {
            console.log('tandammm');
            splitID = itemID.split('-');

            type = splitID[0];
            ID =   parseInt( splitID[1] );


            //1. Delete item from data structure
            budgetCtrl.deleteItem(type, ID);

            //2 . Delete tem item from the UI
            UICtrl.deleteLIstItem(itemID);

            //3. Update budget  and show the new budgets (totals)
            updateBudget();
            //4. Calculte and update Percentages
            updatePercentages();



        }
    };




    return {
        example:function ()
        {
            budgetCtrl.example();
            UICtrl.example();
            console.log('hi3');
        },
        init: function () {
            console.log("Application started !!!");
            setupEventListeners ();
            UICtrl.displayBudget({ budget:0, totalInc:0, totalExp:0, percentage: 0 });
            UICtrl.displayMonth();
        },
    }
})(budgetController, UIController);


function testing(e)
{
    console.log('testing...');
    console.log(e);
    console.log(e.parent);
}

function examples()
{

    var newItem = budgetController.addItem('inc', 'aaa', 1000);
    // 3. Add the iten to the UI
    UIController.addLIstItem(newItem, 'inc');
    // 4. Calculate and update the budget

    newItem = budgetController.addItem('inc', 'bbb', 3000);
    UIController.addLIstItem(newItem, 'inc');

    newItem = budgetController.addItem('inc', 'fff', 99.99);
    UIController.addLIstItem(newItem, 'inc');

    newItem = budgetController.addItem('exp', 'ccc', 300);
    UIController.addLIstItem(newItem, 'exp');

    newItem = budgetController.addItem('exp', 'ddd', 700);
    UIController.addLIstItem(newItem, 'exp');

    newItem = budgetController.addItem('exp', 'eee', 1000);
    UIController.addLIstItem(newItem, 'exp');

    newItem = budgetController.addItem('exp', 'ggg', 99.99);
    UIController.addLIstItem(newItem, 'exp');

    var budget = budgetController.calculateBudget();
    // 2. return the budget
    // 3. Display the budget on the UI
    // console.log(budget);
    UIController.displayBudget(budget);

    var percentages = budgetController.caculatePercentages();

    //3. Update User Interface
    UIController.displayPercentages(percentages);
}