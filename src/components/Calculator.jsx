import Display from "./Display.jsx";
import Keypad from "./Keypad.jsx";
import History from "./History.jsx";
import { useHistory } from "../hooks/useHistory.js";
import { useCalculator } from "../hooks/useCalculator.js";

export default function Calculator() {
  const { history, addEntry, clear } = useHistory();
  const {
    value,
    expression,
    inputDigit,
    chooseOperator,
    evaluate,
    percent,
    backspace,
    clearAll,
  } = useCalculator(addEntry);

  return (
    <div className="calculator-layout">
      <div className="calculator-card">
        <Display expression={expression} value={value} />
        <Keypad
          onDigit={inputDigit}
          onOperator={chooseOperator}
          onEquals={evaluate}
          onClear={clearAll}
          onPercent={percent}
          onBackspace={backspace}
        />
      </div>
      <History entries={history} onClear={clear} />
    </div>
  );
}
