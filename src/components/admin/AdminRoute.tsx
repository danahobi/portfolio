import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

interface AdminRouteProps {
  onBackToSite: () => void;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ onBackToSite }) => {
  const { user, isOwnerAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-mono">Verifying owner credentials...</p>
      </div>
    );
  }

  if (!user || !isOwnerAdmin) {
    return <AdminLogin onBackToSite={onBackToSite} />;
  }

  return <AdminDashboard onBackToSite={onBackToSite} />;
};
