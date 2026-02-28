import { useState, useEffect } from 'react';
import { recruiterAPI } from '../../services/api';
import toast from 'react-hot-toast';

export default function CompanyEditor() {
    const [form, setForm] = useState({ name: '', description: '', website: '', location: '', industry: '', companySize: '', foundedYear: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await recruiterAPI.getProfile();
                if (res.data.company) setForm(res.data.company);
            } catch (err) { console.error(err); }
            setLoading(false);
        };
        load();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await recruiterAPI.updateCompany(form);
            toast.success('Company updated!');
        } catch (err) { toast.error('Failed'); }
        setSaving(false);
    };

    if (loading) return <div className="space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="skeleton h-12 w-full" />)}</div>;

    return (
        <div className="max-w-2xl animate-fade-in">
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-6">Company Profile</h1>
            <div className="glass-card p-6 space-y-5">
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Company Name *</label>
                    <input type="text" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Description</label>
                    <textarea value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field h-24 resize-none" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Website</label>
                        <input type="url" value={form.website || ''} onChange={(e) => setForm({ ...form, website: e.target.value })} className="input-field" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Location</label>
                        <input type="text" value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input-field" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Industry</label>
                        <input type="text" value={form.industry || ''} onChange={(e) => setForm({ ...form, industry: e.target.value })} className="input-field" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Company Size</label>
                        <input type="text" value={form.companySize || ''} onChange={(e) => setForm({ ...form, companySize: e.target.value })} className="input-field" placeholder="e.g. 50-200" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Founded Year</label>
                    <input type="number" value={form.foundedYear || ''} onChange={(e) => setForm({ ...form, foundedYear: parseInt(e.target.value) || '' })} className="input-field" />
                </div>
                <button onClick={handleSave} disabled={saving} className="btn-primary">{saving ? 'Saving...' : 'Save Company'}</button>
            </div>
        </div>
    );
}
