import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor — attach JWT
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — handle 401
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ====== AUTH ======
export const authAPI = {
    login: (data) => api.post('/auth/login', data),
    signup: (data) => api.post('/auth/signup', data),
};

// ====== JOBS ======
export const jobsAPI = {
    search: (params) => api.get('/jobs', { params }),
    getById: (id) => api.get(`/jobs/${id}`),
    create: (data) => api.post('/jobs', data),
    update: (id, data) => api.put(`/jobs/${id}`, data),
    delete: (id) => api.delete(`/jobs/${id}`),
};

// ====== CANDIDATE ======
export const candidateAPI = {
    getProfile: () => api.get('/candidate/profile'),
    updateProfile: (data) => api.put('/candidate/profile', data),
    uploadResume: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/candidate/resume', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    getApplications: (params) => api.get('/candidate/applications', { params }),
    getSavedJobs: (params) => api.get('/candidate/saved-jobs', { params }),
    saveJob: (jobId) => api.post(`/candidate/saved-jobs/${jobId}`),
    unsaveJob: (jobId) => api.delete(`/candidate/saved-jobs/${jobId}`),
    search: (params) => api.get('/admin/candidates', { params }),
};

// ====== APPLICATIONS ======
export const applicationsAPI = {
    apply: (data) => api.post('/applications', data),
    getJobApplicants: (jobId, params) => api.get(`/applications/job/${jobId}`, { params }),
    updateStatus: (id, status) => api.put(`/applications/${id}/status`, null, { params: { status } }),
};

// ====== RECRUITER ======
export const recruiterAPI = {
    getProfile: () => api.get('/recruiter/profile'),
    updateProfile: (data) => api.put('/recruiter/profile', data),
    updateCompany: (data) => api.put('/recruiter/company', data),
    getMyJobs: (params) => api.get('/recruiter/jobs', { params }),
    searchCandidates: (params) => api.get('/admin/candidates', { params }),
};

// ====== ADMIN ======
export const adminAPI = {
    getUsers: (params) => api.get('/admin/users', { params }),
    getUserDetail: (id) => api.get(`/admin/users/${id}`),
    suspendUser: (id) => api.put(`/admin/users/${id}/suspend`),
    getPendingRecruiters: (params) => api.get('/admin/recruiters/pending', { params }),
    approveRecruiter: (id) => api.put(`/admin/recruiters/${id}/approve`),
    deleteJob: (id) => api.delete(`/admin/jobs/${id}`),
    getStats: () => api.get('/admin/stats'),
    getCandidates: (params) => api.get('/admin/candidates', { params }),
};

// ====== NOTIFICATIONS ======
export const notificationsAPI = {
    getAll: (params) => api.get('/notifications', { params }),
    getUnreadCount: () => api.get('/notifications/unread-count'),
    markAsRead: (id) => api.put(`/notifications/${id}/read`),
};

// ====== COMPANIES ======
export const companiesAPI = {
    getAll: () => api.get('/companies'),
    getById: (id) => api.get(`/companies/${id}`),
};

export default api;
