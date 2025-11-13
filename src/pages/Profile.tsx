import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Crown, Star, Gift, Share2, Edit3, Save, Camera, Shield, Bell, CreditCard, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, updateUser, switchRole } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+256 772 123456',
    location: 'Kampala, Uganda',
    bio: 'Passionate creative professional with expertise in digital marketing and brand development.',
    website: 'www.example.com',
    birthday: '1995-06-15'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    eventReminders: true,
    portfolioPublic: true,
    showContactInfo: false
  });

  const handleSave = () => {
    updateUser({ name: profileData.name });
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleUpgrade = () => {
    alert('Upgrade feature coming soon! Contact our team for premium options.');
  };

  const generateReferralCode = () => {
    return `REF-${user?.name?.toUpperCase().replace(/\s+/g, '')}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'account', label: 'Account', icon: <Crown className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy', icon: <Shield className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> }
  ];

  const achievements = [
    { name: 'First Portfolio Created', date: '2025-11-01', icon: '🎨' },
    { name: 'Brand Ambassador Certified', date: '2025-11-05', icon: '👑' },
    { name: '100 Followers Milestone', date: '2025-11-08', icon: '🎉' },
    { name: 'First Masterclass Completed', date: '2025-11-12', icon: '🎓' }
  ];

  const getTierBenefits = (tier: string) => {
    const benefits = {
      free: ['Basic Portfolio', 'Community Access', 'Public Gallery'],
      premium: ['Advanced Portfolio', 'Media Streaming', 'Career Guidance', 'Priority Support'],
      professional: ['Everything in Premium', 'Masterclass Access', 'Team Collaboration', 'Analytics'],
      elite: ['Everything in Professional', '1-on-1 Mentorship', 'Featured Listings', 'API Access']
    };
    return benefits[tier as keyof typeof benefits] || benefits.free;
  };

  const getTierColor = (tier: string) => {
    const colors = {
      free: 'from-gray-500 to-gray-600',
      premium: 'from-yellow-400 to-orange-500',
      professional: 'from-purple-500 to-pink-500',
      elite: 'from-pink-500 to-rose-500'
    };
    return colors[tier as keyof typeof colors] || colors.free;
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-gray-300">Manage your account and preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-6 sticky top-24">
              {/* Profile Summary */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-rose-400 to-purple-500 p-1">
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                      {user?.profileImage ? (
                        <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <button className="absolute bottom-0 right-0 p-1 bg-rose-500 rounded-full text-white hover:bg-rose-600 transition-colors">
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
                
                <h3 className="text-lg font-semibold text-white">{user?.name}</h3>
                <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm bg-gradient-to-r ${getTierColor(user?.tier || 'free')}`}>
                  <Crown className="w-3 h-3 text-white" />
                  <span className="text-white font-medium capitalize">{user?.tier}</span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Profile Information */}
                <div className="glass-effect rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-white">Profile Information</h2>
                    <button
                      onClick={isEditing ? handleSave : () => setIsEditing(true)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        isEditing
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-gradient-to-r from-rose-500 to-purple-600 text-white hover:shadow-lg'
                      }`}
                    >
                      {isEditing ? (
                        <>
                          <Save className="w-4 h-4 mr-2 inline" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Edit3 className="w-4 h-4 mr-2 inline" />
                          Edit Profile
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          className="w-full px-4 py-3 glass-effect rounded-lg border border-white/20 text-white focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                        />
                      ) : (
                        <div className="px-4 py-3 glass-effect rounded-lg text-white">{profileData.name}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Email</label>
                      <div className="px-4 py-3 glass-effect rounded-lg text-gray-400">{profileData.email}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="w-full px-4 py-3 glass-effect rounded-lg border border-white/20 text-white focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                        />
                      ) : (
                        <div className="px-4 py-3 glass-effect rounded-lg text-white">{profileData.phone}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Location</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                          className="w-full px-4 py-3 glass-effect rounded-lg border border-white/20 text-white focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                        />
                      ) : (
                        <div className="px-4 py-3 glass-effect rounded-lg text-white">{profileData.location}</div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-white mb-2">Bio</label>
                      {isEditing ? (
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          rows={4}
                          className="w-full px-4 py-3 glass-effect rounded-lg border border-white/20 text-white resize-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                        />
                      ) : (
                        <div className="px-4 py-3 glass-effect rounded-lg text-white min-h-[100px]">{profileData.bio}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Milestones */}
                <div className="glass-effect rounded-2xl p-6">
                  <h2 className="text-2xl font-semibold text-white mb-6">Milestones</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <div className="text-white font-medium">{achievement.name}</div>
                          <div className="text-gray-400 text-sm">{new Date(achievement.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                {/* Account Switcher */}
                <div className="glass-effect rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white">Account Type</h3>
                      <p className="text-gray-300">
                        Your current role is: <span className="font-semibold capitalize">{user?.role}</span>
                      </p>
                    </div>
                    <button
                      onClick={switchRole}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Switch to {user?.role === 'creator' ? 'Member' : 'Creator'}</span>
                    </button>
                  </div>
                </div>

                {/* Membership Status */}
                <div className="glass-effect rounded-2xl p-6">
                  <h2 className="text-2xl font-semibold text-white mb-6">Membership Status</h2>
                  
                  <div className={`p-6 rounded-xl bg-gradient-to-r ${getTierColor(user?.tier || 'free')} mb-6`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white capitalize">{user?.tier} Member</h3>
                        <p className="text-white/80">Member since {user?.joinedDate.toLocaleDateString()}</p>
                      </div>
                      <Crown className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Current Benefits</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {getTierBenefits(user?.tier || 'free').map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {user?.tier === 'free' && (
                    <button
                      onClick={handleUpgrade}
                      className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-xl transition-all"
                    >
                      Upgrade to Premium
                    </button>
                  )}
                </div>

                {/* Loyalty Points */}
                <div className="glass-effect rounded-2xl p-6">
                  <h2 className="text-2xl font-semibold text-white mb-6">Loyalty Points</h2>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-3xl font-bold text-yellow-400">{user?.loyaltyPoints || 0}</div>
                      <div className="text-gray-300">Available Points</div>
                    </div>
                    <Gift className="w-12 h-12 text-yellow-400" />
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Next Reward</span>
                      <span className="text-gray-300">500 points</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((user?.loyaltyPoints || 0) / 500) * 100}%` }}
                      />
                    </div>
                  </div>

                  <button className="w-full py-3 glass-effect text-white rounded-xl hover:bg-white/10 transition-colors">
                    View Rewards Catalog
                  </button>
                </div>

                {/* Referral Program */}
                <div className="glass-effect rounded-2xl p-6">
                  <h2 className="text-2xl font-semibold text-white mb-6">Referral Program</h2>
                  
                  <div className="mb-6">
                    <p className="text-gray-300 mb-4">
                      Invite friends and earn 100 loyalty points for each successful referral!
                    </p>
                    
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={generateReferralCode()}
                        readOnly
                        className="flex-1 px-4 py-3 glass-effect rounded-lg text-white border border-white/20"
                      />
                      <button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                        <Share2 className="w-4 h-4 mr-2 inline" />
                        Share
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">12</div>
                      <div className="text-gray-400 text-sm">Invites Sent</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">8</div>
                      <div className="text-gray-400 text-sm">Successful</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">800</div>
                      <div className="text-gray-400 text-sm">Points Earned</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="glass-effect rounded-2xl p-6">
                <h2 className="text-2xl font-semibold text-white mb-6">Privacy Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Public Portfolio</h3>
                      <p className="text-gray-400 text-sm">Allow others to view your portfolio</p>
                    </div>
                    <button
                      onClick={() => setPreferences({...preferences, portfolioPublic: !preferences.portfolioPublic})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.portfolioPublic ? 'bg-rose-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.portfolioPublic ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Show Contact Information</h3>
                      <p className="text-gray-400 text-sm">Display your contact details on your profile</p>
                    </div>
                    <button
                      onClick={() => setPreferences({...preferences, showContactInfo: !preferences.showContactInfo})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.showContactInfo ? 'bg-rose-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.showContactInfo ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="glass-effect rounded-2xl p-6">
                <h2 className="text-2xl font-semibold text-white mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Email Notifications</h3>
                      <p className="text-gray-400 text-sm">Receive important updates via email</p>
                    </div>
                    <button
                      onClick={() => setPreferences({...preferences, emailNotifications: !preferences.emailNotifications})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.emailNotifications ? 'bg-rose-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Push Notifications</h3>
                      <p className="text-gray-400 text-sm">Get instant notifications on your device</p>
                    </div>
                    <button
                      onClick={() => setPreferences({...preferences, pushNotifications: !preferences.pushNotifications})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.pushNotifications ? 'bg-rose-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Marketing Emails</h3>
                      <p className="text-gray-400 text-sm">Receive promotional content and offers</p>
                    </div>
                    <button
                      onClick={() => setPreferences({...preferences, marketingEmails: !preferences.marketingEmails})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.marketingEmails ? 'bg-rose-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Event Reminders</h3>
                      <p className="text-gray-400 text-sm">Get notified about upcoming events</p>
                    </div>
                    <button
                      onClick={() => setPreferences({...preferences, eventReminders: !preferences.eventReminders})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.eventReminders ? 'bg-rose-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.eventReminders ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
