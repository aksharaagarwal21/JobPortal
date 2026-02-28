import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="glass border-t border-surface-200/50 dark:border-surface-700/50 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">JP</span>
                            </div>
                            <span className="text-xl font-bold gradient-text">JobPortal</span>
                        </div>
                        <p className="text-surface-500 dark:text-surface-400 text-sm max-w-md">
                            Find your dream job or hire top talent. Browse thousands of opportunities, apply instantly, and track your applications in one place.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-surface-400 mb-3">Job Seekers</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/jobs" className="text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition">Browse Jobs</Link></li>
                            <li><Link to="/companies" className="text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition">Browse Companies</Link></li>
                            <li><Link to="/signup" className="text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition">Create Account</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-surface-400 mb-3">Recruiters</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/signup" className="text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition">Post a Job</Link></li>
                            <li><Link to="/login" className="text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition">Recruiter Login</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-surface-200/50 dark:border-surface-700/50 mt-8 pt-6">
                    <p className="text-center text-surface-400 dark:text-surface-500 text-sm">
                        © {new Date().getFullYear()} JobPortal. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
