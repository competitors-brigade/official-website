import { Link } from 'react-router-dom';
import { completed, fmtDate } from '../lib/standings';
import { useCollection, useEvents } from '../lib/useCollection';
import LeaderboardTable, { resultCols } from '../components/LeaderboardTable';

export default function Home() {
  const events = useEvents();
  const [news] = useCollection('announcements');
  const next = events.find((e) => e.status !== 'completed');
  const latest = completed[0];
  const posts = [...news]
    .sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
    .slice(0, 5);
  return (
    <>
      <h1>The Competitors Brigade</h1>
      <p className="lead">[Club description: one plain sentence on what the club is and who can compete.]</p>

      <h2>Next competition</h2>
      {next ? (
        <div className="panel">
          <p className="mono muted">{fmtDate(next.date)}, {next.category}</p>
          <h3>{next.name}</h3>
          <p>{next.summary}</p>
          <div className="row">
            {next.registrationUrl && <a className="btn" href={next.registrationUrl}>Register</a>}
            {next.slug && <Link className="btn ghost" to={`/competitions/${next.slug}`}>See details</Link>}
          </div>
        </div>
      ) : <p className="muted">No competition is scheduled yet. Check back soon.</p>}

      {latest && (
        <>
          <h2>Recent results</h2>
          <p className="muted">{latest.name}</p>
          <LeaderboardTable rows={latest.results.slice(0, 3)} columns={resultCols} />
          <p><Link to={`/competitions/${latest.slug}`}>See full results</Link></p>
        </>
      )}

      <h2>Announcements</h2>
      {posts.length
        ? posts.map((p) => <article className="post" key={p.id}><h3>{p.title}</h3><p>{p.body}</p></article>)
        : <p className="muted">No announcements yet.</p>}
    </>
  );
}
