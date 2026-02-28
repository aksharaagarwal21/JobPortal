import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { HiOutlineSun, HiOutlineMoon, HiOutlineBell, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { getRoleDashboard } from '../utils';

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const { darkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="glass sticky top-0 z-50 border-b border-surface-200/50 dark:border-surface-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">JP</span>
                        </div>
                        <span className="text-xl font-bold gradient-text">JobPortal</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        <Link to="/jobs" className="btn-ghost text-sm">Find Jobs</Link>
                        <Link to="/companies" className="btn-ghost text-sm">Companies</Link>
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className="btn-ghost text-sm">Login</Link>
                                <Link to="/signup" className="btn-primary text-sm">Sign Up</Link>
                            </>
                        ) : (
                            <>
                                <Link to={getRoleDashboard(user.role)} className="btn-ghost text-sm">Dashboard</Link>
                                <button onClick={() => navigate('/notifications')} className="btn-ghost relative" id="nav-notifications-btn">
                                    <HiOutlineBell className="w-5 h-5" />
                                </button>
                                <div className="relative">
                                    <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 btn-ghost text-sm" id="nav-profile-btn">
                                        <div className="w-7 h-7 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                                            <span className="text-primary-600 dark:text-primary-400 text-xs font-semibold">
                                                {user.fullName?.charAt(0)}
                                            </span>
                                        </div>
                                        <span className="hidden lg:inline">{user.fullName}</span>
                                    </button>
                                    {profileOpen && (
                                        <div className="absolute right-0 mt-2 w-48 glass-card p-2 animate-scale-in">
                                            <Link to={getRoleDashboard(user.role)} className="block px-3 py-2 text-sm rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition">
                                                Dashboard
                                            </Link>
                                            <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition" id="nav-logout-btn">
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                        <button onClick={toggleTheme} className="btn-ghost" id="theme-toggle-btn">
                            {darkMode ? <HiOutlineSun className="w-5 h-5" /> : <HiOutlineMoon className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-2">
                        <button onClick={toggleTheme} className="btn-ghost">
                            {darkMode ? <HiOutlineSun className="w-5 h-5" /> : <HiOutlineMoon className="w-5 h-5" />}
                        </button>
                        <button onClick={() => setMobileOpen(!mobileOpen)} className="btn-ghost">
                            {mobileOpen ? <HiOutlineX className="w-5 h-5" /> : <HiOutlineMenu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-surface-200/50 dark:border-surface-700/50 animate-slide-down">
                    <div className="px-4 py-3 space-y-1">
                        <Link to="/jobs" className="block px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition" onClick={() => setMobileOpen(false)}>Find Jobs</Link>
                        <Link to="/companies" className="block px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition" onClick={() => setMobileOpen(false)}>Companies</Link>
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className="block px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition" onClick={() => setMobileOpen(false)}>Login</Link>
                                <Link to="/signup" className="block px-3 py-2 rounded-lg bg-primary-600 text-white text-center transition" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                            </>
                        ) : (
                            <>
                                <Link to={getRoleDashboard(user.role)} className="block px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                                <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="block w-full text-left px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition">Logout</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
