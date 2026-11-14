import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { competitions } from '../data/leaderboards';
import { fmtDate } from '../lib/standings';
import { useEvents } from '../lib/useCollection';
import LeaderboardTable, { resultCols } from '../components/LeaderboardTable';

const CATS = ['All', 'Finance', 'Business', 'Math', 'Coding', 'Other'];
const GROUPS = [['live', 'Live'], ['upcoming', 'Upcoming'], ['completed', 'Past']];

export function CompetitionList() {
  const events = useEvents();
  const [cat, setCat] = useState('All');
  const shown = events.filter((e) => cat === 'All' || e.category === cat);
  return (
    <>
      <h1>Competitions</h1>
      <div className="filters" role="group" aria-label="Filter by category">
        {CATS.map((c) => <button key={c} className={c === cat ? 'on' : ''} aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      {GROUPS.map(([status, label]) => {
        const rows = shown.filter((e) => e.status === status);
        if (!rows.length) return null;
        return (
          <section key={status}>
            <h2>{status === 'live' && <span className="dot" />}{label}</h2>
            {rows.map((e) => (
              <div className="item" key={e.key}>
                <span className="mono muted">{fmtDate(e.date)}</span>
                <div className="grow">
                  <h3>{e.slug ? <Link to={`/competitions/${e.slug}`}>{e.name}</Link> : e.name}</h3>
                  <p className="muted">{e.category}. {e.summary}</p>
                </div>
                {e.registrationUrl && status !== 'completed' && <a className="btn ghost" href={e.registrationUrl}>Register</a>}
              </div>
            ))}
          </section>
        );
      })}
      {!shown.length && <p className="muted">No competitions in this category yet.</p>}
    </>
  );
}

export function CompetitionDetail() {
  const { slug } = useParams();
  const c = competitions.find((x) => x.slug === slug);
  if (!c) return <p>Competition not found. <Link to="/competitions">See all competitions</Link></p>;
  return (
    <>
      <p className="mono muted">{fmtDate(c.date)}, {c.category}, {c.status}</p>
      <h1>{c.name}</h1>
      <p className="lead">{c.summary}</p>
      {c.registrationUrl && c.status !== 'completed' && <a className="btn" href={c.registrationUrl}>Register</a>}
      <div className="cols">
        <section><h2>Rules</h2><ul>{c.rules?.map((r) => <li key={r}>{r}</li>)}</ul></section>
        <section>
          <h2>Schedule</h2>
          {c.schedule?.map((s) => <p key={s.label}><span className="mono">{fmtDate(s.date)}</span> {s.label}</p>)}
          <h2>Eligibility</h2><p>{c.eligibility}</p>
          <h2>Prizes</h2><p>{c.prizes}</p>
        </section>
      </div>
      <h2>Results</h2>
      <LeaderboardTable rows={c.results ?? []} columns={resultCols} />
    </>
  );
}
