const screen = document.querySelector("#screen h1");
let screenDisplay = "";
var result = 0;
var inputs = [];
var operation = "";

const buttons = document.querySelectorAll(".button");
buttons.forEach(button => button.addEventListener('click', clickHandler));

function clickHandler(e) {
  if (e.target.matches('h1')) {
    calculatorRun(e.target.innerText);
  } else {
    calculatorRun(e.target.firstElementChild.innerText);
  }
}

function calculatorRun(userInput) {
  console.log(userInput);
  if (userInput == "÷"){
    userInput = "/";
  }
  if (result == "ERROR") {
    clearCalculator();
  }

  if(userInput.match(/[0-9]/) && (screenDisplay.length < 13 )) {
    screenDisplay += userInput;
    screen.textContent = screenDisplay;
  } else if ((userInput == "+/-") && (screenDisplay != "")){
    screenDisplay = -(Number(screenDisplay));
    screen.textContent = screenDisplay;
  }else if ((userInput.match(/[x\/\+\-]/)) && (operation != "") && (inputs.length = 1) && (userInput != "+/-")) {
    enterPress(userInput);
    operation = userInput;
    screenDisplay = "";
    inputs.push(result);
  }else if (userInput.match(/[x\/\+\-]/) && (userInput != "+/-")){
    inputs.push(screenDisplay);
    operation = userInput;
    console.log("operation: " + operation);
    screenDisplay = "";
  }

  if ((userInput == ".") && (!screenDisplay.includes("."))) {
    screenDisplay += userInput;
    screen.textContent = screenDisplay;
  }

  if ((userInput == "CE") && (screenDisplay!= " ")) {
    screenDisplay= screenDisplay.slice(0, screenDisplay.length-1);
    screen.textContent = screenDisplay;
  }

  if (userInput == "Enter") {
    enterPress(userInput);
  }

  if (userInput == "C") {
    clearCalculator();
  }
}

function enterPress(userInput) {
  inputs.push(screenDisplay);
  inputs.forEach(input => Number(input));

  switch(operation) {
    case "+":
      operation = "";
      result = add(Number(inputs.pop()), Number(inputs.pop()));
      break;
    case "-":
      operation = "";
      result = subtract(Number(inputs.pop()), Number(inputs.pop()));
      break;
    case "/":
      operation = "";
      result = divide(Number(inputs.pop()), Number(inputs.pop()));
      console.log(result);
      break;
    case "x":
      operation = "";
      result = multiply(Number(inputs.pop()), Number(inputs.pop()));
      console.log(result);
      break;
    default:
      result = Number(screenDisplay);
      console.log(result);
      break;
  }
  if ((result > 9999999999999) || (result < -9999999999999)) {
    result = "ERROR";
  }
  if (String(result).length > 13) {
    result = String(result).slice(0,12);
  }
  screenDisplay = String(result);
  screen.textContent = screenDisplay;
}

function clearCalculator() {
  result = "";
  screenDisplay = "";
  operation = "";
  inputs = [];
  screen.textContent = screenDisplay;
}

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return b - a;
}
function divide(a, b) {
  if (a == 0) {
    return "ERROR";
  }
  return b / a;
}
function multiply(a, b) {
  return a * b;
}
