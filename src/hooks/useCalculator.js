import { useState, useEffect, useCallback } from "react";

const OP_SYMBOLS = { add: "+", subtract: "−", multiply: "×", divide: "÷" };
const OP_VALUES = { add: "+", subtract: "-", multiply: "*", divide: "/" };

function compute(a, b, op) {
  const x = parseFloat(a);
  const y = parseFloat(b);
  switch (op) {
    case "+": return x + y;
    case "-": return x - y;
    case "*": return x * y;
    case "/": return y === 0 ? NaN : x / y;
    default: return y;
  }
}

function formatNumber(num) {
  if (!isFinite(num)) return "Error";
  const rounded = Math.round((num + Number.EPSILON) * 1e10) / 1e10;
  return String(rounded);
}

export function useCalculator(onEvaluate) {
  const [value, setValue] = useState("0");
  const [expression, setExpression] = useState("");
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [justEvaluated, setJustEvaluated] = useState(false);

  const inputDigit = useCallback((digit) => {
    if (justEvaluated) {
      setValue(digit === "." ? "0." : digit);
      setExpression("");
      setJustEvaluated(false);
      return;
    }
    setValue((v) =>
      v === "0" && digit !== "." ? digit : digit === "." && v.includes(".") ? v : v + digit
    );
  }, [justEvaluated]);

  const chooseOperator = useCallback((action) => {
    setValue((v) => {
      let base = v;
      if (operator && previous !== null && !justEvaluated) {
        base = formatNumber(compute(previous, v, OP_VALUES[operator]));
      }
      setPrevious(base);
      setExpression(`${base} ${OP_SYMBOLS[action]}`);
      return "0";
    });
    setOperator(action);
    setJustEvaluated(false);
  }, [operator, previous, justEvaluated]);

  const evaluate = useCallback(() => {
    if (operator === null || previous === null) return;
    const result = compute(previous, value, OP_VALUES[operator]);
    const formatted = formatNumber(result);
    const expressionText = `${previous} ${OP_SYMBOLS[operator]} ${value}`;

    setExpression(expressionText);
    setValue(formatted);
    if (formatted !== "Error") onEvaluate?.(expressionText, formatted);

    setPrevious(null);
    setOperator(null);
    setJustEvaluated(true);
  }, [operator, previous, value, onEvaluate]);

  const percent = useCallback(() => {
    setValue((v) => formatNumber(parseFloat(v) / 100));
  }, []);

  const backspace = useCallback(() => {
    if (justEvaluated) return;
    setValue((v) => (v.length > 1 ? v.slice(0, -1) : "0"));
  }, [justEvaluated]);

  const clearAll = useCallback(() => {
    setValue("0");
    setPrevious(null);
    setOperator(null);
    setExpression("");
    setJustEvaluated(false);
  }, []);

  // Keyboard support
  useEffect(() => {
    function onKeyDown(e) {
      if (/^[0-9]$/.test(e.key)) inputDigit(e.key);
      else if (e.key === ".") inputDigit(".");
      else if (e.key === "+") chooseOperator("add");
      else if (e.key === "-") chooseOperator("subtract");
      else if (e.key === "*") chooseOperator("multiply");
      else if (e.key === "/") { e.preventDefault(); chooseOperator("divide"); }
      else if (e.key === "Enter" || e.key === "=") evaluate();
      else if (e.key === "Backspace") backspace();
      else if (e.key === "Escape") clearAll();
      else if (e.key === "%") percent();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [inputDigit, chooseOperator, evaluate, backspace, clearAll, percent]);

  return { value, expression, inputDigit, chooseOperator, evaluate, percent, backspace, clearAll };
}
