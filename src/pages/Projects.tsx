import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Users,
  User,
  Eye,
  Briefcase,
  Building,
  Filter,
  UserPlus,
  Gift,
  Award,
  SlidersHorizontal,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Projects() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Tabs: hire | apply | sponsor | recognition
  const [activeTab, setActiveTab] = useState<'hire' | 'add' | 'apply' | 'sponsor' | 'recognition'>(
    user?.role === 'creator' ? 'apply' : 'hire'
  );

  // Radio between search and dropdown: talents | teams | agencies (used in Hire tab)
  const [entityType, setEntityType] = useState<'talents' | 'teams' | 'agencies'>('talents');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortField, setSortField] = useState<'all' | 'price' | 'rating' | 'popularity' | 'reviews'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const categories = [
    'all',
    'acting',
    'modeling',
    'digital-marketing',
    'event-management',
    'brand-ambassador',
    'content-creation',
    'photography',
    'design',
    'film-video-production',
    'audio-production'
  ];

  function maskNumber(n: number): string {
    const digits = String(Math.max(1, Math.abs(Math.trunc(n)))).length;
    return '-'.repeat(digits);
  }
  function maskRating(r: number): string {
    return '-'.repeat((Number.isFinite(r) ? r : 0).toFixed(1).length);
  }

  // Jobs/Projects (Apply tab) - now stateful so Add can insert
  const [projects, setProjects] = useState<any[]>([
    {
      id: 1,
      title: 'Brand Ambassador for Tech Startup',
      company: 'Innovate Inc.',
      location: 'Remote',
      budget: 'UGX 1,500,000',
      description:
        'Looking for an energetic brand ambassador to represent our new app. Must have strong social media presence.',
      skills: ['Social Media Marketing', 'Brand Representation', 'Content Creation'],
      type: 'gig'
    },
    {
      id: 2,
      title: 'Lead Actor for Short Film',
      company: 'Starlight Pictures',
      location: 'Kampala, Uganda',
      budget: 'UGX 2,000,000',
      description: 'Seeking a lead actor for a drama short film. Acting experience required.',
      skills: ['Acting', 'Drama', 'Improvisation'],
      type: 'casting'
    }
  ]);

  // Talents (Hire tab) - stateful so Add can insert new providers
  const [talents, setTalents] = useState<any[]>([
    {
      id: 1,
      name: 'Emma Wilson',
      title: 'Digital Marketing Specialist',
      category: 'digital-marketing',
      location: 'Kampala, Uganda',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 320000,
      avatar:
        'https://images.pexels.com/photos/31422830/pexels-photo-31422830.png?auto=compress&cs=tinysrgb&w=150',
      skills: ['Social Media Marketing', 'SEO', 'Content Strategy', 'Analytics'],
      completedProjects: 45,
      responseTime: '2 hours',
      description:
        'Experienced digital marketer with 5+ years helping brands grow their online presence.',
      certifications: ['Google Ads Certified', 'Facebook Blueprint', 'FlourishTalents Digital Marketing'],
      portfolio: {
        projects: 12,
        totalViews: 15420
      }
    },
    {
      id: 2,
      name: 'Ruby Nesda',
      title: 'Professional Model & Actress',
      category: 'modeling',
      location: 'Entebbe, Uganda',
      rating: 4.8,
      reviews: 89,
      hourlyRate: 570000,
      avatar:
        'https://images.pexels.com/photos/6311651/pexels-photo-6311651.jpeg?auto=compress&cs=tinysrgb&w=400',
      skills: ['Fashion Modeling', 'Commercial Acting', 'Brand Representation', 'Social Media'],
      completedProjects: 32,
      responseTime: '1 hour',
      description:
        'Professional model and actress with experience in fashion, commercial, and brand campaigns.',
      certifications: ['SAG-AFTRA Member', 'Professional Model Certification'],
      portfolio: {
        projects: 28,
        totalViews: 32100
      }
    },
    {
      id: 3,
      name: 'Maya Chen',
      title: 'Event Management Expert',
      category: 'event-management',
      location: 'Jinja, Uganda',
      rating: 5.0,
      reviews: 156,
      hourlyRate: 360000,
      avatar:
        'https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg?auto=compress&cs=tinysrgb&w=150',
      skills: ['Corporate Events', 'Wedding Planning', 'Vendor Management', 'Budget Planning'],
      completedProjects: 78,
      responseTime: '30 minutes',
      description: 'Award-winning event planner specializing in corporate and luxury events.',
      certifications: ['Certified Meeting Professional', 'Event Planning Certification'],
      portfolio: {
        projects: 45,
        totalViews: 28900
      }
    }
  ]);

  // Agencies - stateful
  const [agencies, setAgencies] = useState<any[]>([
    {
      id: 1,
      name: 'Creative Collective Agency',
      type: 'Full-Service Creative Agency',
      category: 'design',
      location: 'Kampala, Uganda',
      rating: 4.9,
      reviews: 234,
      teamSize: 12,
      startingRate: 450000,
      logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150',
      services: ['Brand Design', 'Web Development', 'Marketing Strategy', 'Content Creation'],
      completedProjects: 189,
      responseTime: '4 hours',
      description: 'Award-winning creative agency specializing in brand identity and digital experiences.',
      specialties: ['Tech Startups', 'E-commerce', 'Healthcare', 'Finance']
    },
    {
      id: 2,
      name: 'Elite Marketing Solutions',
      type: 'Digital Marketing Agency',
      category: 'digital-marketing',
      location: 'Mbarara, Uganda',
      rating: 4.8,
      reviews: 178,
      teamSize: 8,
      startingRate: 360000,
      logo: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=150',
      services: ['PPC Management', 'SEO', 'Social Media', 'Email Marketing'],
      completedProjects: 156,
      responseTime: '2 hours',
      description: 'Results-driven marketing agency with proven track record of ROI growth.',
      specialties: ['SaaS', 'E-commerce', 'Local Business', 'B2B']
    }
  ]);

  // Teams - stateful
  const [teams, setTeams] = useState<any[]>([
    {
      id: 1,
      name: 'Film Crew Kampala',
      type: 'Production Team',
      category: 'film-video-production',
      location: 'Kampala, Uganda',
      rating: 4.7,
      reviews: 98,
      teamSize: 6,
      startingRate: 280000,
      logo: 'https://images.pexels.com/photos/269140/pexels-photo-269140.jpeg?auto=compress&cs=tinysrgb&w=150',
      services: ['Cinematography', 'Lighting', 'Sound'],
      completedProjects: 72,
      responseTime: '3 hours',
      description: 'Experienced film crew available for short and feature productions.',
      specialties: ['Short Films', 'Commercials', 'Music Videos']
    },
    {
      id: 2,
      name: 'Event Crew Uganda',
      type: 'Event Production Team',
      category: 'event-management',
      location: 'Kampala, Uganda',
      rating: 4.8,
      reviews: 120,
      teamSize: 10,
      startingRate: 320000,
      logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=150',
      services: ['Stage Setup', 'Sound', 'Lighting', 'Coordination'],
      completedProjects: 150,
      responseTime: '2 hours',
      description: 'Full-service event crew for conferences, concerts and launches.',
      specialties: ['Corporate', 'Concerts', 'Launches']
    },
    {
      id: 3,
      name: 'Prime Photography Studio',
      type: 'Photography Studio',
      category: 'photography',
      location: 'Kampala, Uganda',
      rating: 4.8,
      reviews: 140,
      teamSize: 7,
      startingRate: 300000,
      logo: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=150',
      services: ['Portraits', 'Product Photography', 'Studio Lighting'],
      completedProjects: 210,
      responseTime: '1 hour',
      description: 'Professional studio offering commercial and portrait photography services.',
      specialties: ['Portraits', 'E-commerce', 'Editorial']
    },
    {
      id: 4,
      name: 'SoundForge Studios',
      type: 'Recording Studio',
      category: 'audio-production',
      location: 'Kampala, Uganda',
      rating: 4.9,
      reviews: 200,
      teamSize: 5,
      startingRate: 250000,
      logo: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=150',
      services: ['Recording', 'Mixing', 'Mastering', 'Voiceovers'],
      completedProjects: 320,
      responseTime: '2 hours',
      description: 'State-of-the-art recording studio for artists, ads and film audio.',
      specialties: ['Music Production', 'Voice Over', 'Podcast']
    },
    {
      id: 5,
      name: 'Aurora Records',
      type: 'Record Label',
      category: 'record-label',
      location: 'Kampala, Uganda',
      rating: 4.6,
      reviews: 88,
      teamSize: 9,
      startingRate: 0,
      logo: 'https://images.pexels.com/photos/164853/pexels-photo-164853.jpeg?auto=compress&cs=tinysrgb&w=150',
      services: ['A&R', 'Distribution', 'Artist Management', 'Marketing'],
      completedProjects: 95,
      responseTime: '4 hours',
      description: 'Independent record label developing and distributing music projects.',
      specialties: ['Afrobeats', 'Hip-Hop', 'Pop']
    }
  ]);

  const filteredTalents = talents.filter((talent) => {
    const matchesCategory = selectedCategory === 'all' || talent.category === selectedCategory;
    const matchesSearch =
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredTeams = teams.filter((team) => {
    const matchesCategory = selectedCategory === 'all' || team.category === selectedCategory;
    const matchesSearch =
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.services.some((service) => service.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredAgencies = agencies.filter((agency) => {
    const matchesCategory = selectedCategory === 'all' || agency.category === selectedCategory;
    const matchesSearch =
      agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.services.some((service) => service.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      project.type === selectedCategory ||
      project.skills.some((s) => s.toLowerCase().includes(selectedCategory.replace(/-/g, ' ')));
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const parseUGX = (s: string) => Number(s.replace(/[^0-9]/g, '')) || 0;

  const sortItems = <T,>(items: T[], type: 'talent' | 'team' | 'agency' | 'project') => {
    const getMetric = (it: any) => {
      switch (sortField) {
        case 'price':
          if (type === 'talent') return it.hourlyRate || 0;
          if (type === 'project') return parseUGX(it.budget) || 0;
          return it.startingRate || 0;
        case 'rating':
          return it.rating || 0;
        case 'popularity':
          return (it.portfolio?.totalViews || it.completedProjects || it.reviews || 0) as number;
        case 'reviews':
          return it.reviews || 0;
        case 'all':
          return (it.portfolio?.totalViews || it.completedProjects || it.reviews || 0) as number;
        default:
          return 0;
      }
    };
    return items.slice().sort((a, b) => (sortOrder === 'asc' ? getMetric(a) - getMetric(b) : getMetric(b) - getMetric(a)));
  };

  const sortedTalents = sortItems(filteredTalents, 'talent');
  const sortedTeams = sortItems(filteredTeams, 'team');
  const sortedAgencies = sortItems(filteredAgencies, 'agency');
  const sortedProjects = sortItems(filteredProjects, 'project');

  const sponsorPackages = [
    {
      id: 1,
      project: 'Community Film Challenge',
      tiers: [
        { name: 'Bronze', amount: 'UGX 500,000', perks: ['Logo mention', 'Social shoutout'] },
        { name: 'Silver', amount: 'UGX 1,500,000', perks: ['Logo & link', '2 tickets', 'Social shoutout'] },
        { name: 'Gold', amount: 'UGX 3,500,000', perks: ['Hero placement', '5 tickets', 'Booth space'] }
      ]
    },
    {
      id: 2,
      project: 'Emerging Artist EP',
      tiers: [
        { name: 'Associate', amount: 'UGX 800,000', perks: ['Credits mention'] },
        { name: 'Partner', amount: 'UGX 2,000,000', perks: ['Credits + social pack'] },
        { name: 'Title Sponsor', amount: 'UGX 5,000,000', perks: ['Title bill', 'Launch stage mention'] }
      ]
    }
  ];

  const recognitions = [
    {
      id: 1,
      title: 'Best Short Film 2025',
      org: 'FlourishTalents Awards',
      summary: '“The Last Stand” by Starlight Pictures',
      image:
        'https://images.pexels.com/photos/269140/pexels-photo-269140.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Outstanding Brand Campaign',
      org: 'Creatives Guild',
      summary: 'Innovate Inc. Ambassador Program',
      image:
        'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const handleApply = (projectId: number) => {
    alert(`Applied to project ${projectId}`);
  };

  const handleHire = (id: number, type: 'talent' | 'team' | 'agency') => {
    if (!user) {
      alert('Please sign up or sign in to proceed.');
      navigate('/signin');
      return;
    }
    if (user.role === 'creator') {
      alert('Creators cannot hire. Switch to Apply tab to apply to jobs.');
      return;
    }
    if (user.tier === 'free') {
      alert('Upgrade to Premium to hire talents, teams and agencies!');
      return;
    }
    alert(`Hiring request sent! The ${type} will be notified and will respond soon.`);
  };

  const handleViewPortfolio = () => {
    alert('Opening portfolio in new window...');
  };

  // Inline Add Job form component
  function AddJobForm({ onCreate }: { onCreate: (job: any) => void }) {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('Remote');
    const [budget, setBudget] = useState('UGX 0');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState('');

    const handleSubmit = (e: any) => {
      e.preventDefault();
      const job = {
        title: title || 'Untitled project',
        company: company || 'Unknown',
        location: location || 'Remote',
        budget: budget || 'UGX 0',
        description: description || '',
        skills: skills
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        type: 'gig'
      };
      onCreate(job);
      setTitle('');
      setCompany('');
      setLocation('Remote');
      setBudget('UGX 0');
      setDescription('');
      setSkills('');
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Project title" className="px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent" />
          <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent" />
          <input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget (eg. UGX 1,000,000)" className="px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent" />
          <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Skills (comma separated)" className="px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent" />
        </div>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the job or brief" className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent h-28" />
        <div className="flex justify-end">
          <button type="submit" className="px-6 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl">Post Job</button>
        </div>
      </form>
    );
  }

  // Inline Add Provider form
  function AddProviderForm({ onCreate }: { onCreate: (provider: any, kind: 'talents' | 'teams' | 'agencies') => void }) {
    const [kind, setKind] = useState<'talents' | 'teams' | 'agencies'>('talents');
    const [name, setName] = useState('');
    const [titleOrType, setTitleOrType] = useState('');
    const [categoryVal, setCategoryVal] = useState('digital-marketing');
    const [location, setLocation] = useState('Remote');
    const [rate, setRate] = useState('0');
    const [description, setDescription] = useState('');
    const [services, setServices] = useState('');
    const [avatar, setAvatar] = useState('');

    const handleSubmit = (e: any) => {
      e.preventDefault();
      const provider: any = {
        name: name || 'Unnamed',
        location: location || 'Remote',
        category: categoryVal,
        description: description || '',
        avatar: avatar || '',
        services: services
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      };
      if (kind === 'talents') {
        provider.title = titleOrType || 'Service Provider';
        provider.hourlyRate = Number(rate) || 0;
        provider.rating = 0;
        provider.reviews = 0;
        provider.completedProjects = 0;
        provider.portfolio = { projects: 0, totalViews: 0 };
      } else if (kind === 'teams') {
        provider.type = titleOrType || 'Team';
        provider.teamSize = Number(rate) || 1;
        provider.startingRate = 0;
      } else {
        provider.type = titleOrType || 'Agency';
        provider.startingRate = Number(rate) || 0;
        provider.teamSize = Number(rate) || 1;
      }

      onCreate(provider, kind);
      // reset
      setKind('talents');
      setName('');
      setTitleOrType('');
      setCategoryVal('digital-marketing');
      setLocation('Remote');
      setRate('0');
      setDescription('');
      setServices('');
      setAvatar('');
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3">
          <label className="text-gray-400">Add as</label>
          <select value={kind} onChange={(e) => setKind(e.target.value as any)} className="px-3 py-2 glass-effect rounded-xl border border-white/20 text-white bg-transparent">
            <option value="talents">Talent</option>
            <option value="teams">Team</option>
            <option value="agencies">Agency</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={kind === 'talents' ? 'Full name' : 'Name'} className="px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent" />
          <input value={titleOrType} onChange={(e) => setTitleOrType(e.target.value)} placeholder={kind === 'talents' ? 'Title (e.g. Photographer)' : 'Type/Role'} className="px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent" />
          <input value={rate} onChange={(e) => setRate(e.target.value)} placeholder={kind === 'teams' ? 'Team size' : 'Hourly rate'} className="px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent" />
          <input value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder={kind === 'agencies' ? 'Logo URL' : 'Avatar URL'} className="px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent" />
        </div>
        <input value={services} onChange={(e) => setServices(e.target.value)} placeholder="Services (comma separated)" className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent h-28" />
        <div className="flex justify-end">
          <button type="submit" className="px-6 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl">Add Profile</button>
        </div>
      </form>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-playfair font-bold text-white mb-2">Projects</h1>
            <p className="text-gray-300">Manage your projects</p>
          </div>
          <div className="hidden md:flex items-center gap-3 pr-2">
            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as 'all' | 'price' | 'rating' | 'popularity' | 'reviews')}
                className="pl-10 pr-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
              >
                <option value="all" className="bg-gray-800">All</option>
                <option value="price" className="bg-gray-800">Sort by cost</option>
                <option value="rating" className="bg-gray-800">Sort by ratings</option>
                <option value="popularity" className="bg-gray-800">Sort by popularity</option>
                <option value="reviews" className="bg-gray-800">Sort by reviews</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortOrder('asc')}
                aria-pressed={sortOrder === 'asc'}
                className={`${sortOrder === 'asc' ? 'bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white' : 'glass-effect text-gray-300 hover:text-white'} p-2 rounded-lg transition-colors`}
                title="Ascending"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 5l6 6H6l6-6z"/></svg>
              </button>
              <button
                onClick={() => setSortOrder('desc')}
                aria-pressed={sortOrder === 'desc'}
                className={`${sortOrder === 'desc' ? 'bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white' : 'glass-effect text-gray-300 hover:text-white'} p-2 rounded-lg transition-colors`}
                title="Descending"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 19l-6-6h12l-6 6z"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Top Tabs: Hire | Apply | Sponsor | Recognition */}
        <div className="flex space-x-1 glass-effect p-2 rounded-xl overflow-x-auto whitespace-nowrap md:w-full mb-8">
          <button
            onClick={() => setActiveTab('hire')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'hire'
                ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <UserPlus className="w-5 h-5" />
            <span>Hire</span>
          </button>

          {/* Add tab inserted between Hire and Apply */}
          <button
            onClick={() => setActiveTab('add')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'add'
                ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Plus className="w-5 h-5" />
            <span>Add</span>
          </button>

          <button
            onClick={() => setActiveTab('apply')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'apply'
                ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span>Apply</span>
          </button>
          <button
            onClick={() => setActiveTab('sponsor')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'sponsor'
                ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Gift className="w-5 h-5" />
            <span>Sponsorship</span>
          </button>
          <button
            onClick={() => setActiveTab('recognition')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'recognition'
                ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Award className="w-5 h-5" />
            <span>Recognition</span>
          </button>
        </div>

        {/* Search + Radio Entity + Category Select (Media-style) */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-stretch md:items-center">
          {/* Search - a bit narrower on desktop to make space for radios */}
          <div className="md:basis-1/2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={
                activeTab === 'apply' ? 'Search jobs...' : activeTab === 'hire' ? 'Search by service or provider name...' : activeTab === 'sponsor' ? 'Search sponsorships...' : 'Search recognitions...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass-effect rounded-xl border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Entity radio group (only meaningful for Hire) */}
          <div className="md:basis-1/3 flex items-center justify-center gap-4 glass-effect px-3 py-2 rounded-xl border border-white/10">
            {(
              [
                { id: 'talents', label: 'Talent' },
                { id: 'teams', label: 'Team' },
                { id: 'agencies', label: 'Agency' }
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                onClick={() => setEntityType(opt.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  entityType === opt.id ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
                aria-pressed={entityType === opt.id}
              >
                <span
                  className={`inline-block w-3 h-3 rounded-full border ${
                    entityType === opt.id ? 'bg-rose-500 border-rose-400' : 'border-gray-400'
                  }`}
                />
                <span className="text-sm">{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Category select with Filter icon */}
          <div className="md:basis-1/6 flex items-center space-x-3">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-gray-800">
                  {category
                    .split('-')
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile-only Sort (placed after filter) */}
          <div className="flex items-center gap-3 md:hidden mt-2 w-full">
            <span className="text-gray-400 flex-shrink-0">Sort by</span>
            <div className="flex items-center gap-2 w-full">
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as 'all' | 'price' | 'rating' | 'popularity' | 'reviews')}
                className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
              >
                <option value="all" className="bg-gray-800">All</option>
                <option value="price" className="bg-gray-800">Cost</option>
                <option value="rating" className="bg-gray-800">Ratings</option>
                <option value="popularity" className="bg-gray-800">Popularity</option>
                <option value="reviews" className="bg-gray-800">Reviews</option>
              </select>
              <button
                onClick={() => setSortOrder((s) => (s === 'desc' ? 'asc' : 'desc'))}
                className={`p-3 rounded-lg transition-colors ${sortOrder === 'desc' ? 'bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white' : 'glass-effect text-gray-300 hover:text-white'}`}
                aria-pressed={sortOrder === 'asc'}
                title="Toggle order"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  {sortOrder === 'desc' ? (
                    <path d="M12 5l6 6H6l6-6z" />
                  ) : (
                    <path d="M12 19l-6-6h12l-6 6z" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Add Tab Content */}
          {activeTab === 'add' && (
            <div className="glass-effect rounded-2xl overflow-hidden hover-lift p-6 lg:col-span-3">
              <h3 className="text-xl font-semibold text-white mb-4">Create a new job posting</h3>
              <AddJobForm
                onCreate={(job) => {
                  setProjects((p) => [{ ...job, id: Math.max(0, ...p.map((x: any) => x.id)) + 1 }, ...p]);
                  setActiveTab('apply');
                  setSearchQuery('');
                  alert('Job posted successfully. It now appears in Apply.');
                }}
              />

              <hr className="my-6 border-white/10" />

              <h3 className="text-xl font-semibold text-white mb-4">Add your provider profile</h3>
              <AddProviderForm
                onCreate={(provider, kind) => {
                  if (kind === 'talents') {
                    setTalents((t) => [{ ...provider, id: Math.max(0, ...t.map((x: any) => x.id)) + 1 }, ...t]);
                    setActiveTab('hire');
                    setEntityType('talents');
                  } else if (kind === 'teams') {
                    setTeams((t) => [{ ...provider, id: Math.max(0, ...t.map((x: any) => x.id)) + 1 }, ...t]);
                    setActiveTab('hire');
                    setEntityType('teams');
                  } else {
                    setAgencies((a) => [{ ...provider, id: Math.max(0, ...a.map((x: any) => x.id)) + 1 }, ...a]);
                    setActiveTab('hire');
                    setEntityType('agencies');
                  }
                  alert('Profile added. It now appears under Hire.');
                }}
              />
            </div>
          )}

          {activeTab === 'apply' &&
            sortedProjects.map((project) => (
              <div key={project.id} className="glass-effect rounded-2xl overflow-hidden hover-lift p-6">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="text-gray-400 text-sm">{project.company}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <span className="text-gray-300 text-sm">{project.location}</span>
                </div>
                <p className="text-gray-300 text-sm mt-4 line-clamp-2">{project.description}</p>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-1">
                    {project.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-rose-400/20 text-rose-300 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-lg font-bold text-white">UGX --</div>
                  <button
                    onClick={() => handleApply(project.id)}
                    className="flex-1 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}

          {activeTab === 'hire' && entityType === 'talents' &&
            sortedTalents.map((talent) => (
              <div key={talent.id} className="glass-effect rounded-2xl overflow-hidden hover-lift">
                <div className="p-6 pb-4">
                  <div className="flex items-start space-x-4">
                    <img src={talent.avatar} alt={talent.name} className="w-16 h-16 rounded-full object-cover" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white">{talent.name}</h3>
                      <p className="text-gray-400 text-sm">{talent.title}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm">{maskRating(talent.rating)}</span>
                          <span className="text-gray-400 text-sm">({maskNumber(talent.reviews)})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-4">
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{talent.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{talent.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{talent.responseTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Briefcase className="w-4 h-4" />
                      <span>{maskNumber(talent.completedProjects)} projects</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <DollarSign className="w-4 h-4" />
                      <span>UGX --/hr</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {talent.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-rose-400/20 text-rose-300 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                      {talent.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded">
                          +{talent.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex space-x-2">
                    <button
                      onClick={handleViewPortfolio}
                      className="flex-1 py-2 glass-effect text-gray-300 hover:text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Portfolio</span>
                    </button>
                    <button
                      onClick={() => handleHire(talent.id, 'talent')}
                      className="flex-1 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      Hire Now
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {activeTab === 'hire' && entityType === 'teams' &&
            sortedTeams.map((team) => (
              <div key={team.id} className="glass-effect rounded-2xl overflow-hidden hover-lift">
                <div className="p-6 pb-4">
                  <div className="flex items-start space-x-4">
                    <img src={team.logo} alt={team.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white">{team.name}</h3>
                      <p className="text-gray-400 text-sm">{team.type}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm">{maskRating(team.rating)}</span>
                          <span className="text-gray-400 text-sm">({maskNumber(team.reviews)})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-4">
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{team.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{team.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{team.responseTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{maskNumber(team.teamSize)} members</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <DollarSign className="w-4 h-4" />
                      <span>From UGX --/hr</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-white text-sm font-medium mb-2">Services</h4>
                    <div className="flex flex-wrap gap-1">
                      {team.services.slice(0, 3).map((service, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-400/20 text-purple-300 text-xs rounded">
                          {service}
                        </span>
                      ))}
                      {team.services.length > 3 && (
                        <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded">
                          +{team.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex space-x-2">
                    <button
                      onClick={handleViewPortfolio}
                      className="flex-1 py-2 glass-effect text-gray-300 hover:text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Work</span>
                    </button>
                    <button
                      onClick={() => handleHire(team.id, 'team')}
                      className="flex-1 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      Hire Team
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {activeTab === 'hire' && entityType === 'agencies' &&
            sortedAgencies.map((agency) => (
              <div key={agency.id} className="glass-effect rounded-2xl overflow-hidden hover-lift">
                <div className="p-6 pb-4">
                  <div className="flex items-start space-x-4">
                    <img src={agency.logo} alt={agency.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white">{agency.name}</h3>
                      <p className="text-gray-400 text-sm">{agency.type}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm">{maskRating(agency.rating)}</span>
                          <span className="text-gray-400 text-sm">({maskNumber(agency.reviews)})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-4">
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{agency.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{agency.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{agency.responseTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{maskNumber(agency.teamSize)} members</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <DollarSign className="w-4 h-4" />
                      <span>From UGX --/hr</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-white text-sm font-medium mb-2">Services</h4>
                    <div className="flex flex-wrap gap-1">
                      {agency.services.slice(0, 3).map((service, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-400/20 text-purple-300 text-xs rounded">
                          {service}
                        </span>
                      ))}
                      {agency.services.length > 3 && (
                        <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded">
                          +{agency.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex space-x-2">
                    <button
                      onClick={handleViewPortfolio}
                      className="flex-1 py-2 glass-effect text-gray-300 hover:text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Work</span>
                    </button>
                    <button
                      onClick={() => handleHire(agency.id, 'agency')}
                      className="flex-1 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      Hire Agency
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {activeTab === 'sponsor' &&
            sponsorPackages.map((pack) => (
              <div key={pack.id} className="glass-effect rounded-2xl overflow-hidden hover-lift p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{pack.project}</h3>
                <p className="text-gray-300 mb-4">Choose a sponsorship tier and support this project.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {pack.tiers.map((t) => (
                    <div key={t.name} className="p-4 rounded-lg border border-white/10 bg-white/5">
                      <div className="text-white font-medium">{t.name}</div>
                      <div className="text-rose-300 text-sm mb-2">{t.amount}</div>
                      <ul className="text-gray-300 text-xs space-y-1">
                        {t.perks.map((p) => (
                          <li key={p}>• {p}</li>
                        ))}
                      </ul>
                      <button className="mt-3 w-full py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg">
                        Sponsor Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          {activeTab === 'recognition' &&
            recognitions.map((r) => (
              <div key={r.id} className="glass-effect rounded-2xl overflow-hidden hover-lift">
                <div className="relative aspect-video bg-gray-800">
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full">
                    HONOREE
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">{r.title}</h3>
                  <p className="text-gray-400 text-sm mb-1">{r.org}</p>
                  <p className="text-gray-300 text-sm">{r.summary}</p>
                </div>
              </div>
            ))}
        </div>

        {/* Empty States */}
        {activeTab === 'apply' && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
            <p className="text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
        {activeTab === 'hire' && entityType === 'talents' && filteredTalents.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-white mb-2">No talents found</h3>
            <p className="text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
        {activeTab === 'hire' && entityType === 'teams' && filteredTeams.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-white mb-2">No teams found</h3>
            <p className="text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
        {activeTab === 'hire' && entityType === 'agencies' && filteredAgencies.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-white mb-2">No agencies found</h3>
            <p className="text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
