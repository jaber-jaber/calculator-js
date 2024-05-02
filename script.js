const add = function(a, b) {
  return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const divide = function(a, b) {
  return a / b;
};

const multiply = function(args) {
  return args.reduce((multiplier, current) => multiplier * current, 1);
}

function operate(operator, firstNum, secondnum) {
    let operands = [firstNum, secondnum];
    let result;
    
    if (operator.localeCompare("+") === 0) {
        result = add(operands[0], operands[1]);
    } else if (operator.localeCompare("-") === 0) {
        result = subtract(operands[0], operands[1]);
    } else if (operator.localeCompare("x") === 0) {
        result = multiply(operands);
    } else if (operator.localeCompare("÷") === 0) {
        result = divide(operands[0], operands[1])
    }

    return result;
}

function updateDisplay(display, operation) {
  display.textContent = 0;
}

let operator, result;
let operatorCheck = 0;
let equalCheck = 0;
let firstNum = [];
let first, second;
let secNum = [];
const btns = document.querySelectorAll(".digit");
const display = document.querySelector('.display');
const operationButtons = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear')
let prevNumber = document.getElementById('previous');


btns.forEach((digit) => {
  digit.addEventListener("click", () => {
    if (operatorCheck === 0) {
      firstNum.push(digit.textContent);
      first = firstNum.join("");
      display.textContent = first;
    } else if (operatorCheck === 1) {
      secNum.push(digit.textContent);
      second = secNum.join("")
      display.textContent = second;
      prevNumber.textContent = `${first} ${operator} ${second}`
    } 
  });
});

operationButtons.forEach((operation) => {
  operation.addEventListener("click", () => {

    if (operatorCheck === 0) {
      operator = operation.textContent;
      updateDisplay(display);
      prevNumber.textContent = `${first} ${operator} `;
    }

    operatorCheck += 1;

    if (operatorCheck > 1) {
      result = operate(operator, parseFloat(first), parseFloat(second));
      prevNumber.textContent = `${first} ${operator} ${second} = ${result}`;
      operator = operation.textContent;
    
      firstNum = [];
      firstNum.push(result);
      first = result;

      console.log(first);
      
      updateDisplay(display);
      secNum = [];

      btns.forEach((digit) => {
        digit.addEventListener("click", () => {
          secNum.push(digit.textContent);
          second = secNum.join("");
          display.textContent = second;
        })
      })

      result = operate(operator, parseFloat(first), parseFloat(second));

    }
  });
});

// firstNum = parseInt(firstNum.join(""));
// secNum = parseInt(secNum.join(""));

equal.addEventListener("click", () => {
  result = operate(operator, parseFloat(first), parseFloat(second));
  display.textContent = result;
});

clear.addEventListener("click", () => {

  if (operatorCheck < 1) {
    updateDisplay(display);
    console.log("hi")
    firstNum = [];
    secNum = [];
    first, second = 0;

  } else if (operatorCheck > 1) {
    console.log("hello")
    updateDisplay(display);
    prevNumber.textContent = `your last calculation: ${first} ${operator} ${second} = ${result}`;
    firstNum = [];
    secNum = [];
    first, second = 0;
  }

  operatorCheck = 0;
})

