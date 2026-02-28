import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getRoleDashboard } from '../../utils';
import toast from 'react-hot-toast';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi';

export default function Signup() {
    const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'CANDIDATE' });
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await signup(form.fullName, form.email, form.password, form.role);
            toast.success('Account created!');
            navigate(getRoleDashboard(data.role));
        } catch (err) {
            toast.error(err.response?.data?.message || 'Signup failed');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 animate-fade-in">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-surface-900 dark:text-white">Create Account</h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-2">Start your journey with JobPortal</p>
                </div>

                <div className="glass-card p-8">
                    {/* Role Toggle */}
                    <div className="flex mb-6 bg-surface-100 dark:bg-surface-800 rounded-xl p-1">
                        {['CANDIDATE', 'RECRUITER'].map((r) => (
                            <button key={r} onClick={() => setForm({ ...form, role: r })}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${form.role === r
                                        ? 'bg-white dark:bg-surface-700 text-primary-600 dark:text-primary-400 shadow-sm'
                                        : 'text-surface-500 dark:text-surface-400'
                                    }`} id={`role-${r.toLowerCase()}-btn`}>
                                {r === 'CANDIDATE' ? '👤 Candidate' : '🏢 Recruiter'}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5" id="signup-form">
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Full Name</label>
                            <div className="relative">
                                <HiOutlineUser className="absolute left-3 top-3 w-5 h-5 text-surface-400" />
                                <input type="text" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                    className="input-field pl-10" placeholder="John Doe" required id="signup-name" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Email</label>
                            <div className="relative">
                                <HiOutlineMail className="absolute left-3 top-3 w-5 h-5 text-surface-400" />
                                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="input-field pl-10" placeholder="you@example.com" required id="signup-email" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Password</label>
                            <div className="relative">
                                <HiOutlineLockClosed className="absolute left-3 top-3 w-5 h-5 text-surface-400" />
                                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="input-field pl-10" placeholder="Min. 6 characters" required minLength={6} id="signup-password" />
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary w-full" id="signup-submit">
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    {form.role === 'RECRUITER' && (
                        <p className="mt-4 text-xs text-amber-600 dark:text-amber-400 text-center">
                            ⚠️ Recruiter accounts require admin approval before posting jobs.
                        </p>
                    )}

                    <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
                        Already have an account? <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
