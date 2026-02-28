import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    HiOutlineViewGrid, HiOutlineUser, HiOutlineBriefcase,
    HiOutlineDocumentText, HiOutlineHeart, HiOutlineBell,
    HiOutlinePlusCircle, HiOutlineUsers, HiOutlineClipboardList,
    HiOutlineOfficeBuilding, HiOutlineChartBar, HiOutlineShieldCheck,
    HiOutlineSearch,
} from 'react-icons/hi';

const candidateLinks = [
    { to: '/candidate/dashboard', label: 'Dashboard', icon: HiOutlineViewGrid },
    { to: '/candidate/profile', label: 'My Profile', icon: HiOutlineUser },
    { to: '/candidate/applications', label: 'Applications', icon: HiOutlineDocumentText },
    { to: '/candidate/saved-jobs', label: 'Saved Jobs', icon: HiOutlineHeart },
    { to: '/notifications', label: 'Notifications', icon: HiOutlineBell },
];

const recruiterLinks = [
    { to: '/recruiter/dashboard', label: 'Dashboard', icon: HiOutlineViewGrid },
    { to: '/recruiter/post-job', label: 'Post Job', icon: HiOutlinePlusCircle },
    { to: '/recruiter/jobs', label: 'My Jobs', icon: HiOutlineBriefcase },
    { to: '/recruiter/candidates', label: 'Find Candidates', icon: HiOutlineSearch },
    { to: '/recruiter/company', label: 'Company', icon: HiOutlineOfficeBuilding },
    { to: '/recruiter/profile', label: 'My Profile', icon: HiOutlineUser },
    { to: '/notifications', label: 'Notifications', icon: HiOutlineBell },
];

const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: HiOutlineChartBar },
    { to: '/admin/users', label: 'Users', icon: HiOutlineUsers },
    { to: '/admin/recruiters', label: 'Recruiters', icon: HiOutlineShieldCheck },
    { to: '/admin/jobs', label: 'Job Posts', icon: HiOutlineBriefcase },
];

export default function Sidebar() {
    const { role } = useAuth();

    const links = role === 'ROLE_ADMIN' ? adminLinks :
        role === 'ROLE_RECRUITER' ? recruiterLinks : candidateLinks;

    return (
        <aside className="w-64 hidden lg:block h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto border-r border-surface-200/50 dark:border-surface-700/50 bg-white/50 dark:bg-surface-900/50 backdrop-blur-sm">
            <nav className="p-4 space-y-1">
                {links.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 shadow-sm'
                                : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                            }`
                        }
                    >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
