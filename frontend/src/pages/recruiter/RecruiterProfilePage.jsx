import { useState, useEffect } from 'react';
import { recruiterAPI } from '../../services/api';
import toast from 'react-hot-toast';

export default function RecruiterProfilePage() {
    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await recruiterAPI.getProfile();
                setProfile(res.data);
                setForm(res.data);
            } catch (err) { console.error(err); }
            setLoading(false);
        };
        load();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await recruiterAPI.updateProfile({ position: form.position, phone: form.phone, bio: form.bio });
            setProfile(res.data);
            toast.success('Profile updated!');
        } catch (err) { toast.error('Failed'); }
        setSaving(false);
    };

    if (loading) return <div className="space-y-4">{[...Array(4)].map((_, i) => <div key={i} className="skeleton h-12 w-full" />)}</div>;

    return (
        <div className="max-w-2xl animate-fade-in">
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-6">My Profile</h1>
            <div className="glass-card p-6 space-y-5">
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
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Position</label>
                    <input type="text" value={form.position || ''} onChange={(e) => setForm({ ...form, position: e.target.value })}
                        className="input-field" placeholder="e.g. HR Manager" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Phone</label>
                    <input type="text" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Bio</label>
                    <textarea value={form.bio || ''} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="input-field h-24 resize-none" />
                </div>
                <button onClick={handleSave} disabled={saving} className="btn-primary">{saving ? 'Saving...' : 'Save Profile'}</button>
            </div>
        </div>
    );
}
