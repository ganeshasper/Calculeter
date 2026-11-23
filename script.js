const display = document.getElementById("display");
let expression = "0";

function updateDisplay() {
  display.value = expression;
}

function addValue(value) {
  if (expression === "Error") expression = "0";

  if (expression === "0" && /^[0-9]$/.test(value)) {
    expression = value;
  } else {
    expression += value;
  }

  updateDisplay();
}

function clearDisplay() {
  expression = "0";
  updateDisplay();
}

function deleteLast() {
  expression = expression.slice(0, -1) || "0";
  updateDisplay();
}

function calculate() {
  try {
    // Only allow calculator characters before evaluating the expression.
    if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
      throw new Error("Invalid expression");
    }

    const result = Function('"use strict"; return (' + expression + ')')();

    if (!Number.isFinite(result)) {
      throw new Error("Invalid result");
    }

    expression = String(Number(result.toFixed(10)));
  } catch {
    expression = "Error";
  }

  updateDisplay();
}
