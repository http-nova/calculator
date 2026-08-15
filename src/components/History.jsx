export default function History({ entries, onClear }) {
  return (
    <aside className="history">
      <div className="history__header">
        <h2>History</h2>
        <button className="history__clear" onClick={onClear}>Clear</button>
      </div>
      <ul className="history__list">
        {entries.length === 0 && (
          <li className="history__empty">No calculations yet</li>
        )}
        {entries
          .slice()
          .reverse()
          .map((entry) => (
            <li key={entry.id}>
              {entry.expression} = {entry.result}
            </li>
          ))}
      </ul>
    </aside>
  );
}
