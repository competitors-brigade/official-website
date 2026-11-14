import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, provider } from '../firebase';

// Restrict sign-in to one email domain, e.g. 'stuy.edu'. Empty string allows any Google account.
export const ALLOWED_EMAIL_DOMAIN = '';

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => onAuthStateChanged(auth, async (u) => {
    if (u && ALLOWED_EMAIL_DOMAIN && !u.email?.toLowerCase().endsWith('@' + ALLOWED_EMAIL_DOMAIN)) {
      setError(`Sign in with an @${ALLOWED_EMAIL_DOMAIN} account.`);
      await signOut(auth);
      return;
    }
    setUser(u);
    try { setIsAdmin(!!u && (await getDoc(doc(db, 'admins', u.email.toLowerCase()))).exists()); }
    catch { setIsAdmin(false); }
    setLoading(false);
  }), []);

  const login = async () => {
    setError('');
    try { await signInWithPopup(auth, provider); } catch { setError('Sign-in did not finish. Try again.'); }
  };

  return <Ctx.Provider value={{ user, isAdmin, loading, error, login, logout: () => signOut(auth) }}>{children}</Ctx.Provider>;
}
