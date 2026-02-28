import { useState, useEffect } from 'react';
import { recruiterAPI } from '../../services/api';
import {
    HiOutlineSearch, HiOutlineLocationMarker, HiOutlineAcademicCap,
    HiOutlineBriefcase, HiOutlineMail, HiOutlineStar,
    HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineExternalLink,
} from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function FindCandidates() {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const [skill, setSkill] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [expanded, setExpanded] = useState(null);
    const [shortlisted, setShortlisted] = useState(new Set());
    const [searched, setSearched] = useState(false);

    const search = async (p = 0) => {
        setLoading(true);
        setSearched(true);
        try {
            const params = { page: p, size: 12 };
            if (keyword.trim()) params.keyword = keyword.trim();
            if (location.trim()) params.location = location.trim();
            if (skill.trim()) params.skill = skill.trim();
            const res = await recruiterAPI.searchCandidates(params);
            setCandidates(res.data.content || []);
            setTotalPages(res.data.totalPages || 0);
            setPage(p);
        } catch (err) {
            console.error(err);
            toast.error('Failed to search candidates');
        }
        setLoading(false);
    };

    useEffect(() => { search(); }, []);

    const handleSearch = (e) => { e.preventDefault(); search(0); };
    const toggleShortlist = (id) => {
        setShortlisted(prev => {
            const next = new Set(prev);
            if (next.has(id)) { next.delete(id); toast.success('Removed from shortlist'); }
            else { next.add(id); toast.success('Added to shortlist!'); }
            return next;
        });
    };

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Find Candidates</h1>
                <p className="text-surface-500 dark:text-surface-400 mt-1">Browse and shortlist top talent for your openings</p>
            </div>

            {/* Search Filters */}
            <form onSubmit={handleSearch} className="glass-card p-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="relative">
                        <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                        <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Name, headline, skill..."
                            className="input-field pl-10" id="candidate-keyword" />
                    </div>
                    <div className="relative">
                        <HiOutlineLocationMarker className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                            placeholder="Location..."
                            className="input-field pl-10" id="candidate-location" />
                    </div>
                    <div className="relative">
                        <HiOutlineAcademicCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                        <input type="text" value={skill} onChange={(e) => setSkill(e.target.value)}
                            placeholder="Skill (e.g. React, Python)..."
                            className="input-field pl-10" id="candidate-skill" />
                    </div>
                    <button type="submit" className="btn-primary" id="candidate-search-btn">
                        <HiOutlineSearch className="w-5 h-5 mr-2" /> Search
                    </button>
                </div>
            </form>

            {/* Shortlist Counter */}
            {shortlisted.size > 0 && (
                <div className="mb-4 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium">
                        <HiOutlineStar className="w-4 h-4" /> {shortlisted.size} Shortlisted
                    </span>
                </div>
            )}

            {/* Results */}
            {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-56 w-full rounded-2xl" />)}
                </div>
            ) : candidates.length === 0 ? (
                <div className="text-center py-20">
                    <HiOutlineSearch className="w-16 h-16 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-surface-700 dark:text-surface-300 mb-1">
                        {searched ? 'No candidates found' : 'Search for candidates'}
                    </h3>
                    <p className="text-surface-500 text-sm">Try adjusting your search filters</p>
                </div>
            ) : (
                <>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {candidates.map((c) => (
                            <div key={c.id} className={`glass-card p-5 hover:scale-[1.02] transition-all duration-300 ${shortlisted.has(c.id) ? 'ring-2 ring-emerald-500/50 border-emerald-300 dark:border-emerald-700' : ''}`}>
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                        {(c.fullName || 'U')[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-surface-900 dark:text-white truncate">{c.fullName}</h3>
                                        <p className="text-sm text-primary-600 dark:text-primary-400 truncate">{c.headline || 'No headline'}</p>
                                    </div>
                                    <button onClick={() => toggleShortlist(c.id)}
                                        className={`p-1.5 rounded-lg transition-colors ${shortlisted.has(c.id) ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30' : 'text-surface-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'}`}>
                                        <HiOutlineStar className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-2 text-sm text-surface-500 dark:text-surface-400 mb-3">
                                    {c.location && (
                                        <div className="flex items-center gap-1.5">
                                            <HiOutlineLocationMarker className="w-4 h-4 shrink-0" /> {c.location}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1.5">
                                        <HiOutlineBriefcase className="w-4 h-4 shrink-0" /> {c.experienceYears || 0} years exp.
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <HiOutlineMail className="w-4 h-4 shrink-0 text-surface-400" />
                                        <span className="truncate">{c.email}</span>
                                    </div>
                                </div>

                                {/* Skills */}
                                {c.skills?.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {(Array.from(c.skills || [])).slice(0, 4).map(s => (
                                            <span key={s} className="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                                                {s}
                                            </span>
                                        ))}
                                        {c.skills.length > 4 && (
                                            <span className="text-xs text-surface-400">+{c.skills.length - 4}</span>
                                        )}
                                    </div>
                                )}

                                {/* Expand/Collapse */}
                                <button onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                                    className="text-xs text-primary-600 hover:text-primary-500 font-medium flex items-center gap-1 mb-2">
                                    {expanded === c.id ? <><HiOutlineChevronUp className="w-3.5 h-3.5" /> Less</> : <><HiOutlineChevronDown className="w-3.5 h-3.5" /> More Details</>}
                                </button>

                                {expanded === c.id && (
                                    <div className="text-xs text-surface-500 dark:text-surface-400 space-y-2 pt-2 border-t border-surface-100 dark:border-surface-800">
                                        {c.summary && <p className="line-clamp-3">{c.summary}</p>}
                                        <div className="flex flex-wrap gap-2">
                                            {c.linkedinUrl && (
                                                <a href={c.linkedinUrl} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline flex items-center gap-1">
                                                    <HiOutlineExternalLink className="w-3 h-3" /> LinkedIn
                                                </a>
                                            )}
                                            {c.githubUrl && (
                                                <a href={c.githubUrl} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline flex items-center gap-1">
                                                    <HiOutlineExternalLink className="w-3 h-3" /> GitHub
                                                </a>
                                            )}
                                            {c.portfolioUrl && (
                                                <a href={c.portfolioUrl} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline flex items-center gap-1">
                                                    <HiOutlineExternalLink className="w-3 h-3" /> Portfolio
                                                </a>
                                            )}
                                            {c.resumeUrl && (
                                                <a href={c.resumeUrl} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline flex items-center gap-1">
                                                    <HiOutlineExternalLink className="w-3 h-3" /> Resume
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-6 flex justify-center gap-2">
                            <button onClick={() => search(Math.max(0, page - 1))} disabled={page === 0} className="btn-secondary text-sm">Previous</button>
                            <span className="flex items-center px-4 text-sm text-surface-500">Page {page + 1} of {totalPages}</span>
                            <button onClick={() => search(page + 1)} disabled={page >= totalPages - 1} className="btn-secondary text-sm">Next</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
