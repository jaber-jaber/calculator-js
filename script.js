const add = function(a, b) {
  return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const divide = function(a, b) {
  let result = a / b;

  if (b === 0) {
    alert("stop. why are u doing this man?");
    return "dont do that >:(";
  }

  return result.toFixed(3);
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

function updateDisplay(display, operation="") {
  display.textContent = operation + "";
  display.style.cssText = "justify-content: flex-start";
}

let operator;
let result = 0;
let operatorCheck = 0;
let equalCheck = 0;
let firstNum = [];
let first, second;
let secNum = [];
let decimalCheck = 0;
const btns = document.querySelectorAll(".digit");
const display = document.querySelector('.display');
const operationButtons = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
const backspace = document.querySelector('.backspace');
const clear = document.querySelector('.clear');
const decimal = document.querySelector('.decimal')
let prevNumber = document.getElementById('previous');


btns.forEach((digit) => {
  digit.addEventListener("click", () => {

    if (digit === decimal && firstNum.length > 0 && decimalCheck > 0) {
      return; // Do nothing if the decimal has been used
    }

    if (digit === decimal && firstNum.length > 0 && decimalCheck === 0) {
      decimalCheck += 1;
    }

    if (operatorCheck === 0) {
      firstNum.push(digit.textContent);
      first = firstNum.join("");
      display.textContent = first;
    } else if (operatorCheck >= 1) {
      secNum.push(digit.textContent);
      second = secNum.join("")
      display.textContent = second;
      display.style.cssText = "justify-content: flex-end";
      prevNumber.textContent = `${first} ${operator} ${second}`
    } 
  });
});

operationButtons.forEach((operation) => {
  operation.addEventListener("click", () => {

    operatorCheck += 1;

    if (operatorCheck === 1) {
      operator = operation.textContent;
      updateDisplay(display, operator);
      prevNumber.textContent = `${first} ${operator} `;
    } else if (operatorCheck > 1) {
      result = operate(operator, parseFloat(first), parseFloat(second));
      prevNumber.textContent = `${first} ${operator} ${second} = ${result}`;
      operator = operation.textContent;

      first = result.toString();
      firstNum = [];
      firstNum.push(first);

      second = 0;
      secNum = [];
      updateDisplay(display, operator);
    }
  });
});

// firstNum = parseInt(firstNum.join(""));
// secNum = parseInt(secNum.join(""));

equal.addEventListener("click", () => {
  result = operate(operator, parseFloat(first), parseFloat(second));
  display.textContent = result;
  display.style.cssText = "justify-content: flex-start";
});

clear.addEventListener("click", () => {

  if (operatorCheck < 1) {
    updateDisplay(display);
    prevNumber.textContent = "";
    firstNum = [];
    secNum = [];
    first, second = 0;

  } else if (operatorCheck >= 1) {
    if (result === 0) {
      prevNumber.textContent = "";
    } else {
      prevNumber.textContent = `last calculation: ${first} ${operator} ${second} = ${result}`;
    }

    updateDisplay(display);
    firstNum = [];
    secNum = [];
    first, second = 0;
  }
  
  operatorCheck = 0;
  decimalCheck = 0;
})

backspace.addEventListener("click", () => {
  if (operatorCheck === 0) {
    let lastElement = firstNum.pop();

    if (lastElement.localeCompare(".")) {
      decimalCheck = 0;
    }

    first = firstNum.join("");
    display.textContent = first;
  }

  if (operatorCheck > 0) {
    let lastElement = secNum.pop();

    if (lastElement.localeCompare(".")) {
      decimalCheck = 0;
    }

    second = secNum.join("");
    display.textContent = second;
  }
})

document.addEventListener("keydown", (event) => {
  const key = event.key;
  const numerical = "0123456789";
  const operators = ["+", "-", "*", "/"]

  if (numerical.includes(key)) {
    if (operatorCheck === 0) {
      firstNum.push(key);
      first = firstNum.join("");
      display.textContent = first;
    } else if (operatorCheck >= 1) {
      secNum.push(key);
      second = secNum.join("")
      display.textContent = second;
      display.style.cssText = "justify-content: flex-end";
      prevNumber.textContent = `${first} ${operator} ${second}`
    } 
  } else if (operators.includes(key)) {
      operatorCheck += 1;

      if (operatorCheck === 1) {
        operator = key.replace("*", "x");
        updateDisplay(display, operator);
        prevNumber.textContent = `${first} ${operator} `;
      } else if (operatorCheck > 1) {
        result = operate(operator, parseFloat(first), parseFloat(second));
        prevNumber.textContent = `${first} ${operator} ${second} = ${result}`;
        operator = key.replace("*", "x");

        first = result.toString();
        firstNum = [];
        firstNum.push(first);

        second = 0;
        secNum = [];
        updateDisplay(display, operator);
    }
  } else if (key === 'Enter') {
    result = operate(operator, parseFloat(first), parseFloat(second));
    display.textContent = result;
    display.style.cssText = "justify-content: flex-start";
  }
})