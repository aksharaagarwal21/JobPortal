import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { jobsAPI } from '../../services/api';
import { formatDate, formatSalary, JOB_TYPES, EXPERIENCE_LEVELS } from '../../utils';
import { HiOutlineSearch, HiOutlineLocationMarker, HiOutlineBriefcase, HiOutlineClock, HiOutlineCurrencyRupee } from 'react-icons/hi';

export default function JobListing() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState({
        keyword: searchParams.get('keyword') || '',
        location: searchParams.get('location') || '',
        jobType: searchParams.get('jobType') || '',
        experienceLevel: searchParams.get('experienceLevel') || '',
    });

    useEffect(() => {
        fetchJobs();
    }, [page]);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const params = { page, size: 12 };
            if (filters.keyword) params.keyword = filters.keyword;
            if (filters.location) params.location = filters.location;
            if (filters.jobType) params.jobType = filters.jobType;
            if (filters.experienceLevel) params.experienceLevel = filters.experienceLevel;
            const res = await jobsAPI.search(params);
            setJobs(res.data.content || []);
            setTotalPages(res.data.totalPages || 0);
        } catch (err) {
            console.error('Failed to fetch jobs', err);
            setJobs([]);
        }
        setLoading(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(0);
        fetchJobs();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-8">Find Jobs</h1>

            {/* Search & Filters */}
            <form onSubmit={handleSearch} className="glass-card p-6 mb-8" id="job-search-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="relative">
                        <HiOutlineSearch className="absolute left-3 top-3 w-5 h-5 text-surface-400" />
                        <input type="text" placeholder="Keywords..." value={filters.keyword}
                            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                            className="input-field pl-10" id="filter-keyword" />
                    </div>
                    <div className="relative">
                        <HiOutlineLocationMarker className="absolute left-3 top-3 w-5 h-5 text-surface-400" />
                        <input type="text" placeholder="Location..." value={filters.location}
                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                            className="input-field pl-10" id="filter-location" />
                    </div>
                    <select value={filters.jobType} onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                        className="input-field" id="filter-job-type">
                        <option value="">All Job Types</option>
                        {JOB_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                    <select value={filters.experienceLevel} onChange={(e) => setFilters({ ...filters, experienceLevel: e.target.value })}
                        className="input-field" id="filter-exp-level">
                        <option value="">All Levels</option>
                        {EXPERIENCE_LEVELS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                    </select>
                </div>
                <div className="mt-4 flex justify-end">
                    <button type="submit" className="btn-primary" id="filter-search-btn">Search Jobs</button>
                </div>
            </form>

            {/* Job Cards */}
            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="glass-card p-6 space-y-4">
                            <div className="skeleton h-6 w-3/4" />
                            <div className="skeleton h-4 w-1/2" />
                            <div className="skeleton h-4 w-full" />
                            <div className="skeleton h-4 w-2/3" />
                        </div>
                    ))}
                </div>
            ) : jobs.length === 0 ? (
                <div className="text-center py-20">
                    <HiOutlineBriefcase className="w-16 h-16 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-surface-500 dark:text-surface-400">No jobs found</h3>
                    <p className="text-surface-400 dark:text-surface-500 mt-2">Try adjusting your search filters</p>
                </div>
            ) : (
                <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <Link key={job.id} to={`/jobs/${job.id}`}
                                className="glass-card p-6 hover:scale-[1.02] transition-all duration-300 group" id={`job-card-${job.id}`}>
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">
                                            {job.companyName?.charAt(0) || 'J'}
                                        </span>
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-surface-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition truncate">
                                            {job.title}
                                        </h3>
                                        <p className="text-sm text-surface-500 dark:text-surface-400 truncate">
                                            {job.companyName || 'Company'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-surface-500 dark:text-surface-400">
                                    {job.location && (
                                        <div className="flex items-center gap-2">
                                            <HiOutlineLocationMarker className="w-4 h-4" />
                                            <span className="truncate">{job.location}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <HiOutlineBriefcase className="w-4 h-4" />
                                        <span>{job.jobType?.replace('_', ' ')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <HiOutlineCurrencyRupee className="w-4 h-4" />
                                        <span>{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
                                    </div>
                                </div>

                                {job.skills && job.skills.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {job.skills.slice(0, 3).map((s) => (
                                            <span key={s} className="badge-primary text-xs">{s}</span>
                                        ))}
                                        {job.skills.length > 3 && <span className="badge text-xs text-surface-400">+{job.skills.length - 3}</span>}
                                    </div>
                                )}

                                <div className="mt-4 flex items-center gap-2 text-xs text-surface-400">
                                    <HiOutlineClock className="w-3.5 h-3.5" />
                                    <span>{formatDate(job.createdAt)}</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-8 flex justify-center gap-2">
                            <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}
                                className="btn-secondary text-sm disabled:opacity-50">Previous</button>
                            <span className="flex items-center px-4 text-sm text-surface-500">
                                Page {page + 1} of {totalPages}
                            </span>
                            <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1}
                                className="btn-secondary text-sm disabled:opacity-50">Next</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
