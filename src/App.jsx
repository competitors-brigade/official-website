import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import { CompetitionList, CompetitionDetail } from './pages/Competitions';
import { Leaderboards, HallOfFame } from './pages/Leaderboards';
import { About, Rules, Contact } from './pages/Info';
import { SignIn, Admin } from './pages/Admin';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/competitions" element={<CompetitionList />} />
        <Route path="/competitions/:slug" element={<CompetitionDetail />} />
        <Route path="/leaderboards" element={<Leaderboards />} />
        <Route path="/hall-of-fame" element={<HallOfFame />} />
        <Route path="/about" element={<About />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<p>Page not found.</p>} />
      </Route>
    </Routes>
  );
}
