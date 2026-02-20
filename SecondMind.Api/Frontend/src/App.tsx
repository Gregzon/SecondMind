import { useState, type JSX } from 'react';
import type { AuthResponse } from './types/AuthResponse';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { ColorModeProvider } from './components/ui/color-mode';

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
                  <DashboardPage children={undefined} />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
