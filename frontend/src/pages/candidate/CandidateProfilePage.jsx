import { useState, useEffect } from 'react';
import { candidateAPI } from '../../services/api';
import toast from 'react-hot-toast';
import {
    HiOutlineUser, HiOutlineBriefcase, HiOutlineAcademicCap,
    HiOutlinePlusCircle, HiOutlineTrash, HiOutlineCheckCircle,
    HiOutlineLightningBolt,
} from 'react-icons/hi';

export default function CandidateProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({});
    const [skillInput, setSkillInput] = useState('');

    // Local education, experience, certifications (stored in summary as JSON for now)
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [certifications, setCertifications] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await candidateAPI.getProfile();
                setProfile(res.data);
                setForm(res.data);
                // Try to parse structured data from summary
                try {
                    const parsed = JSON.parse(res.data.summary || '{}');
                    if (parsed._structured) {
                        setEducation(parsed.education || []);
                        setExperience(parsed.experience || []);
                        setCertifications(parsed.certifications || []);
                        setForm(f => ({ ...f, summary: parsed.about || '' }));
                    }
                } catch { /* not JSON, use as plain text */ }
            } catch (err) { console.error(err); }
            setLoading(false);
        };
        load();
    }, []);

    const getCompleteness = () => {
        let score = 0;
        const total = 8;
        if (form.headline) score++;
        if (form.summary || experience.length > 0) score++;
        if (form.phone) score++;
        if (form.location) score++;
        if (form.skills?.length > 0) score++;
        if (form.linkedinUrl || form.githubUrl) score++;
        if (form.resumeUrl) score++;
        if (form.experienceYears > 0) score++;
        return Math.round((score / total) * 100);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Package structured data into summary JSON
            const structuredSummary = JSON.stringify({
                _structured: true,
                about: form.summary || '',
                education,
                experience,
                certifications,
            });

            const res = await candidateAPI.updateProfile({
                headline: form.headline, summary: structuredSummary,
                experienceYears: form.experienceYears, phone: form.phone,
                location: form.location, linkedinUrl: form.linkedinUrl,
                githubUrl: form.githubUrl, portfolioUrl: form.portfolioUrl,
                skills: form.skills,
            });
            setProfile(res.data);
            toast.success('Profile updated!');
        } catch (err) { toast.error('Failed to update profile'); }
        setSaving(false);
    };

    const handleResume = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const res = await candidateAPI.uploadResume(file);
            setForm({ ...form, resumeUrl: res.data.url });
            toast.success('Resume uploaded!');
        } catch (err) { toast.error('Upload failed'); }
    };

    const addSkill = () => {
        if (skillInput.trim() && !form.skills?.includes(skillInput.trim())) {
            setForm({ ...form, skills: [...(form.skills || []), skillInput.trim()] });
            setSkillInput('');
        }
    };

    const removeSkill = (s) => setForm({ ...form, skills: (form.skills || []).filter(sk => sk !== s) });

    const addEducation = () => setEducation([...education, { school: '', degree: '', year: '' }]);
    const updateEducation = (i, field, val) => setEducation(education.map((e, idx) => idx === i ? { ...e, [field]: val } : e));
    const removeEducation = (i) => setEducation(education.filter((_, idx) => idx !== i));

    const addExperience = () => setExperience([...experience, { company: '', role: '', duration: '', description: '' }]);
    const updateExperience = (i, field, val) => setExperience(experience.map((e, idx) => idx === i ? { ...e, [field]: val } : e));
    const removeExperience = (i) => setExperience(experience.filter((_, idx) => idx !== i));

    const addCertification = () => setCertifications([...certifications, { name: '', issuer: '', year: '' }]);
    const updateCertification = (i, field, val) => setCertifications(certifications.map((c, idx) => idx === i ? { ...c, [field]: val } : c));
    const removeCertification = (i) => setCertifications(certifications.filter((_, idx) => idx !== i));

    if (loading) return <div className="space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="skeleton h-12 w-full" />)}</div>;

    const completeness = getCompleteness();

    return (
        <div className="max-w-3xl animate-fade-in">
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">My Portfolio</h1>
            <p className="text-surface-500 dark:text-surface-400 mb-6">Build your professional profile to stand out to recruiters</p>

            {/* Profile Completeness */}
            <div className="glass-card p-5 mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-surface-700 dark:text-surface-300 flex items-center gap-2">
                        <HiOutlineLightningBolt className="w-4 h-4 text-amber-500" /> Profile Completeness
                    </h3>
                    <span className={`text-sm font-bold ${completeness >= 80 ? 'text-emerald-600' : completeness >= 50 ? 'text-amber-600' : 'text-red-500'}`}>{completeness}%</span>
                </div>
                <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full transition-all duration-500 ${completeness >= 80 ? 'bg-emerald-500' : completeness >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${completeness}%` }} />
                </div>
                {completeness < 100 && (
                    <p className="text-xs text-surface-400 mt-2">Complete your profile to increase visibility to recruiters</p>
                )}
            </div>

            {/* Basic Info */}
            <div className="glass-card p-6 space-y-5 mb-6">
                <h2 className="text-lg font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                    <HiOutlineUser className="w-5 h-5 text-primary-500" /> Basic Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Full Name</label>
                        <input type="text" value={form.fullName || ''} disabled className="input-field opacity-60" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Email</label>
                        <input type="text" value={form.email || ''} disabled className="input-field opacity-60" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Headline</label>
                    <input type="text" value={form.headline || ''} onChange={(e) => setForm({ ...form, headline: e.target.value })}
                        className="input-field" placeholder="e.g. Full Stack Developer | React & Node.js Expert" id="profile-headline" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">About Me</label>
                    <textarea value={form.summary || ''} onChange={(e) => setForm({ ...form, summary: e.target.value })}
                        className="input-field h-24 resize-none" placeholder="Tell recruiters about yourself, your passions, and career goals..." id="profile-summary" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Years of Experience</label>
                        <input type="number" value={form.experienceYears || 0} onChange={(e) => setForm({ ...form, experienceYears: parseInt(e.target.value) })}
                            className="input-field" min="0" id="profile-experience" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Phone</label>
                        <input type="text" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="input-field" id="profile-phone" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Location</label>
                        <input type="text" value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })}
                            className="input-field" placeholder="e.g. San Francisco, CA" id="profile-location" />
                    </div>
                </div>
            </div>

            {/* Skills */}
            <div className="glass-card p-6 space-y-4 mb-6">
                <h2 className="text-lg font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                    <HiOutlineLightningBolt className="w-5 h-5 text-amber-500" /> Skills
                </h2>
                <div className="flex gap-2">
                    <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        className="input-field flex-1" placeholder="Add a skill (e.g. React, Python, Docker)..." id="skill-input" />
                    <button onClick={addSkill} className="btn-secondary text-sm">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {(form.skills || []).map((s) => (
                        <span key={s} className="badge-primary flex items-center gap-1 px-3 py-1.5">
                            {s} <button onClick={() => removeSkill(s)} className="hover:text-red-500 ml-1">×</button>
                        </span>
                    ))}
                    {(!form.skills || form.skills.length === 0) && (
                        <p className="text-sm text-surface-400 italic">No skills added yet — add your top skills to get discovered</p>
                    )}
                </div>
            </div>

            {/* Work Experience */}
            <div className="glass-card p-6 space-y-4 mb-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                        <HiOutlineBriefcase className="w-5 h-5 text-emerald-500" /> Work Experience
                    </h2>
                    <button onClick={addExperience} className="btn-ghost text-sm text-primary-600 flex items-center gap-1">
                        <HiOutlinePlusCircle className="w-4 h-4" /> Add
                    </button>
                </div>
                {experience.length === 0 ? (
                    <p className="text-sm text-surface-400 italic">Add your work experience to build a stronger profile</p>
                ) : (
                    <div className="space-y-4">
                        {experience.map((exp, i) => (
                            <div key={i} className="p-4 bg-surface-50 dark:bg-surface-800/50 rounded-xl relative">
                                <button onClick={() => removeExperience(i)} className="absolute top-2 right-2 text-surface-400 hover:text-red-500">
                                    <HiOutlineTrash className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <input type="text" value={exp.company} onChange={(e) => updateExperience(i, 'company', e.target.value)}
                                        placeholder="Company" className="input-field text-sm" />
                                    <input type="text" value={exp.role} onChange={(e) => updateExperience(i, 'role', e.target.value)}
                                        placeholder="Role/Title" className="input-field text-sm" />
                                    <input type="text" value={exp.duration} onChange={(e) => updateExperience(i, 'duration', e.target.value)}
                                        placeholder="Duration (e.g. 2022 - Present)" className="input-field text-sm" />
                                </div>
                                <textarea value={exp.description} onChange={(e) => updateExperience(i, 'description', e.target.value)}
                                    placeholder="What did you do? Key achievements..." className="input-field text-sm h-16 resize-none mt-3" />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Education */}
            <div className="glass-card p-6 space-y-4 mb-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                        <HiOutlineAcademicCap className="w-5 h-5 text-primary-500" /> Education
                    </h2>
                    <button onClick={addEducation} className="btn-ghost text-sm text-primary-600 flex items-center gap-1">
                        <HiOutlinePlusCircle className="w-4 h-4" /> Add
                    </button>
                </div>
                {education.length === 0 ? (
                    <p className="text-sm text-surface-400 italic">Add your education background</p>
                ) : (
                    <div className="space-y-4">
                        {education.map((edu, i) => (
                            <div key={i} className="p-4 bg-surface-50 dark:bg-surface-800/50 rounded-xl relative">
                                <button onClick={() => removeEducation(i)} className="absolute top-2 right-2 text-surface-400 hover:text-red-500">
                                    <HiOutlineTrash className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <input type="text" value={edu.school} onChange={(e) => updateEducation(i, 'school', e.target.value)}
                                        placeholder="School/University" className="input-field text-sm" />
                                    <input type="text" value={edu.degree} onChange={(e) => updateEducation(i, 'degree', e.target.value)}
                                        placeholder="Degree (e.g. B.S. Computer Science)" className="input-field text-sm" />
                                    <input type="text" value={edu.year} onChange={(e) => updateEducation(i, 'year', e.target.value)}
                                        placeholder="Year (e.g. 2020)" className="input-field text-sm" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Certifications */}
            <div className="glass-card p-6 space-y-4 mb-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                        <HiOutlineCheckCircle className="w-5 h-5 text-purple-500" /> Certifications
                    </h2>
                    <button onClick={addCertification} className="btn-ghost text-sm text-primary-600 flex items-center gap-1">
                        <HiOutlinePlusCircle className="w-4 h-4" /> Add
                    </button>
                </div>
                {certifications.length === 0 ? (
                    <p className="text-sm text-surface-400 italic">Add any certifications you hold</p>
                ) : (
                    <div className="space-y-4">
                        {certifications.map((cert, i) => (
                            <div key={i} className="p-4 bg-surface-50 dark:bg-surface-800/50 rounded-xl relative">
                                <button onClick={() => removeCertification(i)} className="absolute top-2 right-2 text-surface-400 hover:text-red-500">
                                    <HiOutlineTrash className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <input type="text" value={cert.name} onChange={(e) => updateCertification(i, 'name', e.target.value)}
                                        placeholder="Certification Name" className="input-field text-sm" />
                                    <input type="text" value={cert.issuer} onChange={(e) => updateCertification(i, 'issuer', e.target.value)}
                                        placeholder="Issuing Organization" className="input-field text-sm" />
                                    <input type="text" value={cert.year} onChange={(e) => updateCertification(i, 'year', e.target.value)}
                                        placeholder="Year" className="input-field text-sm" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Links */}
            <div className="glass-card p-6 space-y-4 mb-6">
                <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Links & Portfolio</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">LinkedIn</label>
                        <input type="url" value={form.linkedinUrl || ''} onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                            className="input-field" placeholder="https://linkedin.com/in/..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">GitHub</label>
                        <input type="url" value={form.githubUrl || ''} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                            className="input-field" placeholder="https://github.com/..." />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Portfolio Website</label>
                        <input type="url" value={form.portfolioUrl || ''} onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })}
                            className="input-field" placeholder="https://yourportfolio.com" />
                    </div>
                </div>
            </div>

            {/* Resume */}
            <div className="glass-card p-6 space-y-4 mb-6">
                <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Resume</h2>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleResume} className="input-field" id="resume-upload" />
                {form.resumeUrl && <p className="text-sm text-emerald-600 flex items-center gap-1"><HiOutlineCheckCircle className="w-4 h-4" /> Resume uploaded</p>}
            </div>

            {/* Save Button */}
            <button onClick={handleSave} disabled={saving} className="btn-primary w-full text-base py-3" id="save-profile-btn">
                {saving ? 'Saving...' : '💾 Save Portfolio'}
            </button>
        </div>
    );
}
