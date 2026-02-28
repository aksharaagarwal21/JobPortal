import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getRoleDashboard } from '../../utils';
import toast from 'react-hot-toast';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await login(email, password);
            toast.success('Welcome back!');
            navigate(getRoleDashboard(data.role));
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid credentials');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 animate-fade-in">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-surface-900 dark:text-white">Welcome Back</h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-2">Sign in to your account</p>
                </div>

                <div className="glass-card p-8">
                    <form onSubmit={handleSubmit} className="space-y-5" id="login-form">
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Email</label>
                            <div className="relative">
                                <HiOutlineMail className="absolute left-3 top-3 w-5 h-5 text-surface-400" />
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-10" placeholder="you@example.com" required id="login-email" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Password</label>
                            <div className="relative">
                                <HiOutlineLockClosed className="absolute left-3 top-3 w-5 h-5 text-surface-400" />
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-10" placeholder="••••••••" required id="login-password" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-500">Forgot password?</Link>
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary w-full" id="login-submit">
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                    <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
                        Don't have an account? <Link to="/signup" className="text-primary-600 hover:text-primary-500 font-medium">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
