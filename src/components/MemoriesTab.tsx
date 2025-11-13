import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageCircle,
  Image as ImageIcon,
  Send,
  Camera,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MemoriesTab() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'journal' | 'chat'>('journal');
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!user) {
      alert('Please sign in to chat.');
      navigate('/signin');
      return;
    }

    if (!newMessage.trim()) return;

    alert('Message posted successfully!');
    setNewMessage('');
  };

  return (
    <div className="space-y-6">
      <div className="glass-effect p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2 flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-rose-400" />
              <span>Event Memories</span>
            </h2>
            <p className="text-gray-300 text-sm">
              Share your experiences, highlights, and photos. Connect with others who attended the same events.
            </p>
          </div>
          {user && (
            <button
              onClick={() => alert('Share Memory feature coming soon!')}
              className="px-6 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <Camera className="w-5 h-5" />
              <span>Share Memory</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setActiveView('journal')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeView === 'journal'
                ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white'
                : 'glass-effect text-gray-300 hover:text-white'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            <span>Memory Journal</span>
          </button>
          <button
            onClick={() => setActiveView('chat')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeView === 'chat'
                ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white'
                : 'glass-effect text-gray-300 hover:text-white'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Community Chat</span>
          </button>
        </div>
      </div>

      {activeView === 'journal' ? (
        <div className="text-center py-12 glass-effect rounded-2xl">
          <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Memories Yet</h3>
          <p className="text-gray-400">
            {user
              ? 'Be the first to share memories from past events!'
              : 'Sign in to share your event memories.'}
          </p>
        </div>
      ) : (
        <div className="glass-effect rounded-2xl overflow-hidden">
          <div className="h-96 overflow-y-auto p-6">
            <div className="text-center py-8 text-gray-400">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Share your thoughts about the event..."
                className="flex-1 px-4 py-3 glass-effect rounded-xl border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
              />
              <button
                onClick={handleSendMessage}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
