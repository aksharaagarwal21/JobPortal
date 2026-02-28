import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI, jobsAPI } from '../../services/api';
import { formatDate } from '../../utils';
import {
    HiOutlineUsers, HiOutlineBriefcase, HiOutlineClipboardList,
    HiOutlineShieldCheck, HiOutlineChartBar, HiOutlineUserGroup,
    HiOutlineArrowRight, HiOutlineEye, HiOutlineTrendingUp,
    HiOutlineClock, HiOutlineDocumentText, HiOutlineDatabase,
    HiOutlineLockClosed, HiOutlineKey, HiOutlineMail,
} from 'react-icons/hi';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [recentJobs, setRecentJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedUser, setExpandedUser] = useState(null);
    const [userDetail, setUserDetail] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const [statsRes, usersRes, jobsRes] = await Promise.allSettled([
                    adminAPI.getStats(),
                    adminAPI.getUsers({ page: 0, size: 8 }),
                    jobsAPI.search({ page: 0, size: 5 }),
                ]);

                if (statsRes.status === 'fulfilled') setStats(statsRes.value.data);
                else setStats({ totalUsers: 0, totalCandidates: 0, totalRecruiters: 0, totalJobs: 0, totalApplications: 0, pendingRecruiters: 0 });

                if (usersRes.status === 'fulfilled') setUsers(usersRes.value.data.content || []);
                if (jobsRes.status === 'fulfilled') setRecentJobs(jobsRes.value.data.content || []);
            } catch (err) {
                console.error(err);
                setStats({ totalUsers: 0, totalCandidates: 0, totalRecruiters: 0, totalJobs: 0, totalApplications: 0, pendingRecruiters: 0 });
            }
            setLoading(false);
        };
        load();
    }, []);

    const loadUserDetail = async (userId) => {
        if (expandedUser === userId) { setExpandedUser(null); setUserDetail(null); return; }
        try {
            const res = await adminAPI.getUserDetail(userId);
            setUserDetail(res.data);
            setExpandedUser(userId);
        } catch {
            setExpandedUser(userId);
            setUserDetail(null);
        }
    };

    const safeStats = stats || { totalUsers: 0, totalCandidates: 0, totalRecruiters: 0, totalJobs: 0, totalApplications: 0, pendingRecruiters: 0 };

    const statCards = [
        { label: 'Total Users', value: safeStats.totalUsers, icon: HiOutlineUsers, gradient: 'from-primary-500 to-primary-600', change: '+12%' },
        { label: 'Candidates', value: safeStats.totalCandidates, icon: HiOutlineUserGroup, gradient: 'from-emerald-500 to-teal-500', change: '+8%' },
        { label: 'Recruiters', value: safeStats.totalRecruiters, icon: HiOutlineShieldCheck, gradient: 'from-purple-500 to-pink-500', change: '+5%' },
        { label: 'Active Jobs', value: safeStats.totalJobs, icon: HiOutlineBriefcase, gradient: 'from-amber-500 to-orange-500', change: '+18%' },
        { label: 'Applications', value: safeStats.totalApplications, icon: HiOutlineClipboardList, gradient: 'from-primary-500 to-primary-600', change: '+22%' },
        { label: 'Pending Approval', value: safeStats.pendingRecruiters, icon: HiOutlineClock, gradient: 'from-red-500 to-rose-500', change: '' },
    ];

    return (
        <div className="animate-fade-in space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Admin Dashboard</h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-1">Full platform control & user management</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-semibold">
                        <HiOutlineKey className="w-3.5 h-3.5" /> Super Admin
                    </span>
                </div>
            </div>

            {/* Stats Cards */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-28 w-full rounded-2xl" />)}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {statCards.map(({ label, value, icon: Icon, gradient, change }) => (
                        <div key={label} className="glass-card p-6 hover:scale-[1.02] transition-all duration-300 group">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">{label}</p>
                                    <p className="text-3xl font-bold text-surface-900 dark:text-white">{value ?? 0}</p>
                                    {change && (
                                        <div className="flex items-center gap-1 mt-2">
                                            <HiOutlineTrendingUp className="w-4 h-4 text-emerald-500" />
                                            <span className="text-xs font-medium text-emerald-500">{change} this month</span>
                                        </div>
                                    )}
                                </div>
                                <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-3 gap-4">
                <Link to="/admin/users" className="glass-card p-5 flex items-center gap-4 hover:scale-[1.02] transition-all group hover:border-primary-300 dark:hover:border-primary-700">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <HiOutlineUsers className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-surface-900 dark:text-white">Manage All Users</p>
                        <p className="text-xs text-surface-500">View data, passwords, suspend accounts</p>
                    </div>
                    <HiOutlineArrowRight className="w-5 h-5 text-surface-400 group-hover:text-primary-500 transition-colors" />
                </Link>
                <Link to="/admin/recruiters" className="glass-card p-5 flex items-center gap-4 hover:scale-[1.02] transition-all group hover:border-purple-300 dark:hover:border-purple-700">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <HiOutlineShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-surface-900 dark:text-white">Recruiter Requests</p>
                        <p className="text-xs text-surface-500">Approve/reject with full details</p>
                    </div>
                    <HiOutlineArrowRight className="w-5 h-5 text-surface-400 group-hover:text-purple-500 transition-colors" />
                </Link>
                <Link to="/admin/jobs" className="glass-card p-5 flex items-center gap-4 hover:scale-[1.02] transition-all group hover:border-emerald-300 dark:hover:border-emerald-700">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <HiOutlineBriefcase className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-surface-900 dark:text-white">Manage Jobs</p>
                        <p className="text-xs text-surface-500">Review and moderate job posts</p>
                    </div>
                    <HiOutlineArrowRight className="w-5 h-5 text-surface-400 group-hover:text-emerald-500 transition-colors" />
                </Link>
            </div>

            {/* Two-Column: Recent Users + Recent Jobs */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Users with expandable details */}
                <div className="glass-card overflow-hidden">
                    <div className="p-5 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
                        <h3 className="font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                            <HiOutlineDatabase className="w-5 h-5 text-primary-500" /> User Data
                        </h3>
                        <Link to="/admin/users" className="text-sm text-primary-500 hover:text-primary-400 font-medium">View All</Link>
                    </div>
                    {users.length === 0 ? (
                        <div className="p-8 text-center text-surface-400 text-sm">No users found</div>
                    ) : (
                        <div className="divide-y divide-surface-100 dark:divide-surface-800">
                            {users.map((u) => (
                                <div key={u.id}>
                                    <div
                                        className="p-4 flex items-center gap-3 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition cursor-pointer"
                                        onClick={() => loadUserDetail(u.id)}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                            {(u.fullName || 'U')[0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-surface-900 dark:text-white text-sm truncate">{u.fullName}</p>
                                            <p className="text-xs text-surface-500 truncate flex items-center gap-1">
                                                <HiOutlineMail className="w-3 h-3" /> {u.email}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className="badge-primary text-xs">{u.role?.replace('ROLE_', '')}</span>
                                            <span className={`w-2 h-2 rounded-full ${u.isActive ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                        </div>
                                    </div>
                                    {expandedUser === u.id && (
                                        <div className="px-4 pb-4 bg-surface-50/50 dark:bg-surface-800/30 border-t border-surface-100 dark:border-surface-800">
                                            <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                                                <div>
                                                    <span className="text-surface-400">Status:</span>
                                                    <span className={`ml-1 font-medium ${u.isActive ? 'text-emerald-600' : 'text-red-500'}`}>{u.isActive ? 'Active' : 'Suspended'}</span>
                                                </div>
                                                <div>
                                                    <span className="text-surface-400">Approved:</span>
                                                    <span className={`ml-1 font-medium ${u.isApproved ? 'text-emerald-600' : 'text-amber-500'}`}>{u.isApproved ? 'Yes' : 'Pending'}</span>
                                                </div>
                                                <div className="col-span-2">
                                                    <span className="text-surface-400">Joined:</span>
                                                    <span className="ml-1 text-surface-600 dark:text-surface-300">{formatDate(u.createdAt)}</span>
                                                </div>
                                                {userDetail?.passwordHash && (
                                                    <div className="col-span-2 mt-1">
                                                        <span className="text-surface-400 flex items-center gap-1"><HiOutlineLockClosed className="w-3 h-3" /> Password Hash:</span>
                                                        <code className="block mt-1 text-[10px] bg-surface-100 dark:bg-surface-900 p-2 rounded-lg break-all text-surface-600 dark:text-surface-400 font-mono">
                                                            {userDetail.passwordHash}
                                                        </code>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Jobs */}
                <div className="glass-card overflow-hidden">
                    <div className="p-5 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
                        <h3 className="font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                            <HiOutlineDocumentText className="w-5 h-5 text-emerald-500" /> Recent Job Posts
                        </h3>
                        <Link to="/admin/jobs" className="text-sm text-primary-500 hover:text-primary-400 font-medium">View All</Link>
                    </div>
                    {recentJobs.length === 0 ? (
                        <div className="p-8 text-center text-surface-400 text-sm">No jobs found</div>
                    ) : (
                        <div className="divide-y divide-surface-100 dark:divide-surface-800">
                            {recentJobs.map((job) => (
                                <Link key={job.id} to={`/jobs/${job.id}`} className="p-4 flex items-center gap-3 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition block">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                        {(job.companyName || 'C')[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-surface-900 dark:text-white text-sm truncate">{job.title}</p>
                                        <p className="text-xs text-surface-500 truncate">{job.companyName} • {job.location}</p>
                                    </div>
                                    <HiOutlineEye className="w-4 h-4 text-surface-400 shrink-0" />
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
