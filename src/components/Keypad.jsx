const ROWS = [
  [{ label: "clr", type: "clear" }, { label: "DEL", type: "util", action: "backspace" }, { label: "%", type: "util", action: "percent" }, { label: "/", type: "op", action: "divide" }],
  [{ label: "7", type: "digit" }, { label: "8", type: "digit" }, { label: "9", type: "digit" }, { label: "*", type: "op", action: "multiply" }],
  [{ label: "4", type: "digit" }, { label: "5", type: "digit" }, { label: "6", type: "digit" }, { label: "-", type: "op", action: "subtract" }],
  [{ label: "1", type: "digit" }, { label: "2", type: "digit" }, { label: "3", type: "digit" }, { label: "+", type: "op", action: "add" }],
  [{ label: ".", type: "digit" }, { label: "0", type: "digit" }, { label: "=", type: "equals", wide: true }],
];

export default function Keypad({ onDigit, onOperator, onEquals, onClear, onPercent, onBackspace }) {
  function handleClick(key) {
    switch (key.type) {
      case "digit": return onDigit(key.label);
      case "op": return onOperator(key.action);
      case "clear": return onClear();
      case "equals": return onEquals();
      case "util":
        if (key.action === "percent") return onPercent();
        if (key.action === "backspace") return onBackspace();
        return;
      default: return;
    }
  }

  return (
    <div className="keypad">
      {ROWS.flat().map((key, i) => (
        <button
          key={i}
          className={`key key--${key.type}${key.wide ? " key--wide" : ""}`}
          onClick={() => handleClick(key)}
        >
          {key.label}
        </button>
      ))}
    </div>
  );
}
