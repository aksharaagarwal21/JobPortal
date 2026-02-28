import { useState, useEffect } from 'react';
import { notificationsAPI } from '../../services/api';
import { formatTimeAgo } from '../../utils';
import { HiOutlineBell } from 'react-icons/hi';

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await notificationsAPI.getAll({ page: 0, size: 30 });
                setNotifications(res.data.content || []);
            } catch (err) { console.error(err); }
            setLoading(false);
        };
        load();
    }, []);

    const markRead = async (id) => {
        try {
            await notificationsAPI.markAsRead(id);
            setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
        } catch (err) { console.error(err); }
    };

    return (
        <div className="max-w-2xl animate-fade-in">
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-6">Notifications</h1>
            {loading ? (
                <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="skeleton h-16 w-full" />)}</div>
            ) : notifications.length === 0 ? (
                <div className="text-center py-20">
                    <HiOutlineBell className="w-16 h-16 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-surface-500">No notifications</h3>
                </div>
            ) : (
                <div className="space-y-2">
                    {notifications.map((n) => (
                        <div key={n.id} onClick={() => !n.isRead && markRead(n.id)}
                            className={`glass-card p-4 cursor-pointer transition hover:scale-[1.01] ${!n.isRead ? 'border-l-4 border-primary-500' : 'opacity-70'}`}>
                            <div className="flex items-start justify-between">
                                <div>
                                    <h4 className="font-medium text-surface-900 dark:text-white">{n.title}</h4>
                                    <p className="text-sm text-surface-500 mt-0.5">{n.message}</p>
                                </div>
                                <span className="text-xs text-surface-400 whitespace-nowrap ml-4">{formatTimeAgo(n.createdAt)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
