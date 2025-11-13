import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Play,
  Clock,
  Users,
  Award,
  Star,
  BookOpen,
  Filter,
  Search,
  CheckCircle,
  Lock,
  Bookmark,
  LayoutGrid,
  List as ListIcon,
  MapPin,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type ViewMode = 'courses' | 'workshops' | 'learning' | 'teaching' | 'mentorship';
type LayoutMode = 'grid' | 'list';

type Masterclass = {
  id: number;
  title: string;
  instructor: string;
  category: string;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  price: number;
  level: string;
  thumbnail: string;
  description: string;
  features: string[];
  isEnrolled: boolean;
  progress: number;
};

type Workshop = {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  instructor: string;
  spots: number;
  price: number;
  category: string;
  location: string;
};

export default function Masterclass() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('courses');
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('grid');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'all' | 'visual-arts' | 'performing-arts' | 'creative-arts' | 'development'>('all');
  const [bookmarkedCourseIds, setBookmarkedCourseIds] = useState<number[]>([]);
  const [showMentorshipModal, setShowMentorshipModal] = useState(false);
  const [mentorshipRequestSent, setMentorshipRequestSent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const courseCategories = useMemo(
    () => [
      'all',
      'digital-marketing',
      'brand-ambassador',
      'media-communications',
      'media-production',
      'art-&-design',
      'modelling',
      'dance-&-choreography',
      'acting',
      'critical-media-literacy',
      'film-video-production',
      'audio-production',
      'music',
      'event-management',
      'marketing-&-advertising',
      'AI-research-&-innovation',
      'business-development',
      'professional-development',
      'personal-development'
    ],
    []
  );

  function getCategoryLabel(category: string): string {
    if (category === 'marketing-&-advertising') return 'Branding, Marketing & Advertising';
    if (category === 'AI-research-&-innovation') return 'AI, Research & Innovation';
    if (category === 'media-communications') return 'Communications';
    return category
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  function maskNumber(n: number): string {
    const digits = String(Math.max(1, Math.abs(Math.trunc(n)))).length;
    return '-'.repeat(digits);
  }

  function maskRating(r: number): string {
    const len = (Number.isFinite(r) ? r : 0).toFixed(1).length;
    return '-'.repeat(len);
  }

  const masterclasses = useMemo<Masterclass[]>(
    () =>
      [
        {
          id: 1,
          title: 'Digital Marketing',
          instructor: 'Emma Wilson',
          category: 'digital-marketing',
          duration: '8 weeks',
          lessons: 24,
          students: 1250,
          rating: 4.9,
          price: 750000,
          level: 'Beginner to Advanced',
          thumbnail: 'https://cdn.shopify.com/s/files/1/0299/9215/7283/files/DIGITAL_MARKETING_BY_CERTIPROF.webp?v=1734986006',
          description: 'Master the art of digital marketing with hands-on projects and real-world case studies.',
          features: ['Live Sessions', 'Projects', 'Certification'],
          isEnrolled: false,
          progress: 0
        },
        {
          id: 2,
          title: 'Brand Ambassador Certification',
          instructor: 'Sarah Johnson',
          category: 'brand-ambassador',
          duration: '6 weeks',
          lessons: 18,
          students: 890,
          rating: 4.8,
          price: 560000,
          level: 'Intermediate',
          thumbnail: 'https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Learn how to become a successful brand ambassador and build lasting partnerships.',
          features: ['Personal Branding', 'Media Kit Creation', 'Practical Campaigns'],
          isEnrolled: true,
          progress: 65
        },
        {
          id: 3,
          title: 'Communications',
          instructor: 'Dr. Aisha Khan',
          category: 'media-communications',
          duration: '10 weeks',
          lessons: 30,
          students: 650,
          rating: 4.9,
          price: 940000,
          level: 'Advanced',
          thumbnail: 'https://media.istockphoto.com/id/1064110400/photo/breaking-news-female-anchor.jpg?s=612x612&w=0&k=20&c=gwIIZh88eQK2DTSA0Mj-CyHjpgxoiSHUiCAQAgscCps=',
          description: 'Develop valuable communication skills including public speaking, emceeing, show hosting, TV and radio presenting, PR and Communications strategy.',
          features: ['Public Speaking', 'Public Relations Management', 'Show Hosting', 'Emceeing'],
          isEnrolled: false,
          progress: 0
        },
        {
          id: 17,
          title: 'Media Production',
          instructor: 'Alex Carter',
          category: 'media-production',
          duration: '10 weeks',
          lessons: 26,
          students: 460,
          rating: 4.8,
          price: 900000,
          level: 'All Levels',
          thumbnail: 'https://bigcreative.education/wp-content/uploads/2023/06/melyna-valle-dgeFqem7_zE-unsplash-1536x1024.jpg.webp',
          description: 'Craft compelling visuals—master professional photography, videography, motion graphics, animation, and graphic design',
          features: ['Photography', 'Videography', 'Motion Graphics', 'Animation', 'Graphic Design'],
          isEnrolled: false,
          progress: 0
        },
        {
          id: 18,
          title: 'Art & Design',
          instructor: 'Lara Vinci',
          category: 'art-&-design',
          duration: '12 weeks',
          lessons: 28,
          students: 330,
          rating: 4.8,
          price: 880000,
          level: 'All Levels',
          thumbnail: 'https://veryprivategallery.com/wp-content/uploads/2019/12/artist-studio-saragota-ny.jpg',
          description: 'Practice with drawing, painting, sculpture, industrial and interior design, fashion and graffiti for visual communication.',
          features: ['Industrial Art', 'Sculpting', 'Drawing', 'Painting', 'Interior Design', 'Fashion Design', 'Graphic Design'],
          isEnrolled: false,
          progress: 0
        },
        {
          id: 5,
          title: 'Modelling & Pageantry',
          instructor: 'Ruby Nesda',
          category: 'modelling',
          duration: '8 weeks',
          lessons: 20,
          students: 350,
          rating: 4.8,
          price: 820000,
          level: 'Beginner',
          thumbnail: 'https://images.pexels.com/photos/6311651/pexels-photo-6311651.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Master the runway, posing techniques, and the business of modeling.',
          features: ['Posing Techniques', 'Runway Walk', 'Portfolio Development'],
          isEnrolled: false,
          progress: 0
        },
        {
          id: 16,
          title: 'Dance & Choreography',
          instructor: 'Isabella Cruz',
          category: 'dance-&-choreography',
          duration: '8 weeks',
          lessons: 24,
          students: 280,
          rating: 4.7,
          price: 800000,
          level: 'All Levels',
          thumbnail: 'https://www.ajc.com/resizer/v2/SNRXF5IA2F77BWY4NIOZH2FUGA.jpg?auth=dc5d58e5229767dd89cb2436576736020b4721dc16fc4a7100c599ce983d558b&width=600&smart=true',
          description: 'Train in technique, musicality, and choreography across contemporary, hip hop, and Afro styles. Build stage presence and performance readiness.',
          features: ['Technique', 'Choreography', 'Performance', 'Fitness'],
          isEnrolled: false,
          progress: 0
        },
        {
          id: 4,
          title: 'Acting for Screen & Stage',
          instructor: 'Jedi Martinez',
          category: 'acting',
          duration: '12 weeks',
          lessons: 36,
          students: 420,
          rating: 4.7,
          price: 1130000,
          level: 'All Levels',
          thumbnail: 'https://images.pexels.com/photos/7551410/pexels-photo-7551410.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Develop your acting skills with professional techniques and industry insights.',
          features: ['Scene Work', 'Audition Prep', 'Industry Connections', 'Demo Reel'],
          isEnrolled: false,
          progress: 0
        },
        {
          id: 9,
          title: 'Critical Media Literacy',
          instructor: 'Rouje Gerard',
          category: 'critical-media-literacy',
          duration: '6 weeks',
          lessons: 15,
          students: 250,
          rating: 4.7,
          price: 680000,
          level: 'All Levels',
          thumbnail: 'https://images.pexels.com/photos/8390958/pexels-photo-8390958.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Understand how media shapes the narrative. Compare realities, identify intention and responsible creation.',
          features: ['Multimedia Analysis', 'Source Evaluation'],
          isEnrolled: false,
          progress: 0
        },
        {
          id: 6,
          title: 'Film & Video Production',
          instructor: 'David Lee',
          category: 'film-video-production',
          duration: '10 weeks',
          lessons: 25,
          students: 550,
          rating: 4.9,
          price: 980000,
          level: 'Beginner to Intermediate',
          thumbnail: 'https://www.adorama.com/alc/wp-content/uploads/2018/03/shutterstock_226081837.jpg',
          description: 'Learn the fundamentals of filmmaking, from pre-production to post-production.',
          features: ['Cinematography', 'Editing', 'Sound Design', 'Directing'],
          isEnrolled: false,
          progress: 0
        },
        {
          id: 7,
          title: 'Audio Production',
          instructor: 'Dr. Michael Chen',
          category: 'audio-production',
          duration: '8 weeks',
          lessons: 20,
          students: 400,
          rating: 4.8,
          price: 720000,
          level: 'All Levels',
          thumbnail: 'https://www.mi.edu/wp-content/uploads/2024/08/AE-Difference_0000s_0000s_0000_MI_Audio_Engineering_Student.jpg',
          description: 'Master audio recording, editing, and mixing for music, podcasts, and video.',
          features: ['DAW Basics', 'Mixing Techniques', 'Mastering', 'Sound Engineering'],
          isEnrolled: false,
          progress: 0
        },
        {
          id: 8,
          title: 'Musical Performance',
          instructor: 'Dr. Michael Chen',
          category: 'music',
          duration: '12 weeks',
          lessons: 30,
          students: 300,
          rating: 4.9,
          price: 1200000,
          level: 'Intermediate to Advanced',
          thumbnail: 'https://www.solent.ac.uk/media-library/images/courses/shared/employability/music-performance-employability-min.x0ceb1b57.jpg',
          description: 'Develop stage performance, ensemble skills, and live musicianship across contemporary and classical styles.',
          features: ['Stage Performance', 'Ensemble Skills', 'Technique', 'Music Instruments'],
          isEnrolled: false,
          progress: 0
        },
        {
          id: 10,
          title: 'Event Management & Production',
          instructor: 'Nina Laurent',
          category: 'event-management',
          duration: '8 weeks',
          lessons: 20,
          students: 310,
          rating: 4.7,
          price: 780000,
          level: 'All Levels',
          thumbnail: 'https://decibelevents.com/wp-content/uploads//TRANE_2024_Day_1_0797-copy-1024x683.jpg',
          description: 'Plan, budget, and execute world-class events from concept to post-event reporting.',
          features: ['Logistics', 'Budgeting', 'Vendor Management', 'Safety & Compliance'],
          isEnrolled: false,
          progress: 0
        },
        {
          id: 11,
          title: 'Branding, Marketing & Advertising',
          instructor: 'Tom Harris',
          category: 'marketing-&-advertising',
          duration: '8 weeks',
          lessons: 22,
          students: 540,
          rating: 4.8,
          price: 860000,
          level: 'Intermediate',
          thumbnail: 'https://img.businessoffashion.com/resizer/v2/F67HA6OV6VAULB4WNKZ47FMXYY.jpg?auth=69e0c9c7ec295ce6c91a0e5c9fc63787b5063e6ff1290f095eb75cb1c0de2d9d&width=1024',
          description: 'Develop integrated campaigns, measure ROI, and grow brands across digital and traditional channels.',
          features: ['Brand Strategy', 'Campaign Planning', 'Media Buying', 'Analytics'],
          isEnrolled: false,
          progress: 0
        },
        {
          id: 12,
          title: 'AI, Research & Innovation',
          instructor: 'Dr. Allan Einstein',
          category: 'AI-research-&-innovation',
          duration: '6 weeks',
          lessons: 16,
          students: 420,
          rating: 4.7,
          price: 990000,
          level: 'All Levels',
          thumbnail: 'https://images.pexels.com/photos/8438921/pexels-photo-8438921.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Explore modern AI techniques, from AI version evaluation, to workflow leverage and innovation pathways.',
          features: ['ML Fundamentals', 'Evaluation & Metrics', 'Prompt Engineering', 'Sustainable use of AI'],
          isEnrolled: false,
          progress: 0
        },
        {
          id: 13,
          title: 'Business Development',
          instructor: 'Jedi Martinez',
          category: 'business-development',
          duration: '7 weeks',
          lessons: 18,
          students: 380,
          rating: 4.6,
          price: 720000,
          level: 'Beginner to Intermediate',
          thumbnail: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Develop an entrepreneurial mindset, master business skills and sales, negotiate partnerships, and create sustainable revenue growth.',
          features: ['Sales Pipelines', 'Partnerships', 'Negotiations', 'Forecasting'],
          isEnrolled: false,
          progress: 0
        },
        {
          id: 14,
          title: 'Professional Development',
          instructor: 'Dr. Barrack Emma',
          category: 'professional-development',
          duration: '6 weeks',
          lessons: 14,
          students: 610,
          rating: 4.8,
          price: 560000,
          level: 'All Levels',
          thumbnail: 'https://jefmenguin.com/wp-content/uploads/2022/10/studying.jpg',
          description: 'Master professional etiquette in your field, and advance in your career with practical skills in leadership, communication, and execution.',
          features: ['Communication', 'Leadership', 'Time Management', 'Teamwork'],
          isEnrolled: false,
          progress: 0
        },
        {
          id: 15,
          title: 'Personal Development',
          instructor: 'Grace Williams',
          category: 'personal-development',
          duration: '6 weeks',
          lessons: 12,
          students: 450,
          rating: 4.7,
          price: 480000,
          level: 'All Levels',
          thumbnail: 'https://timespro.com/_next/image?url=https%3A%2F%2Ftimesproweb-static-backend-prod.s3.ap-south-1.amazonaws.com%2FA_person_working_on_self_development_3993484cd4.webp&w=1920&q=75',
          description: 'Strengthen mindset, set goals, and build habits for lifelong growth and fulfillment.',
          features: ['Goal Setting', 'Mindset', 'Productivity', 'Wellbeing'],
          isEnrolled: false,
          progress: 0
        }
      ].sort((a, b) => {
        const order = courseCategories;
        return order.indexOf(a.category) - order.indexOf(b.category);
      }),
    [courseCategories]
  );

  // Load and persist wishlist (bookmarked courses)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('bookmarkedCourseIds');
      if (stored) {
        const parsed = JSON.parse(stored) as number[];
        if (Array.isArray(parsed)) setBookmarkedCourseIds(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('bookmarkedCourseIds', JSON.stringify(bookmarkedCourseIds));
    } catch {}
  }, [bookmarkedCourseIds]);

  const workshops = useMemo<Workshop[]>(
    () => [
      {
        id: 1,
        title: 'Creative Bootcamp',
        date: 'November 15, 2025',
        time: '2:00 PM EAT',
        duration: '3 hours',
        instructor: 'Alex Chen',
        spots: 25,
        price: 185000,
        category: 'digital-marketing',
        location: 'Kampala Creative Hub'
      },
      {
        id: 2,
        title: 'Personal Branding Workshop',
        date: 'November 20, 2025',
        time: '10:00 AM EAT',
        duration: '4 hours',
        instructor: 'Maya Patel',
        spots: 15,
        price: 300000,
        category: 'professional-development',
        location: 'Virtual (Live)'
      }
      ,
      {
        id: 3,
        title: 'Litflex - Multimedia Analytica',
        date: 'December 5, 2025',
        time: '4:00 PM EAT',
        duration: '3 hours',
        instructor: 'Rouje Gerard',
        spots: 30,
        price: 220000,
        category: 'critical-media-literacy',
        location: 'Kampala Cine Arena'
      }
    ],
    []
  );

  const enrolledCourses = useMemo(() => masterclasses.filter((course) => course.isEnrolled), [masterclasses]);

  const filteredMasterclasses = useMemo(() => {
    const categoryValue = activeCategory;
    return masterclasses.filter((course) => {
      const matchesCategory = categoryValue === 'all' || course.category === categoryValue;
      const loweredQuery = searchQuery.toLowerCase();
      const matchesSearch =
        loweredQuery.length === 0 ||
        course.title.toLowerCase().includes(loweredQuery) ||
        course.instructor.toLowerCase().includes(loweredQuery) ||
        course.features.some((feature) => feature.toLowerCase().includes(loweredQuery));
      return matchesCategory && matchesSearch;
    });
  }, [masterclasses, activeCategory, searchQuery]);

  const sortedMasterclasses = useMemo(() => {
    const items = [...filteredMasterclasses];
    if (sortBy === 'all') return items;
    const groupMap: Record<string, string[]> = {
      'visual-arts': ['art-&-design', 'film-video-production', 'media-production'],
      'performing-arts': ['music', 'acting', 'dance-&-choreography', 'modelling'],
      'creative-arts': ['digital-marketing', 'marketing-&-advertising', 'brand-ambassador', 'media-communications', 'event-management', 'critical-media-literacy', 'audio-production'],
      'development': ['business-development', 'professional-development', 'personal-development', 'AI-research-&-innovation']
    };
    const allowed = groupMap[sortBy] || [];
    return items.filter((c) => allowed.includes(c.category));
  }, [filteredMasterclasses, sortBy]);

  const filteredWorkshops = useMemo(() => {
    const categoryValue = activeCategory;
    return workshops.filter((workshop) => {
      const matchesCategory = categoryValue === 'all' || workshop.category === categoryValue;
      const loweredQuery = searchQuery.toLowerCase();
      const matchesSearch =
        loweredQuery.length === 0 ||
        workshop.title.toLowerCase().includes(loweredQuery) ||
        workshop.instructor.toLowerCase().includes(loweredQuery) ||
        workshop.location.toLowerCase().includes(loweredQuery);
      return matchesCategory && matchesSearch;
    });
  }, [workshops, activeCategory, searchQuery]);

  const sortedWorkshops = useMemo(() => {
    return filteredWorkshops;
  }, [filteredWorkshops]);

  const filteredLearning = useMemo(() => {
    const loweredQuery = searchQuery.toLowerCase();
    return enrolledCourses.filter((course) => {
      const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
      const matchesSearch =
        loweredQuery.length === 0 ||
        course.title.toLowerCase().includes(loweredQuery) ||
        course.instructor.toLowerCase().includes(loweredQuery);
      return matchesCategory && matchesSearch;
    });
  }, [enrolledCourses, searchQuery, activeCategory]);

  const canManageClasses = Boolean(
    user && (user.tier === 'professional' || user.tier === 'elite') && user.role === 'creator'
  );

  const handleEnroll = (courseId: number) => {
    if (!user) {
      alert('Please sign up or sign in to enroll.');
      navigate('/signin');
      return;
    }
    if (user.tier === 'free') {
      alert('Upgrade to Premium to access masterclasses!');
      return;
    }
    alert(`Enrollment successful! Welcome to the masterclass.`);
  };

  const handleMentorshipRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMentorshipRequestSent(true);
  };

  const handleMentorshipClick = () => {
    if (!user) {
      alert('Please sign up or sign in to submit a mentorship request.');
      navigate('/signin');
      return;
    }
    setShowMentorshipModal(true);
    setMentorshipRequestSent(false);
  };

  const handleBookmarkToggle = (courseId: number) => {
    setBookmarkedCourseIds((prev) => {
      const exists = prev.includes(courseId);
      const next = exists ? prev.filter((id) => id !== courseId) : [...prev, courseId];
      setToastMessage(exists ? 'Removed Bookmark' : 'Added Bookmark');
      setTimeout(() => setToastMessage(''), 1600);
      return next;
    });
  };

  const searchPlaceholderMap: Record<ViewMode, string> = {
    courses: 'Search courses and instructors...',
    workshops: 'Search workshops and facilitators...',
    learning: 'Search your enrolled courses...',
    teaching: 'Search teaching resources...',
    mentorship: 'Search mentorship resources...'
  };

  const viewOptions: { key: ViewMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'courses', label: 'Courses', icon: BookOpen },
    { key: 'workshops', label: 'Workshops', icon: Clock },
    { key: 'learning', label: 'Learning', icon: Award },
    { key: 'teaching', label: 'Teaching', icon: Briefcase },
    { key: 'mentorship', label: 'Mentorship', icon: Users }
  ];

  const courseContainerClass =
    layoutMode === 'grid'
      ? 'grid gap-6 md:grid-cols-2 xl:grid-cols-3'
      : 'grid gap-4 md:block md:space-y-4';

  const workshopContainerClass =
    layoutMode === 'grid'
      ? 'grid gap-6 md:grid-cols-2 xl:grid-cols-3'
      : 'grid gap-4 md:block md:space-y-4';

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-playfair font-bold text-white mb-2">Masterclass</h1>
            <p className="text-gray-300">
              Stand out with a certificate for your skills and the support of industry experts
            </p>
          </div>

          <Link
            to="/help-center"
            className="hidden md:inline-flex px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all items-center justify-center"
          >
            Help Center
          </Link>
        </div>

        <div className="flex space-x-1 glass-effect p-2 rounded-xl overflow-x-auto whitespace-nowrap w-full mb-8">
          {viewOptions.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => {
                setViewMode(key);
                setSearchQuery('');
                if (key === 'teaching' || key === 'mentorship') {
                  setActiveCategory('all');
                }
              }}
              className={`flex-shrink-0 flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                viewMode === key
                  ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative md:flex-[0.65]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={searchPlaceholderMap[viewMode]}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass-effect rounded-xl border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6 md:flex-[0.35]">
            <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
              <Filter className="text-gray-400 w-5 h-5 flex-shrink-0" />
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                disabled={viewMode === 'teaching' || viewMode === 'mentorship'}
                className="px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed ml-10 w-[calc(100%-2.5rem)] md:ml-0 md:w-auto md:min-w-[12rem]"
              >
                {courseCategories.map((category) => (
                  <option key={category} value={category} className="bg-gray-800 text-white">
                    {getCategoryLabel(category)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-gray-400 flex-shrink-0">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all md:w-auto md:min-w-[8rem]"
              >
                <option value="all" className="bg-gray-800">All</option>
                <option value="visual-arts" className="bg-gray-800">Visual Arts</option>
                <option value="performing-arts" className="bg-gray-800">Performing Arts</option>
                <option value="creative-arts" className="bg-gray-800">Creative Arts</option>
                <option value="development" className="bg-gray-800">Development</option>
              </select>
            </div>

            <div className="glass-effect px-3 py-2 rounded-xl hidden md:flex items-center gap-2 flex-shrink-0 md:ml-auto">
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  layoutMode === 'grid'
                    ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setLayoutMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  layoutMode === 'list'
                    ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                aria-label="List view"
              >
                <ListIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'courses' && (
          <div className={courseContainerClass}>
            {sortedMasterclasses.map((course) => {
              const isBookmarked = bookmarkedCourseIds.includes(course.id);
              return (
                <div
                  key={course.id}
                  className={`glass-effect rounded-2xl overflow-hidden hover-lift transition-all ${
                    layoutMode === 'list' ? 'md:flex' : ''
                  }`}
                >
                  <div className={`${layoutMode === 'list' ? 'md:w-1/3 md:min-w-[240px]' : ''}`}>
                    <div className={`relative group ${layoutMode === 'list' ? 'md:h-full' : 'aspect-video'} bg-gray-800`}>
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleBookmarkToggle(course.id)}
                        className={`absolute top-3 right-3 p-2 rounded-full bg-black/40 transition-colors z-20 ${
                          isBookmarked ? 'text-purple-400' : 'text-gray-200 hover:text-white'
                        }`}
                        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark course'}
                      >
                        <Bookmark className="w-5 h-5" />
                      </button>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                      {course.isEnrolled && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                          ENROLLED
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`${layoutMode === 'list' ? 'md:w-2/3' : ''} p-6`}> 
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-rose-400/20 text-rose-300 text-xs rounded-full">
                        {course.level}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-gray-300 text-sm">{maskRating(course.rating)}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                    <p className="text-gray-200 text-sm mb-3">by {course.instructor}</p>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{course.description}</p>

                    <div className={`text-sm text-gray-200 mb-4 ${layoutMode === 'list' ? 'flex flex-wrap gap-x-6 gap-y-2' : 'flex items-center justify-between'}`}>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{maskNumber(course.students)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.features.map((feature, index) => (
                        <span key={feature + index} className="px-2 py-1 bg-purple-400/20 text-purple-300 text-xs rounded">
                          {feature}
                        </span>
                      ))}
                      <Link
                        to={`/career-guidance/${course.id}`}
                        className="px-2 py-1 bg-blue-400/20 text-blue-300 text-xs rounded"
                      >
                        Career Guidance
                      </Link>
                    </div>

                    {course.isEnrolled && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Progress</span>
                          <span className="text-gray-300">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-white">UGX --</div>
                      {course.isEnrolled ? (
                        <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Continue Learning
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEnroll(course.id)}
                          className="px-6 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                        >
                          Enroll Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {filteredMasterclasses.length === 0 && (
              <div className="glass-effect rounded-2xl p-8 text-center text-gray-300">
                No courses found. Try adjusting your search or filters.
              </div>
            )}
          </div>
        )}

        {viewMode === 'workshops' && (
          <div className={workshopContainerClass}>
            {sortedWorkshops.map((workshop) => (
              <div
                key={workshop.id}
                className={`glass-effect rounded-2xl overflow-hidden hover-lift transition-all p-6 ${
                  layoutMode === 'list' ? 'md:flex md:items-center md:justify-between' : ''
                }`}
              >
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{workshop.title}</h3>
                  <div className="text-gray-300 text-sm space-y-1">
                    <div>{workshop.date} at {workshop.time}</div>
                    <div>{workshop.duration} • {workshop.spots} spots left</div>
                    <div>by {workshop.instructor}</div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:text-right">
                  <div className="flex items-center justify-start md:justify-end gap-2 text-sm text-gray-300 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{workshop.location}</span>
                  </div>
                  <div className="flex items-center justify-between md:justify-end md:gap-4">
                    <span className="text-rose-400 font-bold">UGX --</span>
                    <button className="px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white text-sm rounded-lg hover:shadow-lg transition-all">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredWorkshops.length === 0 && (
              <div className="glass-effect rounded-2xl p-8 text-center text-gray-300">
                No workshops match your filters right now.
              </div>
            )}
          </div>
        )}

        {viewMode === 'learning' && (
          <div className="space-y-6">
            <div className="glass-effect p-6 rounded-2xl">
              <h2 className="text-2xl font-semibold text-white mb-4">My Learning</h2>
              <div className={layoutMode === 'grid' ? 'grid gap-4 md:grid-cols-2 xl:grid-cols-3' : 'space-y-4'}>
                {filteredLearning.map((course) => (
                  <div key={course.id} className="glass-effect p-4 rounded-2xl border border-white/10">
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="text-white text-sm font-medium line-clamp-1">{course.title}</div>
                        <div className="text-gray-200 text-xs">{course.progress}% complete</div>
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm mb-3">{course.description}</div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Progress</span>
                      <span className="text-gray-300">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                      <div
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Instructor: {course.instructor}</span>
                      <button className="px-3 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs rounded-lg">
                        Continue Learning
                      </button>
                    </div>
                  </div>
                ))}
                {filteredLearning.length === 0 && (
                  <div className="glass-effect rounded-2xl p-6 text-center text-gray-300">
                    No enrolled courses yet
                  </div>
                )}
              </div>
            </div>

            <div className="glass-effect p-6 rounded-2xl">
              <h2 className="text-2xl font-semibold text-white mb-4">My Achievements</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-yellow-400" />
                  <div>
                    <div className="text-white font-medium">Brand Ambassador Certified</div>
                    <div className="text-gray-200 text-sm">Completed November 2025</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <div>
                    <div className="text-white font-medium">First Course Completed</div>
                    <div className="text-gray-400 text-sm">Achievement unlocked</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'teaching' && (
          <div className="space-y-8">
            <div className="glass-effect p-8 rounded-2xl text-center">
              <BookOpen className="w-16 h-16 text-rose-400 mx-auto mb-4" />
              <h2 className="text-3xl font-playfair font-bold text-white mb-4">Become an Instructor</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Use your expertise, professional accreditations or Masterclass certificate to apply and become an expert instructor, shaping the future of talent
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-4">
                  <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h3 className="text-white font-semibold mb-1">Access our audience</h3>
                  <p className="text-gray-400 text-sm">Connect with learners globally</p>
                </div>
                <div className="p-4">
                  <BookOpen className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h3 className="text-white font-semibold mb-1">Submit and Track lessons</h3>
                  <p className="text-gray-400 text-sm">Leverage Analytics for accurate reporting</p>
                </div>
                <div className="p-4">
                  <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h3 className="text-white font-semibold mb-1">Manage your Teaching</h3>
                  <p className="text-gray-400 text-sm">Grow and improve with Platform support</p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (!user) {
                    alert('Please sign up or sign in to apply as an instructor.');
                    navigate('/signin');
                    return;
                  }
                  alert('Instructor application coming soon!');
                }}
                className="px-8 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all"
              >
                Apply to Teach
              </button>
              <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
                Track learner progress, assessment scores, and feedback to continually improve your profession.
              </p>
            </div>

            {user && (
              <div className="glass-effect p-6 rounded-2xl">
                <h2 className="text-2xl font-semibold text-white mb-6">Instructor Dashboard</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <button className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-left">
                    <BookOpen className="w-8 h-8 text-rose-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">Manage Courses</h3>
                    <p className="text-gray-400 text-sm">Create and edit your courses</p>
                  </button>
                  <button className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-left">
                    <Users className="w-8 h-8 text-rose-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">View Students</h3>
                    <p className="text-gray-400 text-sm">Track student progress</p>
                  </button>
                  <button className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-left">
                    <Award className="w-8 h-8 text-rose-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">Assignments</h3>
                    <p className="text-gray-400 text-sm">Create and grade assignments</p>
                  </button>
                  <button className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-left">
                    <Clock className="w-8 h-8 text-rose-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">Upload Content</h3>
                    <p className="text-gray-400 text-sm">Add videos and materials</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {viewMode === 'mentorship' && (
          <div className="max-w-4xl mx-auto">
            <div className="glass-effect p-8 rounded-2xl text-center mb-8">
              <Users className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-3xl font-playfair font-bold text-white mb-4">Find Mentorship</h2>
              <p className="text-gray-300 mb-6">
                Get personalized guidance from industry professionals to accelerate your career growth and achieve your goals.
              </p>
              <button
                onClick={() => {
                  if (!user) {
                    alert('Please sign up or sign in to submit a mentorship request.');
                    navigate('/signin');
                    return;
                  }
                  setShowMentorshipModal(true);
                  setMentorshipRequestSent(false);
                }}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all"
              >
                Apply
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-effect p-6 rounded-xl">
                <Award className="w-10 h-10 text-rose-400 mb-3" />
                <h3 className="text-xl font-semibold text-white mb-2">Expert Guidance</h3>
                <p className="text-gray-300 text-sm">Learn from professionals with years of industry experience</p>
              </div>
              <div className="glass-effect p-6 rounded-xl">
                <Users className="w-10 h-10 text-rose-400 mb-3" />
                <h3 className="text-xl font-semibold text-white mb-2">Personalized Approach</h3>
                <p className="text-gray-300 text-sm">Get tailored advice based on your specific goals and challenges</p>
              </div>
              <div className="glass-effect p-6 rounded-xl">
                <BookOpen className="w-10 h-10 text-rose-400 mb-3" />
                <h3 className="text-xl font-semibold text-white mb-2">Career Development</h3>
                <p className="text-gray-300 text-sm">Receive strategic guidance to advance your career</p>
              </div>
              <div className="glass-effect p-6 rounded-xl">
                <CheckCircle className="w-10 h-10 text-rose-400 mb-3" />
                <h3 className="text-xl font-semibold text-white mb-2">Accountability</h3>
                <p className="text-gray-300 text-sm">Stay on track with regular check-ins and support</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast for wishlist actions */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="px-4 py-3 rounded-xl bg-gray-800/90 border border-white/10 text-white shadow-lg">
            {toastMessage}
          </div>
        </div>
      )}

      {showMentorshipModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-effect p-6 rounded-2xl max-w-md w-full">
            {!mentorshipRequestSent ? (
              <>
                <h3 className="text-xl font-semibold text-white mb-4">Request Mentorship</h3>
                <p className="text-gray-300 mb-4">
                  Submit a request for mentorship below
                </p>
                <form onSubmit={handleMentorshipRequest}>
                  <div className="space-y-4">
                    <textarea
                      className="w-full h-24 bg-transparent border border-gray-600 rounded-lg p-3 text-white resize-none focus:border-rose-400 outline-none"
                      placeholder="What do you need help with?"
                      required
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Request Sent!</h3>
                <p className="text-gray-300 mb-4">
                  Your mentorship request has been received for review. We will notify you once it's approved.
                </p>
                <p className="text-yellow-400 text-sm mb-4">
                  Please note: Mentorship is a premium feature.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowMentorshipModal(false)}
                    className="flex-1 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    className="flex-1 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-xl transition-all"
                  >
                    Upgrade to Premium
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
