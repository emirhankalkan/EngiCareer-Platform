import React from 'react';
import { BrowserRouter as Router, Routes, Route, ScrollToTop } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import CompanyDashboard from './pages/CompanyDashboard';

// Helper to scroll to top on route change
const ScrollToTopHelper = () => {
    const { pathname } = React.useLocation();
  
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
};
// Since useLocation needs Router, we can't put helper inside App if App defines Router.
// We'll wrap Routes.

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/dashboard" element={<CompanyDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
