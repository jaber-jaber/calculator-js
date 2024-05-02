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

function operate(operator, firstnum, secondnum) {
    let operands = [firstnum, secondnum];
    let result;
    
    if (operator.localeCompare("+") === 0) {
        result = add(operands[0], operands[1]);
    } else if (operator.localeCompare("-") === 0) {
        result = subtract(operands[0], operands[1]);
    } else if (operator.localeCompare("*") === 0) {
        result = multiply(operands);
    } else if (operator.localeCompare("/") === 0) {
        result = divide(operands[0], operands[1])
    }

    return result;
}

let operator, firstnum, secondnum;

