export const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
    });
};

export const formatTimeAgo = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return formatDate(dateStr);
};

export const formatSalary = (min, max, currency = 'INR') => {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency', currency, maximumFractionDigits: 0,
    });
    if (min && max) return `${formatter.format(min)} - ${formatter.format(max)}`;
    if (min) return `From ${formatter.format(min)}`;
    if (max) return `Up to ${formatter.format(max)}`;
    return 'Not specified';
};

export const JOB_TYPES = [
    { value: 'FULL_TIME', label: 'Full Time' },
    { value: 'PART_TIME', label: 'Part Time' },
    { value: 'CONTRACT', label: 'Contract' },
    { value: 'INTERNSHIP', label: 'Internship' },
    { value: 'REMOTE', label: 'Remote' },
];

export const EXPERIENCE_LEVELS = [
    { value: 'ENTRY', label: 'Entry Level' },
    { value: 'MID', label: 'Mid Level' },
    { value: 'SENIOR', label: 'Senior Level' },
    { value: 'LEAD', label: 'Lead' },
    { value: 'EXECUTIVE', label: 'Executive' },
];

export const APPLICATION_STATUSES = {
    PENDING: { label: 'Pending', color: 'warning' },
    REVIEWED: { label: 'Reviewed', color: 'primary' },
    SHORTLISTED: { label: 'Shortlisted', color: 'success' },
    REJECTED: { label: 'Rejected', color: 'danger' },
    HIRED: { label: 'Hired', color: 'success' },
};

export const getRoleDashboard = (role) => {
    switch (role) {
        case 'ROLE_CANDIDATE': return '/candidate/dashboard';
        case 'ROLE_RECRUITER': return '/recruiter/dashboard';
        case 'ROLE_ADMIN': return '/admin/dashboard';
        default: return '/';
    }
};
