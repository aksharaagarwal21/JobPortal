import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { formatDate } from '../../utils';
import toast from 'react-hot-toast';
import {
    HiOutlineBan, HiOutlineCheck, HiOutlineSearch,
    HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff,
    HiOutlineFilter,
} from 'react-icons/hi';

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [roleFilter, setRoleFilter] = useState('');
    const [expandedUser, setExpandedUser] = useState(null);
    const [userDetails, setUserDetails] = useState({});
    const [showHashes, setShowHashes] = useState({});

    useEffect(() => { fetchUsers(); }, [page, roleFilter]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const params = { page, size: 15 };
            if (roleFilter) params.role = roleFilter;
            const res = await adminAPI.getUsers(params);
            setUsers(res.data.content || []);
            setTotalPages(res.data.totalPages || 0);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const handleSuspend = async (id) => {
        try {
            const res = await adminAPI.suspendUser(id);
            setUsers(users.map(u => u.id === id ? res.data : u));
            toast.success('User status updated');
        } catch (err) { toast.error('Failed'); }
    };

    const toggleExpand = async (userId) => {
        if (expandedUser === userId) { setExpandedUser(null); return; }
        setExpandedUser(userId);
        if (!userDetails[userId]) {
            try {
                const res = await adminAPI.getUserDetail(userId);
                setUserDetails(prev => ({ ...prev, [userId]: res.data }));
            } catch { /* detail not available */ }
        }
    };

    const toggleHash = (userId) => setShowHashes(prev => ({ ...prev, [userId]: !prev[userId] }));

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Manage Users</h1>
                    <p className="text-sm text-surface-500 mt-1">Full access to all user accounts, credentials & data</p>
                </div>
                <div className="flex items-center gap-2">
                    <HiOutlineFilter className="w-4 h-4 text-surface-400" />
                    <select
                        value={roleFilter}
                        onChange={(e) => { setRoleFilter(e.target.value); setPage(0); }}
                        className="input-field text-sm py-1.5 w-40"
                    >
                        <option value="">All Roles</option>
                        <option value="ROLE_CANDIDATE">Candidates</option>
                        <option value="ROLE_RECRUITER">Recruiters</option>
                        <option value="ROLE_ADMIN">Admins</option>
                    </select>
                </div>
            </div>
            {loading ? (
                <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="skeleton h-14 w-full" />)}</div>
            ) : (
                <>
                    <div className="glass-card overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="border-b border-surface-200 dark:border-surface-700">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-surface-500">User</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-surface-500">Role</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-surface-500">Joined</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-surface-500">Status</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-surface-500">Approved</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-surface-500">
                                        <span className="flex items-center gap-1"><HiOutlineLockClosed className="w-3.5 h-3.5" /> Credentials</span>
                                    </th>
                                    <th className="text-right py-3 px-4 text-sm font-semibold text-surface-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <>
                                        <tr key={u.id} className="border-b border-surface-100 dark:border-surface-800 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                                                        {(u.fullName || 'U')[0]}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-surface-900 dark:text-white text-sm">{u.fullName}</p>
                                                        <p className="text-xs text-surface-500">{u.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${u.role === 'ROLE_ADMIN' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                                                    u.role === 'ROLE_RECRUITER' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                                                        'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                                                    }`}>{u.role?.replace('ROLE_', '')}</span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-surface-500">{formatDate(u.createdAt)}</td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${u.isActive ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${u.isActive ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                                    {u.isActive ? 'Active' : 'Suspended'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`text-xs font-medium ${u.isApproved ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                                    {u.isApproved ? '✓ Yes' : '⏳ Pending'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <button onClick={() => toggleExpand(u.id)}
                                                    className="text-xs text-primary-600 hover:text-primary-500 font-medium flex items-center gap-1">
                                                    <HiOutlineEye className="w-3.5 h-3.5" /> View Details
                                                </button>
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <button onClick={() => handleSuspend(u.id)}
                                                    className={`btn-ghost text-xs ${u.isActive ? 'text-red-500' : 'text-emerald-500'}`}>
                                                    {u.isActive ? <><HiOutlineBan className="w-4 h-4 mr-1" /> Suspend</> : <><HiOutlineCheck className="w-4 h-4 mr-1" /> Activate</>}
                                                </button>
                                            </td>
                                        </tr>
                                        {expandedUser === u.id && (
                                            <tr key={`${u.id}-detail`} className="bg-surface-50/50 dark:bg-surface-800/20">
                                                <td colSpan={7} className="px-4 py-4">
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                                                        <div className="space-y-2">
                                                            <p className="font-semibold text-surface-700 dark:text-surface-300 text-sm">Account Info</p>
                                                            <p><span className="text-surface-400">User ID:</span> <span className="text-surface-700 dark:text-surface-300">{u.id}</span></p>
                                                            <p><span className="text-surface-400">Email:</span> <span className="text-surface-700 dark:text-surface-300">{u.email}</span></p>
                                                            <p><span className="text-surface-400">Full Name:</span> <span className="text-surface-700 dark:text-surface-300">{u.fullName}</span></p>
                                                            <p><span className="text-surface-400">Created:</span> <span className="text-surface-700 dark:text-surface-300">{formatDate(u.createdAt)}</span></p>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <p className="font-semibold text-surface-700 dark:text-surface-300 text-sm">Access</p>
                                                            <p><span className="text-surface-400">Role:</span> <span className="text-surface-700 dark:text-surface-300">{u.role}</span></p>
                                                            <p><span className="text-surface-400">Active:</span> <span className={u.isActive ? 'text-emerald-600' : 'text-red-500'}>{u.isActive ? 'Yes' : 'No'}</span></p>
                                                            <p><span className="text-surface-400">Approved:</span> <span className={u.isApproved ? 'text-emerald-600' : 'text-amber-500'}>{u.isApproved ? 'Yes' : 'Pending'}</span></p>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <p className="font-semibold text-surface-700 dark:text-surface-300 text-sm flex items-center gap-1">
                                                                <HiOutlineLockClosed className="w-4 h-4" /> Credentials
                                                            </p>
                                                            {userDetails[u.id]?.passwordHash ? (
                                                                <div>
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <span className="text-surface-400">Password Hash:</span>
                                                                        <button onClick={() => toggleHash(u.id)} className="text-primary-500 hover:text-primary-400">
                                                                            {showHashes[u.id] ? <HiOutlineEyeOff className="w-3.5 h-3.5" /> : <HiOutlineEye className="w-3.5 h-3.5" />}
                                                                        </button>
                                                                    </div>
                                                                    {showHashes[u.id] && (
                                                                        <code className="block text-[10px] bg-surface-100 dark:bg-surface-900 p-2 rounded-lg break-all text-surface-600 dark:text-surface-400 font-mono">
                                                                            {userDetails[u.id].passwordHash}
                                                                        </code>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <p className="text-surface-400 italic">Detail endpoint not available</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {totalPages > 1 && (
                        <div className="mt-4 flex justify-center gap-2">
                            <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="btn-secondary text-sm">Previous</button>
                            <span className="flex items-center px-4 text-sm text-surface-500">Page {page + 1} of {totalPages}</span>
                            <button onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1} className="btn-secondary text-sm">Next</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
