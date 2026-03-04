import { useState, type JSX } from 'react';
import type { AuthResponse } from './types/AuthResponse';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import RegisterPage from './pages/RegisterPage';
import { ColorModeProvider } from './components/ui/color-mode';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import HomePage from './pages/Dashboard/pages/HomePage/HomePage';
import StatsPage from './pages/Dashboard/pages/StatsPage';
import SettingsPage from './pages/Dashboard/pages/SettingsPage';

export function App() {
  const [auth, setAuth] = useState<AuthResponse | null>(null);

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!auth) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={setAuth} />} />
            <Route path='/register' element={<RegisterPage onLogin={setAuth} />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<HomePage />} />
              <Route path="stats" element={<StatsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
