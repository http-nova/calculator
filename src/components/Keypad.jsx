const ROWS = [
  [{ label: "AC", type: "clear" }, { label: "DEL", type: "disabled" }, { label: "%", type: "disabled" }, { label: "÷", type: "disabled" }],
  [{ label: "7", type: "digit" }, { label: "8", type: "digit" }, { label: "9", type: "digit" }, { label: "×", type: "disabled" }],
  [{ label: "4", type: "digit" }, { label: "5", type: "digit" }, { label: "6", type: "digit" }, { label: "−", type: "disabled" }],
  [{ label: "1", type: "digit" }, { label: "2", type: "digit" }, { label: "3", type: "digit" }, { label: "+", type: "disabled" }],
  [{ label: "0", type: "digit", wide: true }, { label: ".", type: "digit" }, { label: "=", type: "disabled" }],
];

export default function Keypad({ onDigit, onClear }) {
  return (
    <div className="keypad">
      {ROWS.flat().map((key, i) => {
        if (key.type === "digit") {
          return (
            <button
              key={i}
              className={`key key--digit${key.wide ? " key--zero" : ""}`}
              onClick={() => onDigit(key.label)}
            >
              {key.label}
            </button>
          );
        }
        if (key.type === "clear") {
          return (
            <button key={i} className="key key--util" onClick={onClear}>
              {key.label}
            </button>
          );
        }
        return (
          <button
            key={i}
            className="key key--op"
            disabled
            title="Calculation logic lands in Commit 2"
          >
            {key.label}
          </button>
        );
      })}
    </div>
  );
}
