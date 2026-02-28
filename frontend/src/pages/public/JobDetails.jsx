import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsAPI, applicationsAPI, candidateAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { formatDate, formatSalary } from '../../utils';
import toast from 'react-hot-toast';
import { HiOutlineLocationMarker, HiOutlineBriefcase, HiOutlineCurrencyRupee, HiOutlineClock, HiOutlineHeart, HiOutlineAcademicCap } from 'react-icons/hi';

export default function JobDetails() {
    const { id } = useParams();
    const { isAuthenticated, role } = useAuth();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');
    const [showApplyModal, setShowApplyModal] = useState(false);

    useEffect(() => {
        fetchJob();
    }, [id]);

    const fetchJob = async () => {
        try {
            const res = await jobsAPI.getById(id);
            setJob(res.data);
        } catch (err) {
            toast.error('Failed to load job details');
        }
        setLoading(false);
    };

    const handleApply = async () => {
        if (!isAuthenticated) { navigate('/login'); return; }
        setApplying(true);
        try {
            await applicationsAPI.apply({ jobId: parseInt(id), coverLetter });
            toast.success('Applied successfully!');
            setShowApplyModal(false);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to apply');
        }
        setApplying(false);
    };

    const handleSave = async () => {
        if (!isAuthenticated) { navigate('/login'); return; }
        try {
            await candidateAPI.saveJob(id);
            toast.success('Job saved!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to save job');
        }
    };

    if (loading) return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
            <div className="skeleton h-10 w-2/3" />
            <div className="skeleton h-6 w-1/3" />
            <div className="skeleton h-40 w-full" />
        </div>
    );

    if (!job) return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-surface-500">Job not found</h2>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
            {/* Header */}
            <div className="glass-card p-8 mb-6">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-600 dark:text-primary-400 font-bold text-xl">
                            {job.companyName?.charAt(0) || 'J'}
                        </span>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white" id="job-title">
                            {job.title}
                        </h1>
                        <p className="text-lg text-surface-500 dark:text-surface-400 mt-1">
                            {job.companyName || 'Company'}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-surface-500 dark:text-surface-400">
                            {job.location && (
                                <span className="flex items-center gap-1.5">
                                    <HiOutlineLocationMarker className="w-4 h-4" /> {job.location}
                                </span>
                            )}
                            <span className="flex items-center gap-1.5">
                                <HiOutlineBriefcase className="w-4 h-4" /> {job.jobType?.replace('_', ' ')}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <HiOutlineAcademicCap className="w-4 h-4" /> {job.experienceLevel}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <HiOutlineCurrencyRupee className="w-4 h-4" /> {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <HiOutlineClock className="w-4 h-4" /> Posted {formatDate(job.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                {role === 'ROLE_CANDIDATE' || !isAuthenticated ? (
                    <div className="flex gap-3 mt-6">
                        <button onClick={() => setShowApplyModal(true)} className="btn-primary" id="apply-btn">
                            Apply Now
                        </button>
                        <button onClick={handleSave} className="btn-secondary" id="save-job-btn">
                            <HiOutlineHeart className="w-5 h-5 mr-2" /> Save
                        </button>
                    </div>
                ) : null}
            </div>

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
                <div className="glass-card p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-3 text-surface-900 dark:text-white">Required Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {job.skills.map((s) => <span key={s} className="badge-primary">{s}</span>)}
                    </div>
                </div>
            )}

            {/* Description */}
            <div className="glass-card p-6 mb-6">
                <h2 className="text-lg font-semibold mb-3 text-surface-900 dark:text-white">Job Description</h2>
                <div className="prose dark:prose-invert max-w-none text-surface-600 dark:text-surface-300 whitespace-pre-wrap">
                    {job.description}
                </div>
            </div>

            {/* Requirements */}
            {job.requirements && (
                <div className="glass-card p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-3 text-surface-900 dark:text-white">Requirements</h2>
                    <div className="prose dark:prose-invert max-w-none text-surface-600 dark:text-surface-300 whitespace-pre-wrap">
                        {job.requirements}
                    </div>
                </div>
            )}

            {/* Apply Modal */}
            {showApplyModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" id="apply-modal">
                    <div className="glass-card p-8 max-w-lg w-full animate-scale-in">
                        <h2 className="text-xl font-bold mb-4 text-surface-900 dark:text-white">Apply for {job.title}</h2>
                        <textarea
                            placeholder="Cover letter (optional)..."
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            className="input-field h-32 resize-none mb-4"
                            id="cover-letter-input"
                        />
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setShowApplyModal(false)} className="btn-secondary">Cancel</button>
                            <button onClick={handleApply} disabled={applying} className="btn-primary" id="submit-application-btn">
                                {applying ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
