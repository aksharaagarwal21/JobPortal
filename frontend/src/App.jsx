import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute, RoleRoute, GuestRoute } from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public pages
import Landing from './pages/public/Landing';
import JobListing from './pages/public/JobListing';
import JobDetails from './pages/public/JobDetails';
import CompanyProfile from './pages/public/CompanyProfile';
import CompanyListing from './pages/public/CompanyListing';

// Auth pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';

// Candidate pages
import CandidateDashboard from './pages/candidate/CandidateDashboard';
import CandidateProfilePage from './pages/candidate/CandidateProfilePage';
import ApplicationTracker from './pages/candidate/ApplicationTracker';
import SavedJobs from './pages/candidate/SavedJobs';

// Recruiter pages
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import PostJob from './pages/recruiter/PostJob';
import ManageJobs from './pages/recruiter/ManageJobs';
import ViewApplicants from './pages/recruiter/ViewApplicants';
import RecruiterProfilePage from './pages/recruiter/RecruiterProfilePage';
import CompanyEditor from './pages/recruiter/CompanyEditor';
import FindCandidates from './pages/recruiter/FindCandidates';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageRecruiters from './pages/admin/ManageRecruiters';
import AdminManageJobs from './pages/admin/AdminManageJobs';

// Shared
import Notifications from './pages/shared/Notifications';

function Unauthorized() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-surface-300 dark:text-surface-700">403</h1>
                <h2 className="text-2xl font-bold text-surface-900 dark:text-white mt-2">Access Denied</h2>
                <p className="text-surface-500 mt-2">You don't have permission to view this page.</p>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 3000,
                            style: {
                                borderRadius: '12px',
                                background: 'var(--toast-bg, #fff)',
                                color: 'var(--toast-color, #1e293b)',
                            },
                        }}
                    />
                    <Routes>
                        {/* ---- PUBLIC ROUTES (MainLayout) ---- */}
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<Landing />} />
                            <Route path="/jobs" element={<JobListing />} />
                            <Route path="/jobs/:id" element={<JobDetails />} />
                            <Route path="/companies" element={<CompanyListing />} />
                            <Route path="/companies/:id" element={<CompanyProfile />} />
                            <Route path="/unauthorized" element={<Unauthorized />} />

                            {/* Auth (guest only) */}
                            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
                            <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                        </Route>

                        {/* ---- CANDIDATE ROUTES (DashboardLayout) ---- */}
                        <Route element={
                            <RoleRoute allowedRoles={['ROLE_CANDIDATE']}>
                                <DashboardLayout />
                            </RoleRoute>
                        }>
                            <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
                            <Route path="/candidate/profile" element={<CandidateProfilePage />} />
                            <Route path="/candidate/applications" element={<ApplicationTracker />} />
                            <Route path="/candidate/saved-jobs" element={<SavedJobs />} />
                        </Route>

                        {/* ---- RECRUITER ROUTES (DashboardLayout) ---- */}
                        <Route element={
                            <RoleRoute allowedRoles={['ROLE_RECRUITER']}>
                                <DashboardLayout />
                            </RoleRoute>
                        }>
                            <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
                            <Route path="/recruiter/post-job" element={<PostJob />} />
                            <Route path="/recruiter/jobs" element={<ManageJobs />} />
                            <Route path="/recruiter/jobs/:jobId/applicants" element={<ViewApplicants />} />
                            <Route path="/recruiter/profile" element={<RecruiterProfilePage />} />
                            <Route path="/recruiter/company" element={<CompanyEditor />} />
                            <Route path="/recruiter/candidates" element={<FindCandidates />} />
                        </Route>

                        {/* ---- ADMIN ROUTES (DashboardLayout) ---- */}
                        <Route element={
                            <RoleRoute allowedRoles={['ROLE_ADMIN']}>
                                <DashboardLayout />
                            </RoleRoute>
                        }>
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                            <Route path="/admin/users" element={<ManageUsers />} />
                            <Route path="/admin/recruiters" element={<ManageRecruiters />} />
                            <Route path="/admin/jobs" element={<AdminManageJobs />} />
                        </Route>

                        {/* ---- SHARED AUTHENTICATED ROUTES (DashboardLayout) ---- */}
                        <Route element={
                            <ProtectedRoute>
                                <DashboardLayout />
                            </ProtectedRoute>
                        }>
                            <Route path="/notifications" element={<Notifications />} />
                        </Route>

                        {/* ---- 404 ---- */}
                        <Route path="*" element={
                            <MainLayout>
                                <div className="min-h-[80vh] flex items-center justify-center">
                                    <div className="text-center">
                                        <h1 className="text-6xl font-bold text-surface-300 dark:text-surface-700">404</h1>
                                        <h2 className="text-2xl font-bold text-surface-900 dark:text-white mt-2">Page Not Found</h2>
                                    </div>
                                </div>
                            </MainLayout>
                        } />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}
