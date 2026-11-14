import { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

export const EPSILON = 'https://epsilon.stuysu.org/competitorsbrigade';
const links = [['/competitions', 'Competitions'], ['/leaderboards', 'Leaderboards'], ['/hall-of-fame', 'Hall of Fame'],
  ['/about', 'About'], ['/rules', 'Rules'], ['/contact', 'Contact']];

export default function Layout() {
  const { user, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="nav"><div className="wrap nav-in">
        <Link to="/" className="brand"><img src={logo} alt="" /><span>The Competitors Brigade</span></Link>
        <button className="menu-btn" aria-expanded={open} onClick={() => setOpen(!open)}>Menu</button>
        <nav className={open ? 'open' : ''} onClick={() => setOpen(false)}>
          {links.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
          {isAdmin && <NavLink to="/admin">Admin</NavLink>}
          {user ? <button className="link-btn" onClick={logout}>Sign out</button> : <NavLink to="/signin">Sign in</NavLink>}
        </nav>
      </div></header>
      <main className="wrap"><Outlet /></main>
      <footer className="foot"><div className="wrap">
        <span>The Competitors Brigade</span>
        <a href={EPSILON} target="_blank" rel="noreferrer">Competitors Brigade - Activity on Epsilon</a>
      </div></footer>
    </>
  );
}
