import { competitions, pointsSystem } from '../data/leaderboards';

export const completed = competitions
  .filter((c) => c.status === 'completed' && c.results?.length)
  .sort((a, b) => b.date.localeCompare(a.date));

export const pointsFor = (rank) => pointsSystem[rank] ?? pointsSystem.default ?? 1;

// Aggregate points across all completed competitions.
export function allTime() {
  const t = {};
  completed.forEach((c) => c.results.forEach((r) => {
    const e = (t[r.name] ??= { name: r.name, points: 0, events: 0, wins: 0 });
    e.points += pointsFor(r.rank);
    e.events += 1;
    if (r.rank === 1) e.wins += 1;
  }));
  return Object.values(t)
    .sort((a, b) => b.points - a.points || b.wins - a.wins || a.name.localeCompare(b.name))
    .map((e, i) => ({ ...e, rank: i + 1 }));
}

export const fmtDate = (d) =>
  new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
