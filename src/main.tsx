import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioDataProvider } from './context/PortfolioDataContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <PortfolioDataProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PortfolioDataProvider>
  </ThemeProvider>
);
