export default function Display({ expression, value }) {
  return (
    <div className="display">
      <div className="display__expression">{expression}</div>
      <div className="display__result">{value}</div>
    </div>
  );
}
