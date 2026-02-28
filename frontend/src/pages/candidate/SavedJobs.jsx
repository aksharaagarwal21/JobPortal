import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { candidateAPI } from '../../services/api';
import { formatSalary } from '../../utils';
import toast from 'react-hot-toast';
import { HiOutlineHeart, HiOutlineLocationMarker } from 'react-icons/hi';

export default function SavedJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await candidateAPI.getSavedJobs({ page: 0, size: 50 });
                setJobs(res.data.content || []);
            } catch (err) { console.error(err); }
            setLoading(false);
        };
        load();
    }, []);

    const handleUnsave = async (jobId) => {
        try {
            await candidateAPI.unsaveJob(jobId);
            setJobs(jobs.filter(j => j.id !== jobId));
            toast.success('Job removed from saved');
        } catch (err) { toast.error('Failed'); }
    };

    return (
        <div className="animate-fade-in">
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-6">Saved Jobs</h1>
            {loading ? (
                <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-20 w-full" />)}</div>
            ) : jobs.length === 0 ? (
                <div className="text-center py-20">
                    <HiOutlineHeart className="w-16 h-16 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-surface-500">No saved jobs</h3>
                    <Link to="/jobs" className="text-primary-600 hover:underline mt-2 inline-block">Browse jobs</Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {jobs.map((job) => (
                        <div key={job.id} className="glass-card p-5 flex items-center justify-between">
                            <Link to={`/jobs/${job.id}`} className="flex-1">
                                <h3 className="font-semibold text-surface-900 dark:text-white hover:text-primary-600 transition">{job.title}</h3>
                                <div className="flex gap-4 text-sm text-surface-500 mt-1">
                                    <span>{job.companyName}</span>
                                    {job.location && <span className="flex items-center gap-1"><HiOutlineLocationMarker className="w-3.5 h-3.5" /> {job.location}</span>}
                                    <span>{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
                                </div>
                            </Link>
                            <button onClick={() => handleUnsave(job.id)} className="btn-ghost text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                                <HiOutlineHeart className="w-5 h-5 fill-current" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
