import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Star,
  Phone,
  Mail,
  TrendingUp,
  Award,
  Filter,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Send,
  Calendar,
  DollarSign,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { ServiceProvider } from '../lib/firebase';

export default function OrganizeTab() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'reviews'>('rating');
  const [cart, setCart] = useState<{ provider: ServiceProvider; quantity: number }[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [eventDate, setEventDate] = useState('');
  const [eventNotes, setEventNotes] = useState('');

  const categories = [
    'all',
    'venue',
    'decor',
    'catering',
    'audio',
    'ushering',
    'photography',
    'entertainment',
    'security',
    'transport',
  ];

  const providers: ServiceProvider[] = [
    {
      id: '1',
      name: 'Grand Hall Venues',
      category: 'venue',
      description: 'Premier event venues for conferences, weddings, and corporate events',
      expertise: 'Large events, conferences, weddings',
      base_price: 2000000,
      rating: 4.8,
      reviews_count: 124,
      contact_email: 'info@grandhall.com',
      contact_phone: '+256-700-123456',
      portfolio_images: [],
      available: true,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Elite Tents & Decor',
      category: 'decor',
      description: 'Professional event decoration and tent rental services',
      expertise: 'Weddings, gala, corporate events',
      base_price: 450000,
      rating: 4.7,
      reviews_count: 78,
      contact_email: 'elite@tents.com',
      contact_phone: '+256-700-234567',
      portfolio_images: [],
      available: true,
      created_at: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Prime Ushers',
      category: 'ushering',
      description: 'Trained and professional ushering staff for all event types',
      expertise: 'Friendly, trained staff, crowd management',
      base_price: 120000,
      rating: 4.6,
      reviews_count: 46,
      contact_email: 'contact@primeushers.com',
      contact_phone: '+256-700-345678',
      portfolio_images: [],
      available: true,
      created_at: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'SoundWorks Ltd',
      category: 'audio',
      description: 'Complete audio solutions including PA systems and mixing',
      expertise: 'PA systems, mixing, live sound',
      base_price: 600000,
      rating: 4.9,
      reviews_count: 98,
      contact_email: 'hello@soundworks.com',
      contact_phone: '+256-700-456789',
      portfolio_images: [],
      available: true,
      created_at: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'CaterPro',
      category: 'catering',
      description: 'Full-service catering for events of all sizes',
      expertise: 'Buffet, plated service, dietary options',
      base_price: 350000,
      rating: 4.5,
      reviews_count: 65,
      contact_email: 'catering@caterpro.com',
      contact_phone: '+256-700-567890',
      portfolio_images: [],
      available: true,
      created_at: new Date().toISOString(),
    },
    {
      id: '6',
      name: 'LightUp Studios',
      category: 'photography',
      description: 'Professional event photography and videography',
      expertise: 'Weddings, corporate events, portraits',
      base_price: 800000,
      rating: 4.9,
      reviews_count: 112,
      contact_email: 'book@lightupstudios.com',
      contact_phone: '+256-700-678901',
      portfolio_images: [],
      available: true,
      created_at: new Date().toISOString(),
    },
    {
      id: '7',
      name: 'StarDJ Entertainment',
      category: 'entertainment',
      description: 'DJs, MCs, and live entertainment for events',
      expertise: 'Weddings, parties, corporate events',
      base_price: 500000,
      rating: 4.7,
      reviews_count: 89,
      contact_email: 'info@stardj.com',
      contact_phone: '+256-700-789012',
      portfolio_images: [],
      available: true,
      created_at: new Date().toISOString(),
    },
    {
      id: '8',
      name: 'SafeGuard Security',
      category: 'security',
      description: 'Professional event security and crowd control',
      expertise: 'Large events, VIP protection, access control',
      base_price: 400000,
      rating: 4.8,
      reviews_count: 73,
      contact_email: 'security@safeguard.com',
      contact_phone: '+256-700-890123',
      portfolio_images: [],
      available: true,
      created_at: new Date().toISOString(),
    },
    {
      id: '9',
      name: 'RideShare Transport',
      category: 'transport',
      description: 'Event transportation and shuttle services',
      expertise: 'Guest shuttles, VIP transport, logistics',
      base_price: 300000,
      rating: 4.6,
      reviews_count: 54,
      contact_email: 'ride@rideshare.com',
      contact_phone: '+256-700-901234',
      portfolio_images: [],
      available: true,
      created_at: new Date().toISOString(),
    },
  ];

  const filteredProviders = providers
    .filter((provider) => {
      const matchesCategory = selectedCategory === 'all' || provider.category === selectedCategory;
      const matchesSearch =
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.base_price - b.base_price;
      if (sortBy === 'reviews') return b.reviews_count - a.reviews_count;
      return b.rating - a.rating;
    });

  const addToCart = (provider: ServiceProvider) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.provider.id === provider.id);
      if (existing) {
        return prev.map((item) =>
          item.provider.id === provider.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { provider, quantity: 1 }];
    });
  };

  const removeFromCart = (providerId: string) => {
    setCart((prev) => prev.filter((item) => item.provider.id !== providerId));
  };

  const updateQuantity = (providerId: string, change: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.provider.id === providerId ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalCost = cart.reduce((sum, item) => sum + item.provider.base_price * item.quantity, 0);

  const handleCheckout = () => {
    if (!user) {
      alert('Please sign in to book providers.');
      navigate('/signin');
      return;
    }

    if (cart.length === 0) {
      alert('Please add providers to your cart.');
      return;
    }

    if (!eventDate) {
      alert('Please select an event date.');
      return;
    }

    alert(
      `Booking successful! Total: UGX ${(totalCost * 1.05).toLocaleString()}\n\nProviders will contact you shortly to confirm details.`
    );
    setCart([]);
    setEventDate('');
    setEventNotes('');
    setShowCheckout(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="glass-effect p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">Event Services Directory</h2>
              <p className="text-gray-300 text-sm">
                Browse and book professional event service providers. Compare ratings, reviews, and pricing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search providers or services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 glass-effect rounded-xl border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="flex-1 px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent focus:ring-2 focus:ring-rose-400"
              >
                <option value="rating" className="bg-gray-800">
                  Top Rated
                </option>
                <option value="price" className="bg-gray-800">
                  Price (Low to High)
                </option>
                <option value="reviews" className="bg-gray-800">
                  Most Reviewed
                </option>
              </select>
            </div>
          </div>

          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white'
                    : 'glass-effect text-gray-300 hover:text-white'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredProviders.map((provider) => (
              <div key={provider.id} className="glass-effect p-5 rounded-xl hover:bg-white/5 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{provider.name}</h3>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                        {provider.category}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{provider.description}</p>
                    <div className="flex items-center space-x-1 mb-2">
                      <Award className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300 text-sm">{provider.expertise}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold">{provider.rating.toFixed(1)}</span>
                        <span className="text-gray-400 text-sm">({provider.reviews_count} reviews)</span>
                      </div>
                      {provider.reviews_count > 80 && (
                        <div className="flex items-center space-x-1 text-purple-400">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-sm">Popular</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      {provider.contact_phone && (
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{provider.contact_phone}</span>
                        </div>
                      )}
                      {provider.contact_email && (
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{provider.contact_email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Starting at</div>
                      <div className="text-xl font-bold text-white">UGX {provider.base_price.toLocaleString()}</div>
                    </div>
                    <button
                      onClick={() => addToCart(provider)}
                      className="px-6 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center space-x-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProviders.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p>No providers found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="glass-effect p-6 rounded-2xl sticky top-24">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Budget Planner</span>
            </h3>
            {cart.length > 0 && (
              <span className="px-3 py-1 bg-rose-500 text-white text-sm font-semibold rounded-full">
                {cart.length}
              </span>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">
                Add service providers to build your event budget. Costs are calculated automatically.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.provider.id} className="bg-white/5 p-4 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm">{item.provider.name}</h4>
                        <p className="text-gray-400 text-xs">{item.provider.category}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.provider.id)}
                        className="text-rose-400 hover:text-rose-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.provider.id, -1)}
                          className="p-1 glass-effect rounded text-gray-300 hover:text-white"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.provider.id, 1)}
                          className="p-1 glass-effect rounded text-gray-300 hover:text-white"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-400">
                          {item.provider.base_price.toLocaleString()} × {item.quantity}
                        </div>
                        <div className="text-white font-semibold">
                          UGX {(item.provider.base_price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Subtotal</span>
                  <span className="text-white font-semibold">UGX {totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-300 text-sm">Service Fee (5%)</span>
                  <span className="text-white">UGX {(totalCost * 0.05).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-white font-bold">UGX {(totalCost * 1.05).toLocaleString()}</span>
                </div>
              </div>

              {showCheckout ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Event Date *
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-4 py-2 glass-effect rounded-xl border border-white/20 text-white focus:ring-2 focus:ring-rose-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Additional Notes</label>
                    <textarea
                      value={eventNotes}
                      onChange={(e) => setEventNotes(e.target.value)}
                      placeholder="Special requirements, preferences, etc."
                      className="w-full px-4 py-2 glass-effect rounded-xl border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-400 resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCheckout}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Confirm Booking</span>
                    </button>
                    <button
                      onClick={() => setShowCheckout(false)}
                      className="px-4 py-2 glass-effect text-gray-300 rounded-lg hover:text-white transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Proceed to Book</span>
                </button>
              )}

              <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                <p className="text-purple-300 text-xs leading-relaxed">
                  <DollarSign className="w-3 h-3 inline mr-1" />
                  Providers will contact you to confirm availability and finalize details before payment.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
