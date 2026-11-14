import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { competitions } from '../data/leaderboards';

export function useCollection(name) {
  const [items, setItems] = useState([]);
  const [n, setN] = useState(0);
  useEffect(() => {
    getDocs(collection(db, name))
      .then((s) => setItems(s.docs.map((d) => ({ id: d.id, ...d.data() }))))
      .catch(() => setItems([]));
  }, [name, n]);
  return [items, () => setN((x) => x + 1)];
}

// Competitions from leaderboards.js plus upcoming events added in the admin panel.
export function useEvents() {
  const [fb] = useCollection('upcomingEvents');
  const fromAdmin = fb.map((e) => ({
    key: e.id, slug: null, name: e.title, category: e.category, date: e.date,
    status: 'upcoming', summary: e.description, registrationUrl: e.registrationUrl,
  }));
  return [...competitions.map((c) => ({ ...c, key: c.slug })), ...fromAdmin]
    .sort((a, b) => a.date.localeCompare(b.date));
}
