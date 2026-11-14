/* ============================================================================
   LEADERBOARD DATA: the one file officers edit to update results.

   TO ADD A COMPETITION: copy an entry in `competitions`, change the fields, save, redeploy.
   TO POST RESULTS:      set status to "completed" and fill `results` (rank, name, score).
   status is "upcoming", "live" or "completed". date is YYYY-MM-DD. slug must be unique, lowercase, no spaces.
   category is one of: Finance, Business, Math, Coding, Other.
   Everything else (all-time standings, Hall of Fame, home page) is computed from this file.
   DELETE the two SAMPLE entries before launch.
   ============================================================================ */

// Points awarded per placement for the all-time standings. `default` applies to everyone else.
export const pointsSystem = { 1: 10, 2: 7, 3: 5, 4: 3, 5: 2, default: 1 };

export const competitions = [
  { // SAMPLE
    slug: 'sample-fall-stock-trading',
    name: 'SAMPLE Fall Stock Trading Competition',
    category: 'Finance',
    date: '2026-12-05',
    status: 'upcoming',
    summary: '[Short description of the competition.]',
    rules: ['[Starting capital]', '[Allowed assets]', '[How rankings are calculated]'],
    schedule: [{ label: 'Registration closes', date: '2026-12-01' }, { label: 'Trading ends', date: '2026-12-05' }],
    eligibility: '[Who can compete]',
    prizes: '[Prizes]',
    registrationUrl: '',
    results: [],
  },
  { // SAMPLE
    slug: 'sample-math-sprint',
    name: 'SAMPLE Math Sprint',
    category: 'Math',
    date: '2026-10-10',
    status: 'completed',
    summary: '[Short description of the competition.]',
    rules: ['[Rule]'],
    schedule: [],
    eligibility: '[Who could compete]',
    prizes: '[Prizes]',
    registrationUrl: '',
    results: [
      { rank: 1, name: '[Sample Student A]', score: '42' },
      { rank: 2, name: '[Sample Student B]', score: '39' },
      { rank: 3, name: '[Sample Student C]', score: '35' },
      { rank: 4, name: '[Sample Student D]', score: '30' },
    ],
  },
];
