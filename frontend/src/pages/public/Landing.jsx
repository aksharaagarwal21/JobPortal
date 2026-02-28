import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jobsAPI } from '../../services/api';
import { formatDate, formatSalary } from '../../utils';
import {
    HiOutlineSearch, HiOutlineLocationMarker, HiOutlineBriefcase,
    HiOutlineUsers, HiOutlineChartBar, HiOutlineArrowRight,
    HiOutlineStar, HiOutlineGlobe, HiOutlineShieldCheck,
    HiOutlineLightningBolt, HiOutlineSparkles, HiOutlineCheckCircle,
} from 'react-icons/hi';

const COMPANIES = [
    { name: 'Google', color: '#4285F4' },
    { name: 'Microsoft', color: '#00A4EF' },
    { name: 'Amazon', color: '#FF9900' },
    { name: 'Meta', color: '#1877F2' },
    { name: 'Netflix', color: '#E50914' },
    { name: 'Stripe', color: '#635BFF' },
    { name: 'Spotify', color: '#1DB954' },
    { name: 'Airbnb', color: '#FF5A5F' },
];

const TESTIMONIALS = [
    {
        name: 'Sarah Johnson',
        role: 'Software Engineer at Google',
        text: 'JobPortal helped me land my dream role in just 3 weeks. The application tracker and personalized job recommendations were game-changers.',
        avatar: '👩‍💻',
    },
    {
        name: 'Michael Chen',
        role: 'Product Manager at Stripe',
        text: 'As a recruiter, JobPortal streamlined our hiring pipeline. We filled 15 positions in one quarter — the quality of candidates was exceptional.',
        avatar: '👨‍💼',
    },
    {
        name: 'Emily Rodriguez',
        role: 'UX Designer at Airbnb',
        text: 'I loved how easy it was to showcase my portfolio and skills. Within a week of signing up, I had 5 interview invitations!',
        avatar: '👩‍🎨',
    },
];

