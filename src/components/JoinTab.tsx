import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import type { Event } from '../lib/firebase';
import EventCard from './EventCard';

interface JoinTabProps {
  searchQuery: string;
  selectedCategory: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

export default function JoinTab({
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
}: JoinTabProps) {
  const [nowTime, setNowTime] = useState(Date.now());
  const [calendarAdded, setCalendarAdded] = useState<Record<string, boolean>>({});

  const categories = ['all', 'social', 'networking', 'business'];

  useEffect(() => {
    const t = setInterval(() => setNowTime(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const events: Event[] = [
    {
      id: '1',
      title: 'The Advertising Summit',
      category: 'business',
      date: '2025-11-15',
      time: '10:00 AM - 6:00 PM EAT',
      location: 'Virtual Event',
      organizer: 'Creative Arts Institute',
      organizer_id: null,
      image_url: 'https://tinuiti.com/wp-content/uploads/2024/12/2025-amazon-and-retail-media-summit-featured.webp?auto=compress&cs=tinysrgb&w=800',
      description: 'A momentous occasion of advertising insights, creative strategies, and networking.',
      price: 380000,
      rating: 4.8,
      features: ['Live Sessions', 'Networking', 'Certificates', 'Recordings'],
      speakers: ['Sarah Johnson', 'Mike Chen', 'Emma Wilson'],
      status: 'upcoming',
      is_livestream: false,
      livestream_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Talent Show',
      category: 'social',
      date: '2025-11-20',
      time: '7:00 PM - 10:00 PM EAT',
      location: 'Kampala, Uganda',
      organizer: 'Creative Collective',
      organizer_id: null,
      image_url: 'https://static.vecteezy.com/system/resources/thumbnails/035/924/440/small_2x/show-talent-podium-3d-retro-talent-show-podium-with-microphone-show-scene-stage-studio-or-room-vector.jpg',
      description: 'Showcase your talent and compete for amazing prizes. Open to all creative professionals.',
      price: 95000,
      rating: 4.9,
      features: ['Live Judging', 'Prizes', 'Networking', 'Media Coverage'],
      speakers: ['Celebrity Judges Panel'],
      status: 'upcoming',
      is_livestream: false,
      livestream_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      title: "The Patrons' Forum",
      category: 'networking',
      date: '2025-11-25',
      time: '6:00 PM - 9:00 PM EAT',
      location: 'Kampala, Uganda',
      organizer: 'The Patrons',
      organizer_id: null,
      image_url: 'https://cassette.sphdigital.com.sg/image/thepeak/8895ea9e31e92e0644e57b997d762a1a209a9cbf171f5f3a9aed2e210c6d6333?auto=compress&cs=tinysrgb&w=800',
      description: 'Recognition for Patrons contributions to the flourishing Arts.',
      price: 285000,
      rating: 4.7,
      features: ['Networking', 'Panel Discussion', 'Cocktails', 'Business Cards'],
      speakers: ['Dr. Maria Rodriguez', 'Jedi Martinez'],
      status: 'upcoming',
      is_livestream: false,
      livestream_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Brand Ambassador Masterclass',
      category: 'business',
      date: '2025-10-28',
      time: '2:00 PM - 5:00 PM EAT',
      location: 'Virtual Event',
      organizer: 'Creative Arts Institute',
      organizer_id: null,
      image_url: 'https://images.pexels.com/photos/6285080/pexels-photo-6285080.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Learn the secrets of successful brand ambassadorship from industry experts.',
      price: 560000,
      rating: 4.9,
      features: ['Interactive Sessions', 'Case Studies', 'Q&A', 'Certificate'],
      speakers: ['Ruby Nesda', 'Maya Chen'],
      status: 'past',
      is_livestream: false,
      livestream_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch && event.status === 'upcoming';
  });

  const toggleCalendar = (eventId: string) => {
    setCalendarAdded((prev) => {
      const added = !!prev[eventId];
      const next = { ...prev, [eventId]: !added };
      if (!added) {
        setTimeout(() => {
          if (window.confirm('Added to calendar. Get reminders?')) {
            alert('Reminders enabled for this event.');
          }
        }, 10);
      } else {
        alert('Removed from calendar.');
      }
      return next;
    });
  };

  const handleShare = (event: Event) => {
    const shareData = {
      title: event.title,
      text: event.description,
      url: window.location.href + '#event-' + event.id,
    };
    if ((navigator as any).share) {
      (navigator as any).share(shareData).catch(() => {});
    } else {
      navigator.clipboard?.writeText(shareData.url).then(() => alert('Event link copied to clipboard'));
    }
  };

  const handleRegister = (eventId: string) => {
    alert('Registration functionality will be implemented with authentication.');
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 glass-effect rounded-xl border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Filter className="text-gray-400 w-5 h-5" />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
          >
            {categories.map((category) => (
              <option key={category} value={category} className="bg-gray-800">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              nowTime={nowTime}
              calendarAdded={calendarAdded}
              onToggleCalendar={toggleCalendar}
              onShare={handleShare}
              onRegister={handleRegister}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
          <p className="text-gray-400">Try adjusting your search criteria or check back later for new events.</p>
        </div>
      )}
    </>
  );
}
