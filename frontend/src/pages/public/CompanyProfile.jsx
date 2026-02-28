import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { companiesAPI, jobsAPI } from '../../services/api';
import { HiOutlineGlobe, HiOutlineLocationMarker, HiOutlineOfficeBuilding, HiOutlineCalendar } from 'react-icons/hi';

export default function CompanyProfile() {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await companiesAPI.getById(id);
                setCompany(res.data);
            } catch (err) { console.error(err); }
            setLoading(false);
        };
        load();
    }, [id]);

    if (loading) return <div className="max-w-4xl mx-auto px-4 py-8"><div className="skeleton h-40 w-full" /></div>;
    if (!company) return <div className="text-center py-20"><h2 className="text-2xl font-bold text-surface-500">Company not found</h2></div>;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
            <div className="glass-card p-8">
                <div className="flex items-start gap-4 mb-6">
                    <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center">
                        <span className="text-primary-600 dark:text-primary-400 font-bold text-2xl">{company.name?.charAt(0)}</span>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-surface-900 dark:text-white">{company.name}</h1>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-surface-500 dark:text-surface-400">
                            {company.industry && <span className="flex items-center gap-1"><HiOutlineOfficeBuilding className="w-4 h-4" /> {company.industry}</span>}
                            {company.location && <span className="flex items-center gap-1"><HiOutlineLocationMarker className="w-4 h-4" /> {company.location}</span>}
                            {company.website && <a href={company.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-primary-600 hover:underline"><HiOutlineGlobe className="w-4 h-4" /> Website</a>}
                            {company.foundedYear && <span className="flex items-center gap-1"><HiOutlineCalendar className="w-4 h-4" /> Founded {company.foundedYear}</span>}
                        </div>
                    </div>
                </div>
                {company.description && (
                    <div className="text-surface-600 dark:text-surface-300 whitespace-pre-wrap">{company.description}</div>
                )}
                {company.companySize && (
                    <div className="mt-4 badge-primary">{company.companySize} employees</div>
                )}
            </div>
        </div>
    );
}
