import { useState } from "react";
import Display from "./Display.jsx";
import Keypad from "./Keypad.jsx";
import History from "./History.jsx";
import { useHistory } from "../hooks/useHistory.js";

export default function Calculator() {
  const [value, setValue] = useState("0");
  const { history, addEntry, clear } = useHistory();

  function handleDigit(digit) {
    setValue((v) =>
      v === "0" && digit !== "." ? digit : digit === "." && v.includes(".") ? v : v + digit
    );
  }

  function handleClear() {
    setValue("0");
  }

  // Demonstrates the history feature until real calculations land in Commit 2.
  function handleLog() {
    addEntry(value, value);
  }

  return (
    <div className="calculator-layout">
      <div className="calculator-card">
        <Display value={value} />
        <Keypad onDigit={handleDigit} onClear={handleClear} />
        <button className="log-button" onClick={handleLog}>
          Save current value to history
        </button>
      </div>
      <History entries={history} onClear={clear} />
    </div>
  );
}
