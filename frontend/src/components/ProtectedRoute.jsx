import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
    if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
    return children;
}

export function RoleRoute({ children, allowedRoles }) {
    const { isAuthenticated, role, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
    if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
    if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" replace />;
    return children;
}

export function GuestRoute({ children }) {
    const { isAuthenticated, loading, role } = useAuth();
    if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
    if (isAuthenticated) {
        const dashboard = role === 'ROLE_ADMIN' ? '/admin/dashboard' :
            role === 'ROLE_RECRUITER' ? '/recruiter/dashboard' : '/candidate/dashboard';
        return <Navigate to={dashboard} replace />;
    }
    return children;
}

function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 rounded-full animate-spin" />
        </div>
    );
}
