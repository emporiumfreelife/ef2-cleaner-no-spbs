import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import type { Event } from '../lib/firebase';
import EventCard from './EventCard';

interface LivestreamTabProps {
  searchQuery: string;
  selectedCategory: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

export default function LivestreamTab({
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
}: LivestreamTabProps) {
  const [nowTime, setNowTime] = useState(Date.now());
  const [calendarAdded, setCalendarAdded] = useState<Record<string, boolean>>({});

  const categories = ['all', 'social', 'networking', 'business'];

  useEffect(() => {
    const t = setInterval(() => setNowTime(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const events: Event[] = [
    {
      id: '5',
      title: 'Live Concert - Dawn Fever',
      category: 'social',
      date: new Date().toISOString().split('T')[0],
      time: 'Now',
      location: 'Main Auditorium',
      organizer: 'LiveEvents Ltd',
      organizer_id: null,
      image_url: 'https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Never miss a beat. Attend or stream as a premium subscriber or on VIP ticket.',
      price: 150000,
      rating: 4.9,
      features: ['Live Performance', 'Merch', 'Meet & Greet'],
      speakers: ['Headline Artist'],
      status: 'happening',
      is_livestream: true,
      livestream_url: 'https://stream.example.com/dawn-fever',
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

    return matchesCategory && matchesSearch;
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
            placeholder="Search livestream events..."
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

      <div className="mb-6 glass-effect p-4 rounded-xl border-l-4 border-rose-500">
        <h3 className="text-white font-semibold mb-2">Livestream Events</h3>
        <p className="text-gray-300 text-sm">
          Watch events live from anywhere. Premium and Elite members get full access to all livestream events.
        </p>
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
          <h3 className="text-xl font-semibold text-white mb-2">No livestream events found</h3>
          <p className="text-gray-400">Check back later for upcoming livestream events.</p>
        </div>
      )}
    </>
  );
}
