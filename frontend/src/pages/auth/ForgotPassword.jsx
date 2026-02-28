import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HiOutlineMail } from 'react-icons/hi';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Stubbed — would call backend password reset endpoint
        toast.success('If an account exists, a reset link will be sent.');
        setSubmitted(true);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 animate-fade-in">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-surface-900 dark:text-white">Reset Password</h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-2">Enter your email to receive a reset link</p>
                </div>

                <div className="glass-card p-8">
                    {submitted ? (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">✉️</span>
                            </div>
                            <h3 className="font-semibold text-surface-900 dark:text-white mb-2">Check your inbox</h3>
                            <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">We've sent a password reset link to {email}</p>
                            <Link to="/login" className="text-primary-600 hover:text-primary-500 text-sm font-medium">Back to login</Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5" id="forgot-password-form">
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Email</label>
                                <div className="relative">
                                    <HiOutlineMail className="absolute left-3 top-3 w-5 h-5 text-surface-400" />
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="input-field pl-10" placeholder="you@example.com" required id="forgot-email" />
                                </div>
                            </div>
                            <button type="submit" className="btn-primary w-full" id="forgot-submit">Send Reset Link</button>
                            <p className="text-center text-sm text-surface-500">
                                <Link to="/login" className="text-primary-600 hover:text-primary-500">Back to login</Link>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
