import React, { useState } from 'react';
import { Camera, Edit3, Eye, EyeOff, Plus, Star, Award, MapPin, Phone, Mail, Globe, Instagram, Twitter, Linkedin, Save, Upload, X, Mic } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Portfolio() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);

  const [portfolioData, setPortfolioData] = useState({
    profileImage: '',
    coverImage: '',
    bio: 'Passionate creative professional with expertise in digital marketing and brand development.',
    location: 'Kampala, Uganda',
    phone: '+256 772 123456',
    email: user?.email || '',
    website: 'www.example.com',
    socialMedia: {
      instagram: '@username',
      twitter: '@username',
      linkedin: 'linkedin.com/in/username'
    },
    skills: ['Digital Marketing', 'Brand Development', 'Content Creation', 'Social Media Strategy'],
    experience: [
      {
        title: 'Senior Marketing Specialist',
        company: 'Creative Agency Inc.',
        period: '2022 - Present',
        description: 'Led digital marketing campaigns for Fortune 500 clients, achieving 150% ROI improvement.'
      }
    ],
    education: [
      {
        degree: 'Bachelor of Marketing',
        institution: 'University of Arts',
        year: '2020',
        honors: 'Magna Cum Laude'
      }
    ],
    portfolio: [
      {
        id: 1,
        title: 'Brand Campaign 2025',
        type: 'image',
        thumbnail: 'https://images.pexels.com/photos/5257578/pexels-photo-5257578.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Complete brand identity redesign for tech startup'
      },
      {
        id: 2,
        title: 'Product Launch Video',
        type: 'video',
        thumbnail: 'https://images.pexels.com/photos/8000646/pexels-photo-8000646.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Creative direction for product launch campaign'
      }
    ],
    certifications: [
      { name: 'Digital Marketing Certification', issuer: 'Creative Arts Institute', year: '2025' },
      { name: 'Brand Ambassador Certification', issuer: 'Creative Arts Institute', year: '2025' }
    ],
    testimonials: [
      {
        client: 'Sarah Johnson',
        company: 'Tech Innovations',
        rating: 5,
        comment: 'Exceptional work quality and professional approach. Highly recommended!'
      }
    ],
    awards: [
      { name: 'Creative of the Year', issuer: 'Creative Excellence Awards', year: '2025' },
      { name: 'Best Marketing Campaign', issuer: 'Digital Media Awards', year: '2024' },
    ],
    interviews: [
      { title: 'The Future of Branding', platform: 'Creative Minds Podcast', date: '2025-10-15' },
      { title: 'A Journey in Digital Marketing', platform: 'The Marketing Show', date: '2025-09-01' },
    ]
  });

  const handleSendToMedia = (content: any) => {
    setSelectedContent(content);
    setShowMediaModal(true);
  };

  const confirmSendToMedia = () => {
    // Simulate sending to media for admin review
    alert('Content sent for admin review. You will be notified once it\'s approved!');
    setShowMediaModal(false);
    setSelectedContent(null);
  };

  const addSkill = () => {
    const skill = prompt('Enter new skill:');
    if (skill) {
      setPortfolioData({
        ...portfolioData,
        skills: [...portfolioData.skills, skill]
      });
    }
  };

  const removeSkill = (index: number) => {
    setPortfolioData({
      ...portfolioData,
      skills: portfolioData.skills.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-playfair font-bold text-white mb-2">Portfolio</h1>
            <p className="text-gray-300">Professional record of my work</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">Public</span>
              <button
                onClick={() => setIsPublic(!isPublic)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isPublic ? 'bg-rose-500' : 'bg-gray-600'
                }`}
                disabled={user?.tier === 'free'}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isPublic ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              {user?.tier === 'free' && (
                <span className="text-yellow-400 text-sm">Premium required</span>
              )}
            </div>
            
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isEditing
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gradient-to-r from-rose-500 to-purple-600 hover:shadow-xl text-white'
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
                  Edit Portfolio
                </>
              )}
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative mb-8">
          <div className="h-64 bg-gradient-to-r from-rose-400 via-purple-500 to-pink-500 rounded-2xl overflow-hidden">
            {portfolioData.coverImage ? (
              <img src={portfolioData.coverImage} alt="Cover" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white">
                  <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="opacity-75">Add cover image</p>
                </div>
              </div>
            )}
          </div>
          
          {isEditing && (
            <button className="absolute top-4 right-4 p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-colors">
              <Upload className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="space-y-6">
            {/* Profile Image & Basic Info */}
            <div className="glass-effect p-6 rounded-2xl">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-rose-400 to-purple-500 p-1">
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                      {portfolioData.profileImage ? (
                        <img src={portfolioData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-2 bg-rose-500 rounded-full text-white hover:bg-rose-600 transition-colors">
                      <Upload className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-white mt-4">{user?.name}</h2>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-gray-300 ml-2">4.9 (127 reviews)</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={portfolioData.location}
                      onChange={(e) => setPortfolioData({...portfolioData, location: e.target.value})}
                      className="bg-transparent border-b border-gray-600 focus:border-rose-400 outline-none flex-1"
                    />
                  ) : (
                    <span>{portfolioData.location}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-4 h-4 text-rose-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={portfolioData.phone}
                      onChange={(e) => setPortfolioData({...portfolioData, phone: e.target.value})}
                      className="bg-transparent border-b border-gray-600 focus:border-rose-400 outline-none flex-1"
                    />
                  ) : (
                    <span>{portfolioData.phone}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-4 h-4 text-rose-400" />
                  <span>{portfolioData.email}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-gray-300">
                  <Globe className="w-4 h-4 text-rose-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={portfolioData.website}
                      onChange={(e) => setPortfolioData({...portfolioData, website: e.target.value})}
                      className="bg-transparent border-b border-gray-600 focus:border-rose-400 outline-none flex-1"
                    />
                  ) : (
                    <span>{portfolioData.website}</span>
                  )}
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className="text-white font-semibold mb-3">Social Media</h3>
                <div className="flex space-x-3">
                  <Instagram className="w-5 h-5 text-pink-400 hover:text-pink-300 cursor-pointer" />
                  <Twitter className="w-5 h-5 text-blue-400 hover:text-blue-300 cursor-pointer" />
                  <Linkedin className="w-5 h-5 text-blue-600 hover:text-blue-500 cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Awards & Recognitions */}
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">Awards & Recognitions</h3>
              <div className="space-y-3">
                {portfolioData.awards.map((award, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-yellow-400 mt-1" />
                    <div>
                      <div className="text-white font-medium">{award.name}</div>
                      <div className="text-gray-400 text-sm">{award.issuer} • {award.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interviews & Features */}
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">Interviews & Features</h3>
              <div className="space-y-3">
                {portfolioData.interviews.map((interview, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Mic className="w-5 h-5 text-blue-400 mt-1" />
                    <div>
                      <div className="text-white font-medium">{interview.title}</div>
                      <div className="text-gray-400 text-sm">{interview.platform} • {new Date(interview.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="glass-effect p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">Skills</h3>
                {isEditing && (
                  <button
                    onClick={addSkill}
                    className="p-1 text-rose-400 hover:text-rose-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.map((skill, index) => (
                  <div key={index} className="relative group">
                    <span className="px-3 py-1 bg-gradient-to-r from-rose-400/20 to-purple-500/20 text-rose-300 rounded-full text-sm border border-rose-400/30">
                      {skill}
                    </span>
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(index)}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-2 h-2 text-white" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">Certifications</h3>
              <div className="space-y-3">
                {portfolioData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-yellow-400 mt-1" />
                    <div>
                      <div className="text-white font-medium">{cert.name}</div>
                      <div className="text-gray-400 text-sm">{cert.issuer} • {cert.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Portfolio Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">About Me</h3>
              {isEditing ? (
                <textarea
                  value={portfolioData.bio}
                  onChange={(e) => setPortfolioData({...portfolioData, bio: e.target.value})}
                  className="w-full h-24 bg-transparent border border-gray-600 rounded-lg p-3 text-white resize-none focus:border-rose-400 outline-none"
                  placeholder="Tell your story..."
                />
              ) : (
                <p className="text-gray-300 leading-relaxed">{portfolioData.bio}</p>
              )}
            </div>

            {/* Highlights */}
            <div className="glass-effect p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Highlights</h3>
                {isEditing && (
                  <button className="px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                    <Plus className="w-4 h-4 mr-2 inline" />
                    Add Work
                  </button>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {portfolioData.portfolio.map((item) => (
                  <div key={item.id} className="group relative">
                    <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => handleSendToMedia(item)}
                          className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                        >
                          Send to Media
                        </button>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h4 className="text-white font-medium">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">Experience</h3>
              <div className="space-y-4">
                {portfolioData.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-rose-400 pl-4">
                    <h4 className="text-white font-semibold">{exp.title}</h4>
                    <div className="text-rose-400 text-sm">{exp.company} • {exp.period}</div>
                    <p className="text-gray-300 text-sm mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">Client Testimonials</h3>
              <div className="space-y-4">
                {portfolioData.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 italic mb-2">"{testimonial.comment}"</p>
                    <div className="text-sm">
                      <span className="text-white font-medium">{testimonial.client}</span>
                      <span className="text-gray-400"> - {testimonial.company}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Send to Media Modal */}
        {showMediaModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glass-effect p-6 rounded-2xl max-w-md w-full">
              <h3 className="text-xl font-semibold text-white mb-4">Send to Media</h3>
              <p className="text-gray-300 mb-4">
                Send "{selectedContent?.title}" to the Media section for admin review?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={confirmSendToMedia}
                  className="flex-1 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Send for Review
                </button>
                <button
                  onClick={() => setShowMediaModal(false)}
                  className="flex-1 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
