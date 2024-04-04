/*-------------------------------- Constants --------------------------------*/
const numbers = document.querySelectorAll(".number");

/*-------------------------------- Variables --------------------------------*/


/*------------------------ Cached Element References ------------------------*/


/*----------------------------- Event Listeners -----------------------------*/
numbers.forEach(number => {
  number.addEventListener("click", (event) => {
    // This log is for testing purposes to verify we're getting the correct value
    console.log(event.target.innerText);
    // Future logic to capture the button's value goes here...
  });
});

/*-------------------------------- Functions --------------------------------*/

