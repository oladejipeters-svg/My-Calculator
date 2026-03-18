

const equationDisplay = document.querySelector("#equationDisplay");
const solutionDisplay = document.querySelector("#solutionDisplay");
const squareRoot = document.querySelector("#squareRoot");
const powerBtn = document.querySelector("#powerBtn");
const factorial = document.querySelector("#factorial");

const inverse = document.querySelector("#inverse");
const parentA = document.querySelector("#parentA");
const parentB = document.querySelector("#parentB");
const pie = document.querySelector("#pie");
const doubleZero = document.querySelector("#doubleZero");

const clear = document.querySelector("#clear");
const undo = document.querySelector("#undo");
const percentage = document.querySelector("#percentage");
const divide = document.querySelector("#divide");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");
const multiply = document.querySelector("#multiply");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const minus = document.querySelector("#minus");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const addIt = document.querySelector("#addIt");
const zero = document.querySelector("#zero");
const dott = document.querySelector("#dott");
const equationSign = document.querySelector("#equationSign");

let emptyArray = [];

// Factorial helper
function factorialCalc(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}


function addValueToScreen(value) {
  emptyArray.push(value);
  let cleanedDigits = emptyArray.join("");

  // Remove leading zero properly
  if (
    cleanedDigits.length > 1 &&
    cleanedDigits[0] === "0" &&
    !isNaN(cleanedDigits[1])
  ) {
    emptyArray.shift();
    cleanedDigits = emptyArray.join("");
  }

  equationDisplay.innerHTML = cleanedDigits;
}

function calculateResult() {
  if (emptyArray.length === 0) return;

  const arrayConvertedToString = emptyArray.join("");

  try {
    const result = Function("return " + arrayConvertedToString)();

    // Format result with thousand separators
    solutionDisplay.innerHTML =
      typeof result === "number" ? result.toLocaleString("en-US") : result;
  } catch (err) {
    solutionDisplay.innerHTML = "Error";
  }
}


function clearScreen() {
  emptyArray = [];
  equationDisplay.innerHTML = "";
  solutionDisplay.innerHTML = "";
}

function deleteValue() {
  emptyArray.pop();
  equationDisplay.innerHTML = emptyArray.join("");
}

document.addEventListener("DOMContentLoaded", () => {
  squareRoot.addEventListener("click", () => {
    const current = emptyArray.join("");
    if (current) {
      const result = Math.sqrt(Number(current));
      solutionDisplay.innerHTML = result;
    }
  });

  powerBtn.addEventListener("click", () => addValueToScreen("**2"));

  factorial.addEventListener("click", () => {
    const current = Number(emptyArray.join(""));
    if (!isNaN(current)) {
      const result = factorialCalc(current);
      solutionDisplay.innerHTML = result;
    }
  });

  zero.addEventListener("click", () => addValueToScreen("0"));
  dott.addEventListener("click", () => addValueToScreen("."));
  clear.addEventListener("click", () => clearScreen());
  undo.addEventListener("click", () => deleteValue());
  percentage.addEventListener("click", () => addValueToScreen("/100"));
  divide.addEventListener("click", () => addValueToScreen("/"));
  multiply.addEventListener("click", () => addValueToScreen("*"));
  minus.addEventListener("click", () => addValueToScreen("-"));
  addIt.addEventListener("click", () => addValueToScreen("+"));

  inverse.addEventListener("click", () => addValueToScreen("1/"));
  parentA.addEventListener("click", () => addValueToScreen("("));
  parentB.addEventListener("click", () => addValueToScreen(")"));
  pie.addEventListener("click", () => addValueToScreen("3.142857"));
  doubleZero.addEventListener("click", () => addValueToScreen("00"));

  equationSign.addEventListener("click", () => calculateResult());
  one.addEventListener("click", () => addValueToScreen("1"));
  two.addEventListener("click", () => addValueToScreen("2"));
  three.addEventListener("click", () => addValueToScreen("3"));
  four.addEventListener("click", () => addValueToScreen("4"));
  five.addEventListener("click", () => addValueToScreen("5"));
  six.addEventListener("click", () => addValueToScreen("6"));
  seven.addEventListener("click", () => addValueToScreen("7"));
  eight.addEventListener("click", () => addValueToScreen("8"));
  nine.addEventListener("click", () => addValueToScreen("9"));

  // Keyboard support
  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key)) {
      addValueToScreen(key); // digits
    } else if (["+", "-", "*", "(", ")", "/"].includes(key)) {
      addValueToScreen(key); // operators
    } else if (key === ".") {
      addValueToScreen(".");
    } else if (key === "Enter" || key === "=") {
      calculateResult();
    } else if (key === "Backspace") {
      deleteValue();
    } else if (key === "Escape") {
      clearScreen();
    }
  });
});
