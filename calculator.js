let inputNum = "";
let equal = "";
let operatorVar = "";
let firstNum = "";
let secondNum = "";
let currentOperator = "";
const decimal = document.querySelector(".decimal");
const display1 = document.querySelector(".display1");
const display2 = document.querySelector(".display2");
const numButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");

numButtons.forEach(number => number.addEventListener("click", takeNumberInput));
operatorButtons.forEach(operator => operator.addEventListener("click", setOperator));
equalButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", backspace);
window.addEventListener("keydown", handleKeyboardInput);

function takeNumberInput(key) {
    if (equal) {
        return;
    }

    if (Number.isInteger(key)) {
        inputNum += key;
    } else {
        inputNum += this.value;
    }

    display1.textContent = inputNum;
    
    if (this.value === ".") {
        decimal.removeEventListener("click", takeNumberInput);
    }
}

function setOperator(x) {
    equal = false;
    if (typeof(x) === 'string') {
        operatorVar = x;
    } else {
        operatorVar = this.value;
    }

    decideInputNum();

    if (operatorVar === currentOperator || currentOperator === "") {
        firstNum = operate(operatorVar, firstNum, secondNum);
    } else {
        firstNum = operate(currentOperator, firstNum, secondNum);
    }

    display2.textContent = firstNum + operatorVar;
    inputNum = "";
    currentOperator = operatorVar;
}

function evaluate() {
    if (currentOperator == "") {
        return;
    }

    decideInputNum();

    if (secondNum == "") {
        return;
    }

    let result = operate(currentOperator, firstNum, secondNum);
    display2.textContent = firstNum + operatorVar + secondNum + "=";
    display1.textContent = result;
    firstNum = result;
    inputNum = "";
    equal = true;
}

function clear() {
    inputNum = "";
    firstNum = "";
    secondNum = "";
    operatorVar = "";
    currentOperator = "";
    display1.textContent = "";
    display2.textContent = "";
    equal = "";
}

function backspace() {
    let len = inputNum.length;
    inputNum = inputNum.slice(0,len-1);
    display1.textContent = inputNum;
}

function handleKeyboardInput(k) {
    if (k.key >= 0 && k.key <= 9) {
        takeNumberInput(Number(k.key));
    }
    if (k.key === "=" || k.key === "Enter") {
        evaluate();
    }
    if (k.key === "Backspace") {
        backspace();
    }
    if (k.key === "Escape") {
        clear();
    }
    if (k.key === "+" || k.key === "-" || k.key === "*" || k.key === "/") {
        setOperator(convertOperator(k.key));
    }
}

function convertOperator(op) {
    if (op === "/") {
        return "÷";
    }
    if (op === "*") {
        return "x";
    }
    if (op === "+") {
        return "+";
    }
    if (op === "-") {
        return "-";
    }
}

function addition(a, b) {
    return Number(a) + Number(b);
}

function subtraction(a, b) {
    return Number(a) - Number(b);
}

function multiplication(a, b) {
    return Number(a) * Number(b);
}

function division(a, b) {
    return Number(a) / Number(b);
}

function operate(operator, a, b) {
    let result = null;
    if (b === "") {
        return a;
    } else if (operator === "+") {
        result = addition(a, b);
    } else if (operator === "-") {
        result = subtraction(a, b);
    } else if (operator === "x") {
        result = multiplication(a, b);
    } else if (operator === "÷") {
        if (b === 0) {
            alert("You cannot divide by 0.");
        }
        result = division(a, b);
    }
    
    if (result === null) {
        return;
    } else {
        return result.toFixed(8).replace(/\.?0+$/, "");
    }
}

function decideInputNum() {
    if (firstNum == "") {
        firstNum = inputNum;
    } else {
        secondNum = inputNum;
    }
}