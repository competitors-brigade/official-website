import { EPSILON } from '../components/Layout';

export function About() {
  return (
    <>
      <h1>About</h1>
      <p className="lead">[Who we are and why the club exists.]</p>
      <h2>How we started</h2><p>[Founding story.]</p>
      <h2>Officers</h2><p className="muted">[Name and role for each officer.]</p>
      <h2>Join or help organize</h2>
      <p>[How to join.] Our activity page: <a href={EPSILON} target="_blank" rel="noreferrer">Competitors Brigade - Activity on Epsilon</a>.</p>
    </>
  );
}

export function Rules() {
  return (
    <>
      <h1>Rules</h1>
      <h2>Eligibility</h2><p>[Who can compete.]</p>
      <h2>Fair play</h2><p>[Fair-play policy.]</p>
      <h2>Scoring and tiebreakers</h2><p>[How scores are calculated and how ties are broken.]</p>
      <h2>Stock trading competition</h2>
      <ul><li>Starting capital: [amount]</li><li>Allowed assets: [list]</li>
        <li>Rankings: [total return, or risk-adjusted]</li><li>Leaderboard updates: [when]</li></ul>
      <h2>Disputes</h2><p>[How to raise a dispute and who decides.]</p>
    </>
  );
}

export function Contact() {
  return (
    <>
      <h1>Contact</h1>
      <p>Email: [club email address]</p>
      <p>Social: [links]</p>
      <p><a href={EPSILON} target="_blank" rel="noreferrer">Competitors Brigade - Activity on Epsilon</a></p>
      <h2>Sponsor or partner with us</h2>
      <p>[What sponsors can support and how to get in touch.]</p>
    </>
  );
}
