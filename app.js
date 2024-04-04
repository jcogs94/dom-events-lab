/*-------------------------------- Constants --------------------------------*/
const noEntry = '0';
const emptyEntry = '';
const maxCharacters = 18;

/*-------------------------------- Variables --------------------------------*/
let entry1 = noEntry;
let entry2 = emptyEntry;
let num1 = 0;
let num2 = 0;
let total = 0;
let displayEntry2 = false;
let operatorPressed = false;
let equalsPressed = false;
let operatorType = emptyEntry;

/*------------------------ Cached Element References ------------------------*/
const numbersElement = document.querySelectorAll(".number");
const displayElement = document.querySelector('.display');
const clearElement = document.querySelector('#clear');
const operatorElement = document.querySelectorAll(".operator");
const equalsElement = document.querySelector('#equals');

/*-------------------------------- Functions --------------------------------*/
// resets variable values for each new calculation
const clear = () => {
    entry2 = emptyEntry;
    num1 = 0;
    num2 = 0;
    total = 0;
    
    if (operatorPressed) {
        operatorPressed = false;
        operatorType = emptyEntry;
        displayEntry2 = false;
        equalsPressed = false;
    }
}

// decides which "entry" string to add the entered key to and updates display
const numPressedHandler = (inputNum) => {
    // calls variables if a number is pressed after equals
    if (equalsPressed) {
        entry1 = emptyEntry;
        clear();
    }

    // switches to second "entry" after an operator is pressed
    if (operatorPressed && !displayEntry2)
        displayEntry2 = true;

    // adds current number press to entry if it doesn't exceed max characters
    if (!displayEntry2 && entry1.length < maxCharacters) {
        // if first number, replaces starting zero, esle adds to entry
        if (entry1.length === 1 && entry1 === noEntry)
            entry1 = inputNum;
        else
            entry1 += inputNum;
        
        displayElement.innerText = entry1;
    }
    else if (displayEntry2 && entry2.length < maxCharacters) {
        entry2 += inputNum;
        displayElement.innerText = entry2;
    }
}

// calls clear() to reset variables when C is pushed
const clearHandler = () => {
    entry1 = noEntry;
    clear();
    displayElement.innerText = entry1;
}

// separated the calculations out in its own function to be used without pressing equals
const equalsCalculation = () => {
    // strings to numbers
    num1 = Number(entry1);
    num2 = Number(entry2);
    // decides mathematical operation and stores result in total
    switch (operatorType) {
        case '+':
            total = num1 + num2;
            break;
        case '-':
            total = num1 - num2;
            break;
        case '*':
            total = num1 * num2;
            break;
        case '/':
            total = num1 / num2;
            break;
    }

    // updates the first entry so the user can continue math with that value
    entry1 = String(total);

    displayElement.innerText = total;
}

// stores the type of operator in variable and logs that an operator has been pressed
const operatorHandler = (operatorButton) => {
    // add functionality for if user wants to make multiple calculations without hitting equals
    if (operatorPressed && entry2 !== emptyEntry) {
        equalsCalculation();
        entry2 = emptyEntry;
    }
    else
        operatorPressed = true;

    //updates operator and ensures cleared second entry for next number
    operatorType = operatorButton.target.innerText;
    if (equalsPressed) {
        equalsPressed = false;
        entry2 = emptyEntry;
    }
}

const equalsHandler = () => {
    // checks if operator has been pressed, else all variables and display stay the same
    if (operatorPressed) {
        equalsPressed = true;
        equalsCalculation();
        operatorPressed = false;
    }
}

/*----------------------------- Event Listeners -----------------------------*/
numbersElement.forEach(number => {
  number.addEventListener("click", (event) => {
    // // This log is for testing purposes to verify we're getting the correct value
    // console.log(event.target.innerText, typeof(event.target.innerText));

    // Future logic to capture the button's value goes here...
    numPressedHandler(event.target.innerText);
  });
});

operatorElement.forEach(element => {
    element.addEventListener('click', operatorHandler);
})

clearElement.addEventListener('click', clearHandler);

equalsElement.addEventListener('click', equalsHandler);
