import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Image, Headphones, ShoppingBag, Heart, Share2, MessageCircle, Eye, Filter, Search, Star, Download, Rss } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Media() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stream');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mediaContent = {
    stream: [
      {
        id: 1,
        title: 'Unstoppable -Official Music Video',
        creator: 'Jasmine Carter',
        thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: '4:15',
        views: 150000,
        likes: 12000,
        category: 'music-video',
        isPremium: false,
        type: 'music-video'
      },
      {
        id: 2,
        title: 'The Last Stand - Short Film',
        creator: 'David Lee',
        thumbnail: 'https://images.pexels.com/photos/269140/pexels-photo-269140.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: '12:30',
        views: 89000,
        likes: 7500,
        category: 'movie',
        isPremium: true,
        type: 'movie'
      }
    ],
    listen: [
      {
        id: 1,
        title: 'Sunset Groove',
        creator: 'DJ Alex',
        thumbnail: 'https://images.pexels.com/photos/417273/pexels-photo-417273.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: '3:45',
        plays: 25000,
        category: 'electronic',
        isPremium: false,
        type: 'audio-music'
      },
      {
        id: 2,
        title: 'Acoustic Soul',
        creator: 'Maya Patel',
        thumbnail: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: '2:50',
        plays: 18000,
        category: 'acoustic',
        isPremium: false,
        type: 'audio-music'
      }
    ],
    blog: [
        {
            id: 1,
            title: 'Interview with Legends',
            creator: 'Maria Ryan',
            thumbnail: 'https://images.pexels.com/photos/6953768/pexels-photo-6953768.jpeg?auto=compress&cs=tinysrgb&w=400',
            readTime: '5 min read',
            category: 'branding',
        }
    ],
    gallery: [
      {
        id: 1,
        title: 'Brand Manual & Presets',
        creator: 'Maya Chen',
        image: 'https://images.pexels.com/photos/5554667/pexels-photo-5554667.jpeg?auto=compress&cs=tinysrgb&w=400',
        likes: 1200,
        category: 'design',
        isPremium: false
      },
      {
        id: 2,
        title: 'Portrait Photography Collection',
        creator: 'Jedi Martinez',
        image: 'https://images.pexels.com/photos/4027606/pexels-photo-4027606.jpeg?auto=compress&cs=tinysrgb&w=400',
        likes: 2100,
        category: 'photography',
        isPremium: true
      }
    ],
    resources: [
      {
        id: 1,
        title: 'Social Media Templates Pack',
        creator: 'Design Studio Pro',
        image: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 115000,
        rating: 4.8,
        sales: 1250,
        category: 'templates'
      },
      {
        id: 2,
        title: 'Producer\'s Key Sound Kit',
        creator: 'Beat Smith',
        image: 'https://images.pexels.com/photos/3990842/pexels-photo-3990842.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 190000,
        rating: 4.9,
        sales: 890,
        category: 'sound-kit'
      },
      {
          id: 3,
          title: 'Freelancer\'s Guide to Contracts',
          creator: 'Legal',
          image: 'https://images.pexels.com/photos/8428076/pexels-photo-8428076.jpeg?auto=compress&cs=tinysrgb&w=400',
          price: 95000,
          rating: 4.7,
          sales: 540,
          category: 'templates'
      }
    ]
  };

  const categories = {
    stream: ['all', 'movie', 'music-video', 'documentaries', 'lifesyle', 'Go Live'],
    listen: ['all', 'greatest-of-all-time', 'latest-release', 'new-talent', 'DJ-mixtapes', 'UG-Unscripted', 'Afrobeat', 'hip-hop', 'RnB', 'Others'],
    blog: ['all', 'interviews', 'lifestyle', 'product-reviews', 'others'],
    gallery: ['all', 'design', 'photography', 'art', 'others'],
    resources: ['all', 'templates', 'ebooks', 'software', 'presets']
  };

  const tabs = [
    { id: 'stream', label: 'Stream', icon: <Play className="w-5 h-5" /> },
    { id: 'listen', label: 'Listen', icon: <Headphones className="w-5 h-5" /> },
    { id: 'blog', label: 'Blog', icon: <Rss className="w-5 h-5" /> },
    { id: 'gallery', label: 'Gallery', icon: <Image className="w-5 h-5" /> },
    { id: 'resources', label: 'Resources', icon: <ShoppingBag className="w-5 h-5" /> }
  ];

  function maskNumber(n: number): string {
    const digits = String(Math.max(1, Math.abs(Math.trunc(n)))).length;
    return '-'.repeat(digits);
  }
  function maskRating(r: number): string {
    return '-'.repeat((Number.isFinite(r) ? r : 0).toFixed(1).length);
  }

  const handleFollow = (creatorId: string) => {
    if (!user) {
      alert('Please sign up or sign in to follow creators.');
      navigate('/signin');
      return;
    }
    alert('Following creator! You will receive notifications for new content.');
  };

  const handleTip = (creatorId: string) => {
    if (!user) {
      alert('Please sign up or sign in to tip creators.');
      navigate('/signin');
      return;
    }
    alert('Tip feature coming soon! Support your favorite creators.');
  };

  const handleSubscribe = (creatorId: string) => {
    if (!user) {
      alert('Please sign up or sign in to subscribe.');
      navigate('/signin');
      return;
    }
    alert('Premium subscription activated! Enjoy exclusive content.');
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-white mb-2">Media</h1>
          <p className="text-gray-300">Celebrate amazing content from the Creators of your choice.</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 glass-effect p-2 rounded-xl overflow-x-auto whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass-effect rounded-xl border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
            >
              {categories[activeTab as keyof typeof categories]?.map((category) => (
                <option key={category} value={category} className="bg-gray-800">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mediaContent[activeTab as keyof typeof mediaContent]?.map((item: any) => (
            <div key={item.id} className="glass-effect rounded-2xl overflow-hidden hover-lift group">
              {/* Thumbnail/Image */}
              <div className="relative aspect-video bg-gray-800">
                <img 
                  src={activeTab === 'stream' ? item.thumbnail : activeTab === 'listen' ? item.thumbnail : activeTab === 'blog' ? item.thumbnail : item.image}
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {activeTab === 'stream' && (
                    <Play className="w-12 h-12 text-white" />
                  )}
                  {activeTab === 'listen' && (
                    <Headphones className="w-12 h-12 text-white" />
                  )}
                  {activeTab === 'blog' && (
                    <Rss className="w-12 h-12 text-white" />
                  )}
                  {activeTab === 'resources' && (
                    <ShoppingBag className="w-12 h-12 text-white" />
                  )}
                </div>

                {/* Premium Badge */}
                {item.isPremium && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full">
                    PREMIUM
                  </div>
                )}

                {/* Duration/Info */}
                {(activeTab === 'stream' || activeTab === 'listen') && (
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                    {item.duration}
                  </div>
                )}
                {activeTab === 'blog' && (
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                    {item.readTime}
                  </div>
                )}
              </div>

              {/* Content Info */}
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{item.creator}</p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  {activeTab === 'stream' && (
                    <>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{maskNumber(item.views)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{maskNumber(item.likes)}</span>
                      </div>
                    </>
                  )}
                  {activeTab === 'listen' && (
                    <div className="flex items-center space-x-1">
                      <Play className="w-4 h-4" />
                      <span>{maskNumber(item.plays)} plays</span>
                    </div>
                  )}
                  {activeTab === 'blog' && (
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{maskNumber(Math.floor(Math.random() * 100))}</span>
                    </div>
                  )}
                  {activeTab === 'gallery' && (
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{maskNumber(item.likes)}</span>
                    </div>
                  )}
                  
                  {activeTab === 'resources' && (
                    <>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{maskRating(item.rating)}</span>
                      </div>
                      <div className="text-rose-400 font-bold">UGX --</div>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {activeTab === 'resources' ? (
                    <>
                      <button className="flex-1 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium">
                        Buy Now
                      </button>
                      <button className="p-2 glass-effect text-gray-400 hover:text-white rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleFollow(item.creator)}
                        className="flex-1 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                      >
                        Follow
                      </button>
                      <button
                        onClick={() => handleTip(item.creator)}
                        className="p-2 glass-effect text-gray-400 hover:text-white rounded-lg transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-2 glass-effect text-gray-400 hover:text-white rounded-lg transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Premium Subscription CTA */}
                {item.isPremium && user?.tier === 'free' && (
                  <div className="mt-3 p-3 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 rounded-lg">
                    <p className="text-yellow-400 text-xs mb-2">Premium content - Subscribe to unlock</p>
                    <button
                      onClick={() => handleSubscribe(item.creator)}
                      className="w-full py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded"
                    >
                      Subscribe Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {mediaContent[activeTab as keyof typeof mediaContent]?.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              {activeTab === 'stream' && <Play className="w-16 h-16 mx-auto mb-4" />}
              {activeTab === 'listen' && <Headphones className="w-16 h-16 mx-auto mb-4" />}
              {activeTab === 'blog' && <Rss className="w-16 h-16 mx-auto mb-4" />}
              {activeTab === 'gallery' && <Image className="w-16 h-16 mx-auto mb-4" />}
              {activeTab === 'resources' && <ShoppingBag className="w-16 h-16 mx-auto mb-4" />}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No content available</h3>
            <p className="text-gray-400">Check back later for new {activeTab} content!</p>
          </div>
        )}
      </div>
    </div>
  );
}
