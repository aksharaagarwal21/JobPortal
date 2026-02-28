import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { candidateAPI, jobsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { formatDate, APPLICATION_STATUSES } from '../../utils';
import { HiOutlineDocumentText, HiOutlineHeart, HiOutlineBriefcase, HiOutlineBell, HiOutlineUser, HiOutlineArrowRight } from 'react-icons/hi';

export default function CandidateDashboard() {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const [appRes, savedRes, profileRes] = await Promise.allSettled([
                    candidateAPI.getApplications({ page: 0, size: 5 }),
                    candidateAPI.getSavedJobs({ page: 0, size: 5 }),
                    candidateAPI.getProfile(),
                ]);
                if (appRes.status === 'fulfilled') setApplications(appRes.value.data.content || []);
                if (savedRes.status === 'fulfilled') setSavedJobs(savedRes.value.data.content || []);
                if (profileRes.status === 'fulfilled') setProfile(profileRes.value.data);
            } catch (err) { console.error(err); }
            setLoading(false);
        };
        load();
    }, []);

    const isProfileIncomplete = profile && (!profile.headline || !profile.skills?.length || !profile.location);

    const stats = [
        { label: 'Applications', value: applications.length, icon: HiOutlineDocumentText, color: 'from-primary-500 to-primary-600' },
        { label: 'Saved Jobs', value: savedJobs.length, icon: HiOutlineHeart, color: 'from-pink-500 to-rose-500' },
        { label: 'Interviews', value: applications.filter(a => a.status === 'SHORTLISTED').length, icon: HiOutlineBriefcase, color: 'from-emerald-500 to-teal-500' },
    ];

    return (
        <div className="animate-fade-in">
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-6">
                Welcome back, {user?.fullName?.split(' ')[0]}! 👋
            </h1>

            {/* Profile Completion Prompt */}
            {isProfileIncomplete && (
                <Link to="/candidate/profile" className="block glass-card p-5 mb-6 hover:scale-[1.01] transition-all group border-l-4 border-l-amber-500">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <HiOutlineUser className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-surface-900 dark:text-white">Complete Your Portfolio</p>
                                <p className="text-sm text-surface-500">Add skills, experience, and education to get discovered by recruiters</p>
                            </div>
                        </div>
                        <HiOutlineArrowRight className="w-5 h-5 text-surface-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                </Link>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {stats.map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="glass-card p-5 flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-surface-900 dark:text-white">{value}</p>
                            <p className="text-sm text-surface-500 dark:text-surface-400">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Applications */}
            <div className="glass-card p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Recent Applications</h2>
                    <Link to="/candidate/applications" className="text-sm text-primary-600 hover:text-primary-500">View all →</Link>
                </div>
                {loading ? (
                    <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-14 w-full" />)}</div>
                ) : applications.length === 0 ? (
                    <p className="text-center py-8 text-surface-400">No applications yet. <Link to="/jobs" className="text-primary-600 hover:underline">Browse jobs</Link></p>
                ) : (
                    <div className="space-y-3">
                        {applications.map((app) => (
                            <div key={app.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800/50 transition">
                                <div>
                                    <p className="font-medium text-surface-900 dark:text-white">{app.jobTitle}</p>
                                    <p className="text-sm text-surface-500">{app.companyName} • {formatDate(app.appliedAt)}</p>
                                </div>
                                <span className={`badge-${APPLICATION_STATUSES[app.status]?.color || 'primary'}`}>
                                    {APPLICATION_STATUSES[app.status]?.label || app.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Saved Jobs */}
            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Saved Jobs</h2>
                    <Link to="/candidate/saved-jobs" className="text-sm text-primary-600 hover:text-primary-500">View all →</Link>
                </div>
                {savedJobs.length === 0 ? (
                    <p className="text-center py-8 text-surface-400">No saved jobs yet</p>
                ) : (
                    <div className="space-y-3">
                        {savedJobs.map((job) => (
                            <Link key={job.id} to={`/jobs/${job.id}`} className="block p-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800/50 transition">
                                <p className="font-medium text-surface-900 dark:text-white">{job.title}</p>
                                <p className="text-sm text-surface-500">{job.companyName} • {job.location}</p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
