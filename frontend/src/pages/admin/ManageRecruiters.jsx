import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { formatDate } from '../../utils';
import toast from 'react-hot-toast';
import { HiOutlineCheck, HiOutlineShieldCheck } from 'react-icons/hi';

export default function ManageRecruiters() {
    const [recruiters, setRecruiters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await adminAPI.getPendingRecruiters({ page: 0, size: 50 });
                setRecruiters(res.data.content || []);
            } catch (err) { console.error(err); }
            setLoading(false);
        };
        load();
    }, []);

    const handleApprove = async (id) => {
        try {
            await adminAPI.approveRecruiter(id);
            setRecruiters(recruiters.filter(r => r.id !== id));
            toast.success('Recruiter approved');
        } catch (err) { toast.error('Failed'); }
    };

    return (
        <div className="animate-fade-in">
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-6">Pending Recruiters</h1>
            {loading ? (
                <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-16 w-full" />)}</div>
            ) : recruiters.length === 0 ? (
                <div className="text-center py-20">
                    <HiOutlineShieldCheck className="w-16 h-16 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-surface-500">No pending approvals</h3>
                </div>
            ) : (
                <div className="space-y-3">
                    {recruiters.map((r) => (
                        <div key={r.id} className="glass-card p-5 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-surface-900 dark:text-white">{r.fullName}</h3>
                                <p className="text-sm text-surface-500">{r.email} • Joined {formatDate(r.createdAt)}</p>
                            </div>
                            <button onClick={() => handleApprove(r.id)} className="btn-primary text-sm">
                                <HiOutlineCheck className="w-4 h-4 mr-1" /> Approve
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
