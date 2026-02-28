import { useState, useEffect } from 'react';
import { candidateAPI } from '../../services/api';
import { formatDate, APPLICATION_STATUSES } from '../../utils';
import { HiOutlineDocumentText } from 'react-icons/hi';

export default function ApplicationTracker() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => { fetchApps(); }, [page]);

    const fetchApps = async () => {
        setLoading(true);
        try {
            const res = await candidateAPI.getApplications({ page, size: 10 });
            setApplications(res.data.content || []);
            setTotalPages(res.data.totalPages || 0);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    return (
        <div className="animate-fade-in">
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-6">My Applications</h1>

            {loading ? (
                <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="skeleton h-16 w-full" />)}</div>
            ) : applications.length === 0 ? (
                <div className="text-center py-20">
                    <HiOutlineDocumentText className="w-16 h-16 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-surface-500">No applications yet</h3>
                </div>
            ) : (
                <>
                    <div className="glass-card overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-surface-200 dark:border-surface-700">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-surface-500">Job</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-surface-500 hidden sm:table-cell">Company</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-surface-500 hidden md:table-cell">Applied</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-surface-500">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => (
                                    <tr key={app.id} className="border-b border-surface-100 dark:border-surface-800 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition">
                                        <td className="py-3 px-4 font-medium text-surface-900 dark:text-white">{app.jobTitle}</td>
                                        <td className="py-3 px-4 text-surface-500 hidden sm:table-cell">{app.companyName || '—'}</td>
                                        <td className="py-3 px-4 text-surface-500 hidden md:table-cell">{formatDate(app.appliedAt)}</td>
                                        <td className="py-3 px-4">
                                            <span className={`badge-${APPLICATION_STATUSES[app.status]?.color || 'primary'}`}>
                                                {APPLICATION_STATUSES[app.status]?.label || app.status}
                                            </span>
                                        </td>
                                    </tr>
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
