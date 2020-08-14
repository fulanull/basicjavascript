window.onload = function () {
    controller.init();

}


//BUDGET CONTROLLER
var budgetController = (function () {


    var Expense = function (id, description, value)
    {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percent = 'Mis';
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
        }
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
            console.log(data.allItems[type]);
            return newItem;
        },
    }
})();



//UI CONTROLLER
var UIController = (function (){


    var DOMstrings = {
        inputType: '.add__type',
        inputDescription:'.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn',
        incomeContainer : '.income__list',
        expenseContainer: '.expenses__list',
    }


    function getIncomeHTML(id, description, value)
    {
        return '<div class="item clearfix" id="income-' + id + '"><div class="item__description">' + description + '</div><div class="right clearfix"><div class="item__value">+ ' +  value + ' </div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
    }


    function getExpenseHTML(id, description, value, percent)
    {
        return '<div class="item clearfix" id="expense-' + id + '"><div class="item__description">' + description + '</div><div class="right clearfix"><div class="item__value">- ' + value + '</div><div class="item__percentage"> ' + percent + '% </div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
    }


    return {
        example:function (){ console.log('hi2'); },
        addLIstItem: function (newItem, type)
        {
            var htmlMark;
            var htmlContent;
            if(type === 'exp')
            {
                htmlMark = document.querySelector(DOMstrings.expenseContainer);
                htmlContent = getExpenseHTML(newItem.id, newItem.description, newItem.value, newItem.percent);
            }
            else if (type == 'inc')
            {
                htmlMark = document.querySelector(DOMstrings.incomeContainer);
                htmlContent = getIncomeHTML(newItem.id, newItem.description, newItem.value);
            }

            htmlMark.insertAdjacentHTML('beforeend', htmlContent);

        },
        getInput: function () {


            var addType = document.querySelector(DOMstrings.inputType);
            var addDescription = document.querySelector(DOMstrings.inputDescription);
            var addValue = document.querySelector(DOMstrings.inputValue);

            var type = addType.value; //inc or exp
            var description = addDescription.value;
            var value = addValue.value;

            //Change to && 
            if(description && value)
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
        // 4. Calculate the budget 
        // 5. Display the budget on the UI
        // 6. Clean the field.
        }

        console.log('it works!');

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
            setupEventListeners (); },
    }
})(budgetController, UIController);