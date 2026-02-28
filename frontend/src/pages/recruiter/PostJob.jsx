import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsAPI } from '../../services/api';
import { JOB_TYPES, EXPERIENCE_LEVELS } from '../../utils';
import toast from 'react-hot-toast';

export default function PostJob() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '', description: '', requirements: '', location: '',
        jobType: 'FULL_TIME', experienceLevel: 'ENTRY',
        salaryMin: '', salaryMax: '', currency: 'INR', deadline: '',
    });
    const [skillInput, setSkillInput] = useState('');
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await jobsAPI.create({
                ...form, skills: skills.length > 0 ? skills : undefined,
                salaryMin: form.salaryMin ? parseFloat(form.salaryMin) : null,
                salaryMax: form.salaryMax ? parseFloat(form.salaryMax) : null,
                deadline: form.deadline || null
            });
            toast.success('Job posted!');
            navigate('/recruiter/jobs');
        } catch (err) { toast.error(err.response?.data?.message || 'Failed to post job'); }
        setLoading(false);
    };

    const addSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            setSkills([...skills, skillInput.trim()]);
            setSkillInput('');
        }
    };

    return (
        <div className="max-w-2xl animate-fade-in">
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-6">Post a New Job</h1>
            <div className="glass-card p-6">
                <form onSubmit={handleSubmit} className="space-y-5" id="post-job-form">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Job Title *</label>
                        <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="input-field" required id="job-title-input" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Description *</label>
                        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="input-field h-32 resize-none" required id="job-description-input" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Requirements</label>
                        <textarea value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                            className="input-field h-24 resize-none" id="job-requirements-input" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Location</label>
                            <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input-field" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Job Type</label>
                            <select value={form.jobType} onChange={(e) => setForm({ ...form, jobType: e.target.value })} className="input-field">
                                {JOB_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Experience Level</label>
                            <select value={form.experienceLevel} onChange={(e) => setForm({ ...form, experienceLevel: e.target.value })} className="input-field">
                                {EXPERIENCE_LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Min Salary</label>
                            <input type="number" value={form.salaryMin} onChange={(e) => setForm({ ...form, salaryMin: e.target.value })} className="input-field" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Max Salary</label>
                            <input type="number" value={form.salaryMax} onChange={(e) => setForm({ ...form, salaryMax: e.target.value })} className="input-field" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Skills</label>
                        <div className="flex gap-2 mb-2">
                            <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                className="input-field flex-1" placeholder="Add a skill..." />
                            <button type="button" onClick={addSkill} className="btn-secondary text-sm">Add</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.map(s => (
                                <span key={s} className="badge-primary flex items-center gap-1">
                                    {s} <button type="button" onClick={() => setSkills(skills.filter(sk => sk !== s))} className="hover:text-red-500">×</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Deadline</label>
                        <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="input-field" />
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary w-full" id="post-job-submit">
                        {loading ? 'Posting...' : 'Post Job'}
                    </button>
                </form>
            </div>
        </div>
    );
}
