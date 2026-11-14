export const resultCols = [
  { key: 'rank', label: 'Rank', num: true }, { key: 'name', label: 'Name' }, { key: 'score', label: 'Score', num: true },
];
export const seasonCols = [
  { key: 'rank', label: 'Rank', num: true }, { key: 'name', label: 'Name' }, { key: 'points', label: 'Points', num: true },
  { key: 'wins', label: 'Wins', num: true }, { key: 'events', label: 'Events', num: true },
];

export default function LeaderboardTable({ rows, columns }) {
  if (!rows.length) return <p className="muted">Results will be posted after the event.</p>;
  return (
    <div className="table-wrap">
      <table className="board">
        <thead><tr>{columns.map((c) => <th key={c.key} className={c.num ? 'num' : ''}>{c.label}</th>)}</tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name + r.rank} className={r.rank === 1 ? 'first' : ''}>
              {columns.map((c) => <td key={c.key} className={c.num ? 'num' : ''}>{r[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
