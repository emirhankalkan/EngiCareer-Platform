import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import CompanyDashboard from './pages/CompanyDashboard';
import CompaniesPage from './pages/CompaniesPage';
import AboutPage from './pages/AboutPage';
import CandidateApplicationsPage from './pages/CandidateApplicationsPage';

// Helper to scroll to top on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<CompanyDashboard />} />
          <Route path="/applications" element={<CandidateApplicationsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
