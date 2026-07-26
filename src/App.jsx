// HashRouter: GitHub Pages has no server-side rewrite, so a BrowserRouter
// deep link (e.g. /calendario) 404s on refresh. Hash routes always resolve to index.html.
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Calendario from './pages/Calendario';
import SellerDashboard from './pages/SellerDashboard';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import GlobalNotifications from './components/GlobalNotifications';
import AIAssistantWidget from './components/AIAssistantWidget';

function AppShell() {
  return (
    <>
      <GlobalNotifications />
      <AIAssistantWidget />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/painel" element={<SellerDashboard />} />
          <Route path="/calendario" element={<Calendario />} />
          {/* Outras rotas serão adicionadas aqui */}
          <Route path="*" element={<Navigate to="/app" replace />} />
        </Routes>
      </Layout>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app/*" element={<AppShell />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
