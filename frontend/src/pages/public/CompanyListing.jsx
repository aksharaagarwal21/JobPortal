import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { companiesAPI } from '../../services/api';
import { HiOutlineOfficeBuilding, HiOutlineLocationMarker, HiOutlineGlobe, HiOutlineCalendar, HiOutlineUserGroup } from 'react-icons/hi';

export default function CompanyListing() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await companiesAPI.getAll();
                setCompanies(res.data || []);
            } catch (err) { console.error(err); }
            setLoading(false);
        };
        load();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-surface-900 dark:text-white">Top Companies</h1>
                <p className="text-surface-500 dark:text-surface-400 mt-2">
                    Discover amazing companies that are actively hiring
                </p>
            </div>

            {/* Company Grid */}
            {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="glass-card p-6 space-y-4">
                            <div className="skeleton h-12 w-12 rounded-xl" />
                            <div className="skeleton h-6 w-3/4" />
                            <div className="skeleton h-4 w-1/2" />
                            <div className="skeleton h-4 w-full" />
                        </div>
                    ))}
                </div>
            ) : companies.length === 0 ? (
                <div className="text-center py-20">
                    <HiOutlineOfficeBuilding className="w-16 h-16 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-surface-500 dark:text-surface-400">No companies found</h3>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {companies.map((company) => (
                        <Link
                            key={company.id}
                            to={`/companies/${company.id}`}
                            className="glass-card p-6 hover:scale-[1.02] hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 group"
                            id={`company-card-${company.id}`}
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <span className="text-white font-bold text-xl">
                                        {company.name?.charAt(0) || 'C'}
                                    </span>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-lg text-surface-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition truncate">
                                        {company.name}
                                    </h3>
                                    {company.industry && (
                                        <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">{company.industry}</span>
                                    )}
                                </div>
                            </div>

                            {company.description && (
                                <p className="text-sm text-surface-500 dark:text-surface-400 line-clamp-2 mb-4 leading-relaxed">
                                    {company.description}
                                </p>
                            )}

                            <div className="space-y-2 text-sm text-surface-500 dark:text-surface-400">
                                {company.location && (
                                    <div className="flex items-center gap-2">
                                        <HiOutlineLocationMarker className="w-4 h-4 shrink-0" />
                                        <span className="truncate">{company.location}</span>
                                    </div>
                                )}
                                {company.companySize && (
                                    <div className="flex items-center gap-2">
                                        <HiOutlineUserGroup className="w-4 h-4 shrink-0" />
                                        <span>{company.companySize} employees</span>
                                    </div>
                                )}
                                {company.foundedYear && (
                                    <div className="flex items-center gap-2">
                                        <HiOutlineCalendar className="w-4 h-4 shrink-0" />
                                        <span>Founded {company.foundedYear}</span>
                                    </div>
                                )}
                            </div>

                            {company.website && (
                                <div className="mt-4 pt-3 border-t border-surface-100 dark:border-surface-800">
                                    <span className="flex items-center gap-1.5 text-xs text-primary-600 dark:text-primary-400">
                                        <HiOutlineGlobe className="w-3.5 h-3.5" />
                                        {company.website.replace(/^https?:\/\//, '')}
                                    </span>
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
