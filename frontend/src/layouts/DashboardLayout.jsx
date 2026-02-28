import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
