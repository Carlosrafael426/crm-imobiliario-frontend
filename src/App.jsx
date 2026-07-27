// HashRouter: GitHub Pages has no server-side rewrite, so a BrowserRouter
// deep link (e.g. /calendario) 404s on refresh. Hash routes always resolve to index.html.
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Calendario from './pages/Calendario';
import SellerDashboard from './pages/SellerDashboard';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import GlobalNotifications from './components/GlobalNotifications';
import AIAssistantWidget from './components/AIAssistantWidget';
import AdminLayout from './features/admin/AdminLayout';
import AdminOverview from './features/admin/pages/AdminOverview';
import AdminUsuarios from './features/admin/pages/AdminUsuarios';
import AdminImoveis from './features/admin/pages/AdminImoveis';
import AdminAtividade from './features/admin/pages/AdminAtividade';
import AdminConfiguracoes from './features/admin/pages/AdminConfiguracoes';

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
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminOverview />} />
            <Route path="usuarios" element={<AdminUsuarios />} />
            <Route path="imoveis" element={<AdminImoveis />} />
            <Route path="atividade" element={<AdminAtividade />} />
            <Route path="configuracoes" element={<AdminConfiguracoes />} />
          </Route>
          {/* Outras rotas serão adicionadas aqui */}
          <Route path="*" element={<Navigate to="/app" replace />} />
        </Routes>
      </Layout>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app/*" element={<AppShell />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