export default function Landing() {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const [featuredJobs, setFeaturedJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadFeatured = async () => {
            try {
                const res = await jobsAPI.search({ page: 0, size: 6 });
                setFeaturedJobs(res.data.content || []);
            } catch (err) { console.error(err); }
        };
        loadFeatured();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (keyword) params.set('keyword', keyword);
        if (location) params.set('location', location);
        navigate(`/jobs?${params.toString()}`);
    };

    return (
        <div className="animate-fade-in">
            {/* ===== HERO SECTION ===== */}
            <section className="relative overflow-hidden">
                {/* Background with image overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900" />
                <div className="absolute inset-0 opacity-15" style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80')`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                }} />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/60 to-primary-700/70" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-50 dark:from-surface-950 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Text content */}
                        <div className="text-left">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/20">
                                <HiOutlineSparkles className="w-4 h-4 text-yellow-300" />
                                <span className="text-sm text-primary-100 font-medium">#1 Job Platform in 2026</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                                Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-cyan-300">Dream</span> Career
                            </h1>
                            <p className="mt-6 text-lg text-primary-100/90 max-w-lg">
                                Connect with world-class companies and discover opportunities that match your skills.
                                Join 100,000+ professionals who advanced their careers with us.
                            </p>

                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className="mt-8" id="hero-search-form">
                                <div className="flex flex-col sm:flex-row gap-3 p-3 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                                    <div className="flex-1 flex items-center gap-3 bg-white dark:bg-surface-800 rounded-xl px-4 py-3">
                                        <HiOutlineSearch className="w-5 h-5 text-surface-400 shrink-0" />
                                        <input type="text" placeholder="Job title, skill, or company..."
                                            value={keyword} onChange={(e) => setKeyword(e.target.value)}
                                            className="flex-1 bg-transparent outline-none text-surface-900 dark:text-surface-100 placeholder-surface-400"
                                            id="hero-keyword-input" />
                                    </div>
                                    <div className="flex-1 flex items-center gap-3 bg-white dark:bg-surface-800 rounded-xl px-4 py-3">
                                        <HiOutlineLocationMarker className="w-5 h-5 text-surface-400 shrink-0" />
                                        <input type="text" placeholder="City or remote..."
                                            value={location} onChange={(e) => setLocation(e.target.value)}
                                            className="flex-1 bg-transparent outline-none text-surface-900 dark:text-surface-100 placeholder-surface-400"
                                            id="hero-location-input" />
                                    </div>
                                    <button type="submit" className="bg-gradient-to-r from-primary-500 to-primary-400 hover:from-primary-400 hover:to-primary-300 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25"
                                        id="hero-search-btn">Search</button>
                                </div>
                            </form>

                            {/* Popular searches */}
                            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                                <span className="text-primary-200">Popular:</span>
                                {['React', 'Python', 'DevOps', 'Remote', 'Machine Learning'].map(tag => (
                                    <Link key={tag} to={`/jobs?keyword=${tag}`}
                                        className="px-3 py-1 bg-white/10 hover:bg-white/20 text-primary-100 rounded-full border border-white/10 transition-colors">
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Right: Hero Image */}
                        <div className="hidden lg:flex justify-center">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-br from-primary-400/20 to-cyan-400/20 rounded-3xl blur-xl" />
                                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80" alt="Professionals collaborating"
                                    className="relative rounded-3xl shadow-2xl shadow-primary-900/30 w-full max-w-md object-cover border border-white/10 h-[400px]" />

                                {/* Floating stat card */}
                                <div className="absolute -left-8 bottom-12 glass p-4 rounded-2xl shadow-xl animate-float border border-white/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                                            <HiOutlineCheckCircle className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold text-surface-900 dark:text-white">2,847</p>
                                            <p className="text-xs text-surface-500">Hired this month</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating job card */}
                                <div className="absolute -right-6 top-8 glass p-3 rounded-xl shadow-xl animate-float border border-white/20" style={{ animationDelay: '-2s' }}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#4285F4' }}>G</div>
                                        <div>
                                            <p className="text-sm font-semibold text-surface-900 dark:text-white">Senior Engineer</p>
                                            <p className="text-xs text-surface-500">₹15L - ₹22L</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto lg:mx-0">
                        {[
                            { icon: HiOutlineBriefcase, value: '10K+', label: 'Active Jobs' },
                            { icon: HiOutlineUsers, value: '50K+', label: 'Companies' },
                            { icon: HiOutlineChartBar, value: '100K+', label: 'Hires Made' },
                        ].map(({ icon: Icon, value, label }) => (
                            <div key={label} className="text-center lg:text-left">
                                <Icon className="w-5 h-5 text-primary-300 mx-auto lg:mx-0 mb-1" />
                                <div className="text-2xl font-bold text-white">{value}</div>
                                <div className="text-sm text-primary-200">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TRUSTED BY COMPANIES with real logos ===== */}
            <section className="py-12 bg-surface-50 dark:bg-surface-950 border-b border-surface-200 dark:border-surface-800">
                <div className="max-w-7xl mx-auto px-4">
                    <p className="text-center text-sm font-medium text-surface-400 dark:text-surface-500 mb-8 uppercase tracking-widest">
                        Trusted by teams at leading companies
                    </p>
                    <Link to="/companies" className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 hover:opacity-90 transition-opacity">
                        {COMPANIES.map(({ name, color }) => (
                            <div key={name} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer group">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform" style={{ backgroundColor: color }}>
                                    {name[0]}
                                </div>
                                <span className="text-lg font-semibold text-surface-600 dark:text-surface-400">{name}</span>
                            </div>
                        ))}
                    </Link>
                </div>
            </section>

            {/* ===== HOW IT WORKS (with images) ===== */}
            <section className="py-24 bg-white dark:bg-surface-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 mb-4">
                            How It Works
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">
                            Land your dream job in 3 steps
                        </h2>
                        <p className="mt-4 text-lg text-surface-500 dark:text-surface-400 max-w-2xl mx-auto">
                            Our platform makes it effortless to connect talent with opportunity
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: '01', title: 'Build Your Profile', desc: 'Sign up and create a professional profile with your skills, experience, resume, and portfolio links.', img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80', gradient: 'from-primary-500 to-primary-600' },
                            { step: '02', title: 'Discover Jobs', desc: 'Search and filter through thousands of curated job listings from top companies that match your skills.', img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80', gradient: 'from-primary-500 to-purple-500' },
                            { step: '03', title: 'Get Hired', desc: 'Apply with one click, track your applications in real-time, and celebrate when you land the offer.', img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=600&q=80', gradient: 'from-emerald-500 to-teal-500' },
                        ].map(({ step, title, desc, img, gradient }) => (
                            <div key={step} className="glass-card p-0 overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                                <div className="h-48 overflow-hidden bg-surface-100 dark:bg-surface-800">
                                    <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <div className={`w-10 h-10 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <span className="text-white font-bold text-sm">{step}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2">{title}</h3>
                                    <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FEATURED JOBS ===== */}
            {featuredJobs.length > 0 && (
                <section className="py-24 bg-surface-50 dark:bg-surface-950">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 mb-3">
                                    <HiOutlineLightningBolt className="w-4 h-4 mr-1" /> Fresh Listings
                                </span>
                                <h2 className="text-3xl font-bold text-surface-900 dark:text-white">Featured Jobs</h2>
                            </div>
                            <Link to="/jobs" className="hidden sm:flex items-center gap-1 text-primary-600 hover:text-primary-500 font-semibold transition-colors">
                                View all <HiOutlineArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredJobs.map((job) => (
                                <Link key={job.id} to={`/jobs/${job.id}`}
                                    className="glass-card p-6 group hover:scale-[1.02] hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300">
                                    <div className="flex items-start gap-4 mb-4">
                                        {job.companyLogoUrl ? (
                                            <img src={job.companyLogoUrl} alt={job.companyName}
                                                className="w-12 h-12 rounded-xl object-contain bg-white dark:bg-surface-800 p-1 border border-surface-200 dark:border-surface-700 shrink-0" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                                {(job.companyName || 'C')[0]}
                                            </div>
                                        )}
                                        <div className="min-w-0">
                                            <h3 className="font-semibold text-surface-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                                                {job.title}
                                            </h3>
                                            <p className="text-sm text-surface-500 truncate">{job.companyName || 'Company'}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="px-2.5 py-0.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                                            {job.jobType?.replace('_', ' ')}
                                        </span>
                                        <span className="px-2.5 py-0.5 bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 text-xs font-medium rounded-full">
                                            {job.location}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                            {formatSalary(job.salaryMin, job.salaryMax, job.currency) || 'Competitive'}
                                        </p>
                                        <p className="text-xs text-surface-400">{formatDate(job.createdAt)}</p>
                                    </div>
                                    {job.skills?.length > 0 && (
                                        <div className="mt-3 pt-3 border-t border-surface-100 dark:border-surface-800 flex flex-wrap gap-1.5">
                                            {job.skills.slice(0, 3).map(s => (
                                                <span key={s} className="px-2 py-0.5 bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400 text-xs rounded">
                                                    {s}
                                                </span>
                                            ))}
                                            {job.skills.length > 3 && (
                                                <span className="text-xs text-surface-400">+{job.skills.length - 3}</span>
                                            )}
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-8 text-center sm:hidden">
                            <Link to="/jobs" className="btn-primary">View All Jobs</Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ===== WHY CHOOSE US ===== */}
            <section className="py-24 bg-white dark:bg-surface-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/30 dark:bg-primary-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">Why professionals choose JobPortal</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: HiOutlineShieldCheck, title: 'Verified Companies', desc: 'Every company is verified before posting. No scams, no spam.' },
                            { icon: HiOutlineLightningBolt, title: 'Instant Apply', desc: 'Apply to any job with one click. Your profile does the talking.' },
                            { icon: HiOutlineStar, title: 'Smart Matching', desc: 'AI-powered recommendations based on your skills and preferences.' },
                            { icon: HiOutlineGlobe, title: 'Remote First', desc: 'Thousands of remote and hybrid jobs from companies worldwide.' },
                        ].map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="text-center p-6 rounded-2xl hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors duration-300 group">
                                <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <Icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                                </div>
                                <h3 className="font-bold text-surface-900 dark:text-white mb-2">{title}</h3>
                                <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS ===== */}
            <section className="py-24 bg-surface-50 dark:bg-surface-950 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-100/20 dark:bg-cyan-900/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-surface-900 dark:text-white">What our users say</h2>
                        <p className="mt-3 text-surface-500 dark:text-surface-400">Join thousands of satisfied professionals</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map(({ name, role, text, avatar }) => (
                            <div key={name} className="glass-card p-8 hover:scale-[1.02] transition-all duration-300">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <HiOutlineStar key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-surface-600 dark:text-surface-300 leading-relaxed mb-6 italic">"{text}"</p>
                                <div className="flex items-center gap-3 pt-4 border-t border-surface-200 dark:border-surface-700">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-2xl">
                                        {avatar}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-surface-900 dark:text-white">{name}</p>
                                        <p className="text-sm text-surface-500 dark:text-surface-400">{role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="py-24 bg-white dark:bg-surface-900">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="relative overflow-hidden rounded-3xl p-12 sm:p-16 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
                        <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80')`,
                            backgroundSize: 'cover', backgroundPosition: 'center',
                        }} />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl" />
                        <div className="relative">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                Ready to take the next step?
                            </h2>
                            <p className="text-primary-100 mb-8 max-w-xl mx-auto text-lg">
                                Join 100,000+ professionals who found their dream career through JobPortal. Free forever.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/signup" className="bg-white text-primary-700 hover:bg-primary-50 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg text-base">
                                    Get Started Free
                                </Link>
                                <Link to="/jobs" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-base">
                                    Browse Jobs
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
