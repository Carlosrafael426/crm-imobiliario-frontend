import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Calendario from './pages/Calendario';
import GlobalNotifications from './components/GlobalNotifications';
import AIAssistantWidget from './components/AIAssistantWidget';

function App() {
  return (
    <Router>
      <GlobalNotifications />
      <AIAssistantWidget />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/calendario" element={<Calendario />} />
          {/* Outras rotas serão adicionadas aqui */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
