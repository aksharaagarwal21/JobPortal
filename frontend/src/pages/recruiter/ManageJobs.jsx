import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recruiterAPI, jobsAPI } from '../../services/api';
import { formatDate } from '../../utils';
import toast from 'react-hot-toast';
import { HiOutlineTrash, HiOutlinePencil, HiOutlineEye } from 'react-icons/hi';

export default function ManageJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await recruiterAPI.getMyJobs({ page: 0, size: 50 });
                setJobs(res.data.content || []);
            } catch (err) { console.error(err); }
            setLoading(false);
        };
        load();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Delete this job?')) return;
        try {
            await jobsAPI.delete(id);
            setJobs(jobs.filter(j => j.id !== id));
            toast.success('Job deleted');
        } catch (err) { toast.error('Failed to delete'); }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">My Jobs</h1>
                <Link to="/recruiter/post-job" className="btn-primary text-sm">Post New Job</Link>
            </div>

            {loading ? (
                <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-16 w-full" />)}</div>
            ) : jobs.length === 0 ? (
                <div className="text-center py-20 text-surface-400">No jobs posted yet</div>
            ) : (
                <div className="glass-card overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-surface-200 dark:border-surface-700">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-surface-500">Title</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-surface-500 hidden sm:table-cell">Type</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-surface-500 hidden md:table-cell">Posted</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-surface-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr key={job.id} className="border-b border-surface-100 dark:border-surface-800 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition">
                                    <td className="py-3 px-4">
                                        <p className="font-medium text-surface-900 dark:text-white">{job.title}</p>
                                        <p className="text-xs text-surface-500">{job.location}</p>
                                    </td>
                                    <td className="py-3 px-4 text-surface-500 text-sm hidden sm:table-cell">{job.jobType?.replace('_', ' ')}</td>
                                    <td className="py-3 px-4 text-surface-500 text-sm hidden md:table-cell">{formatDate(job.createdAt)}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex justify-end gap-1">
                                            <Link to={`/jobs/${job.id}`} className="btn-ghost p-2"><HiOutlineEye className="w-4 h-4" /></Link>
                                            <button onClick={() => handleDelete(job.id)} className="btn-ghost p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                <HiOutlineTrash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
