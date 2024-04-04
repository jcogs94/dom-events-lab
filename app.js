/*-------------------------------- Constants --------------------------------*/
const noEntry = '0';
const emptyEntry = '';

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

const numPressedHandler = (inputNum) => {
    if (equalsPressed) {
        entry1 = emptyEntry;
        clear();
    }
    if (operatorPressed && !displayEntry2)
        displayEntry2 = true;

    if (!displayEntry2 && entry1.length < 18) {
        if (entry1.length === 1 && entry1 === noEntry)
            entry1 = inputNum;
        else
            entry1 += inputNum;
        
        displayElement.innerText = entry1;
    }
    else if (displayEntry2 && entry2.length < 18) {
        entry2 += inputNum;
        displayElement.innerText = entry2;
    }
}

const clearHandler = () => {
    entry1 = noEntry;
    clear();
    
    displayElement.innerText = entry1;
}

const operatorHandler = (operatorButton) => {
    operatorPressed = true;
    operatorType = operatorButton.target.innerText;
    if (equalsPressed) {
        equalsPressed = false;
        entry2 = emptyEntry;
    }
}

const equalsHandler = () => {
    if (operatorPressed) {
        equalsPressed = true;
        num1 = Number(entry1);
        num2 = Number(entry2);
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

        entry1 = String(total);
        
        displayElement.innerText = total;
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
