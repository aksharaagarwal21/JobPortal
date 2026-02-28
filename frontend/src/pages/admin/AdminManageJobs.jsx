import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI, jobsAPI } from '../../services/api';
import { formatDate } from '../../utils';
import toast from 'react-hot-toast';
import { HiOutlineTrash, HiOutlineEye } from 'react-icons/hi';

export default function AdminManageJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => { fetchJobs(); }, [page]);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const res = await jobsAPI.search({ page, size: 15 });
            setJobs(res.data.content || []);
            setTotalPages(res.data.totalPages || 0);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this job?')) return;
        try {
            await adminAPI.deleteJob(id);
            setJobs(jobs.filter(j => j.id !== id));
            toast.success('Job deleted');
        } catch (err) { toast.error('Failed'); }
    };

    return (
        <div className="animate-fade-in">
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-6">Manage Job Posts</h1>
            {loading ? (
                <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="skeleton h-14 w-full" />)}</div>
            ) : (
                <>
                    <div className="glass-card overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="border-b border-surface-200 dark:border-surface-700">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-surface-500">Title</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-surface-500">Company</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-surface-500">Posted</th>
                                    <th className="text-right py-3 px-4 text-sm font-semibold text-surface-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job.id} className="border-b border-surface-100 dark:border-surface-800 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition">
                                        <td className="py-3 px-4 font-medium text-surface-900 dark:text-white">{job.title}</td>
                                        <td className="py-3 px-4 text-surface-500">{job.companyName || '—'}</td>
                                        <td className="py-3 px-4 text-surface-500 text-sm">{formatDate(job.createdAt)}</td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <Link to={`/jobs/${job.id}`} className="btn-ghost p-2"><HiOutlineEye className="w-4 h-4" /></Link>
                                                <button onClick={() => handleDelete(job.id)} className="btn-ghost p-2 text-red-500"><HiOutlineTrash className="w-4 h-4" /></button>
                                            </div>
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
