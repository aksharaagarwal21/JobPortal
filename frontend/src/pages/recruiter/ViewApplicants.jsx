import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { applicationsAPI } from '../../services/api';
import { formatDate, APPLICATION_STATUSES } from '../../utils';
import toast from 'react-hot-toast';

export default function ViewApplicants() {
    const { jobId } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchApplicants(); }, [jobId]);

    const fetchApplicants = async () => {
        try {
            const res = await applicationsAPI.getJobApplicants(jobId, { page: 0, size: 50 });
            setApplicants(res.data.content || []);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const updateStatus = async (id, status) => {
        try {
            await applicationsAPI.updateStatus(id, status);
            setApplicants(applicants.map(a => a.id === id ? { ...a, status } : a));
            toast.success(`Application ${status.toLowerCase()}`);
        } catch (err) { toast.error('Failed to update'); }
    };

    return (
        <div className="animate-fade-in">
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-6">Applicants</h1>
            {loading ? (
                <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-20 w-full" />)}</div>
            ) : applicants.length === 0 ? (
                <p className="text-center py-20 text-surface-400">No applicants yet</p>
            ) : (
                <div className="space-y-4">
                    {applicants.map((app) => (
                        <div key={app.id} className="glass-card p-5">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-semibold text-surface-900 dark:text-white">{app.candidateName}</h3>
                                    <p className="text-sm text-surface-500">{app.candidateEmail}</p>
                                    <p className="text-xs text-surface-400 mt-1">Applied {formatDate(app.appliedAt)}</p>
                                    {app.coverLetter && (
                                        <p className="text-sm text-surface-600 dark:text-surface-300 mt-2 line-clamp-2">{app.coverLetter}</p>
                                    )}
                                    {app.resumeUrl && (
                                        <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="text-sm text-primary-600 hover:underline mt-1 inline-block">View Resume</a>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`badge-${APPLICATION_STATUSES[app.status]?.color || 'primary'} mr-2`}>
                                        {APPLICATION_STATUSES[app.status]?.label || app.status}
                                    </span>
                                    {app.status === 'PENDING' || app.status === 'REVIEWED' ? (
                                        <>
                                            <button onClick={() => updateStatus(app.id, 'SHORTLISTED')} className="btn-primary text-xs px-3 py-1.5">Shortlist</button>
                                            <button onClick={() => updateStatus(app.id, 'REJECTED')} className="btn-danger text-xs px-3 py-1.5">Reject</button>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
