import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recruiterAPI, applicationsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { HiOutlineBriefcase, HiOutlineUsers, HiOutlineClipboardList, HiOutlinePlusCircle } from 'react-icons/hi';

export default function RecruiterDashboard() {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await recruiterAPI.getMyJobs({ page: 0, size: 5 });
                setJobs(res.data.content || []);
            } catch (err) { console.error(err); }
            setLoading(false);
        };
        load();
    }, []);

    if (!user?.isApproved && user?.role === 'ROLE_RECRUITER') {
        return (
            <div className="text-center py-20 animate-fade-in">
                <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">⏳</span>
                </div>
                <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">Pending Approval</h2>
                <p className="text-surface-500 max-w-md mx-auto">Your recruiter account is pending admin approval. You'll be notified once approved.</p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
                    Welcome, {user?.fullName?.split(' ')[0]}! 🚀
                </h1>
                <Link to="/recruiter/post-job" className="btn-primary" id="post-job-link">
                    <HiOutlinePlusCircle className="w-5 h-5 mr-2" /> Post Job
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="glass-card p-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                        <HiOutlineBriefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-surface-900 dark:text-white">{jobs.length}</p>
                        <p className="text-sm text-surface-500">Active Jobs</p>
                    </div>
                </div>
                <div className="glass-card p-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                        <HiOutlineUsers className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-surface-900 dark:text-white">—</p>
                        <p className="text-sm text-surface-500">Total Applicants</p>
                    </div>
                </div>
                <div className="glass-card p-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                        <HiOutlineClipboardList className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-surface-900 dark:text-white">—</p>
                        <p className="text-sm text-surface-500">Shortlisted</p>
                    </div>
                </div>
            </div>

            {/* Recent Jobs */}
            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Your Jobs</h2>
                    <Link to="/recruiter/jobs" className="text-sm text-primary-600 hover:text-primary-500">View all →</Link>
                </div>
                {loading ? (
                    <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-14 w-full" />)}</div>
                ) : jobs.length === 0 ? (
                    <p className="text-center py-8 text-surface-400">No jobs posted yet. <Link to="/recruiter/post-job" className="text-primary-600 hover:underline">Post your first job</Link></p>
                ) : (
                    <div className="space-y-3">
                        {jobs.map((job) => (
                            <div key={job.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800/50 transition">
                                <div>
                                    <p className="font-medium text-surface-900 dark:text-white">{job.title}</p>
                                    <p className="text-sm text-surface-500">{job.location} • {job.jobType?.replace('_', ' ')}</p>
                                </div>
                                <Link to={`/jobs/${job.id}`} className="btn-ghost text-sm text-primary-600">View</Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
