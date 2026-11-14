import { useState } from 'react';
import { completed, allTime } from '../lib/standings';
import LeaderboardTable, { resultCols, seasonCols } from '../components/LeaderboardTable';

export function Leaderboards() {
  const [slug, setSlug] = useState(completed[0]?.slug ?? '');
  const sel = completed.find((c) => c.slug === slug);
  return (
    <>
      <h1>Leaderboards</h1>
      <h2>All-time standings</h2>
      <p className="muted">Points are awarded by placement in each competition.</p>
      <LeaderboardTable rows={allTime()} columns={seasonCols} />
      <h2>By competition</h2>
      {completed.length ? (
        <>
          <label className="sel">Competition
            <select value={slug} onChange={(e) => setSlug(e.target.value)}>
              {completed.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </label>
          {sel && <LeaderboardTable rows={sel.results} columns={resultCols} />}
        </>
      ) : <p className="muted">No competitions have finished yet.</p>}
    </>
  );
}

export function HallOfFame() {
  return (
    <>
      <h1>Hall of Fame</h1>
      {completed.length ? (
        <div className="table-wrap">
          <table className="board">
            <thead><tr><th>Year</th><th>Competition</th><th>Winner</th></tr></thead>
            <tbody>
              {completed.map((c) => (
                <tr key={c.slug}><td className="num">{c.date.slice(0, 4)}</td><td>{c.name}</td>
                  <td>{c.results.find((r) => r.rank === 1)?.name ?? '-'}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <p className="muted">Winners will appear here after the first competition.</p>}
    </>
  );
}
