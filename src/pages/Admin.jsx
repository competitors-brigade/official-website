import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { addDoc, collection, deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useCollection } from '../lib/useCollection';

const CATS = ['Finance', 'Business', 'Math', 'Coding', 'Other'];
// [field, label, input type]
const SECTIONS = {
  announcements: ['Announcements', [['title', 'Title'], ['body', 'Body', 'textarea'], ['pinned', 'Pinned', 'checkbox']]],
  upcomingEvents: ['Upcoming events', [['title', 'Title'], ['date', 'Date', 'date'], ['category', 'Category', 'select'],
    ['description', 'Description', 'textarea'], ['registrationUrl', 'Registration URL', 'url']]],
};

export function SignIn() {
  const { user, login, logout, error } = useAuth();
  return (
    <>
      <h1>Sign in</h1>
      {user
        ? <><p>Signed in as <span className="mono">{user.email}</span>.</p><button className="btn ghost" onClick={logout}>Sign out</button></>
        : <><p className="lead">Sign in with your Google account.</p><button className="btn" onClick={login}>Continue with Google</button></>}
      {error && <p role="alert" className="err">{error}</p>}
    </>
  );
}

function Manager({ name, label, fields }) {
  const [items, reload] = useCollection(name);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(null);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const reset = () => { setForm({}); setEditing(null); };

  async function save(e) {
    e.preventDefault();
    const { id, createdAt, ...data } = form;
    try {
      if (editing) await setDoc(doc(db, name, editing), data, { merge: true });
      else await addDoc(collection(db, name), { ...data, createdAt: serverTimestamp() });
      reset(); reload();
    } catch (err) { alert('Could not save: ' + err.message); }
  }
  async function remove(i) {
    if (!confirm(`Delete "${i.title}"?`)) return;
    try { await deleteDoc(doc(db, name, i.id)); reload(); } catch (err) { alert('Could not delete: ' + err.message); }
  }

  return (
    <section>
      <h2>{label}</h2>
      <form className="form" onSubmit={save}>
        {fields.map(([k, text, type = 'text']) => (
          <label key={k}>{text}
            {type === 'textarea' ? <textarea value={form[k] ?? ''} onChange={(e) => set(k, e.target.value)} required />
              : type === 'checkbox' ? <input type="checkbox" checked={!!form[k]} onChange={(e) => set(k, e.target.checked)} />
              : type === 'select' ? <select value={form[k] ?? ''} onChange={(e) => set(k, e.target.value)} required>
                  <option value="" disabled>Choose a category</option>{CATS.map((c) => <option key={c}>{c}</option>)}</select>
              : <input type={type} value={form[k] ?? ''} onChange={(e) => set(k, e.target.value)} required={k !== 'registrationUrl'} />}
          </label>
        ))}
        <div className="row">
          <button className="btn">{editing ? 'Save changes' : 'Add'}</button>
          {editing && <button type="button" className="btn ghost" onClick={reset}>Cancel</button>}
        </div>
      </form>
      {items.map((i) => (
        <div className="item" key={i.id}>
          <div className="grow"><h3>{i.title}</h3></div>
          <button className="link-btn" onClick={() => { setForm(i); setEditing(i.id); }}>Edit</button>
          <button className="link-btn" onClick={() => remove(i)}>Delete</button>
        </div>
      ))}
    </section>
  );
}

export function Admin() {
  const { isAdmin, loading } = useAuth();
  if (loading) return null;
  if (!isAdmin) return <Navigate to="/" replace />;
  return (
    <>
      <h1>Admin</h1>
      <p className="muted">Leaderboards and competition pages are edited in <span className="mono">src/data/leaderboards.js</span>, then redeployed.</p>
      {Object.entries(SECTIONS).map(([name, [label, fields]]) => <Manager key={name} name={name} label={label} fields={fields} />)}
    </>
  );
}
