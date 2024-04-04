/*-------------------------------- Constants --------------------------------*/
const noEntry = '0';
const emptyEntry = '';

/*-------------------------------- Variables --------------------------------*/
let entry1 = noEntry;
let entry2 = emptyEntry;
let num1 = 0;
let num2 = 0;
let displayEntry2 = false;
let operatorPressed = false;
let operatorType = '';

/*------------------------ Cached Element References ------------------------*/
const numbersElement = document.querySelectorAll(".number");
const displayElement = document.querySelector('.display')

/*----------------------------- Event Listeners -----------------------------*/
numbersElement.forEach(number => {
  number.addEventListener("click", (event) => {
    // // This log is for testing purposes to verify we're getting the correct value
    // console.log(event.target.innerText, typeof(event.target.innerText));

    // Future logic to capture the button's value goes here...
    numPressed(event.target.innerText);
  });
});

/*-------------------------------- Functions --------------------------------*/
const numPressed = (inputNum) => {
    if (!displayEntry2 && entry1.length < 18) {
        if (entry1.length === 1 && entry1 === noEntry)
            entry1 = inputNum;
        else
            entry1 += inputNum;
        
        displayElement.innerText = entry1;
    }
}
