import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abcdef',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export type Event = {
  id: string;
  title: string;
  description: string;
  category: 'social' | 'networking' | 'business';
  date: string;
  time: string;
  location: string;
  organizer: string;
  organizer_id: string | null;
  image_url: string | null;
  price: number;
  rating: number;
  features: string[];
  speakers: string[];
  status: 'upcoming' | 'happening' | 'past';
  is_livestream: boolean;
  livestream_url: string | null;
  created_at: string;
  updated_at: string;
};

export type ServiceProvider = {
  id: string;
  name: string;
  category: 'venue' | 'decor' | 'catering' | 'audio' | 'ushering' | 'photography' | 'entertainment' | 'security' | 'transport';
  description: string;
  expertise: string;
  base_price: number;
  rating: number;
  reviews_count: number;
  contact_email: string | null;
  contact_phone: string | null;
  portfolio_images: string[];
  available: boolean;
  created_at: string;
};

export type EventMemory = {
  id: string;
  event_id: string;
  user_id: string;
  content: string;
  highlights: string[];
  photos: string[];
  rating: number | null;
  created_at: string;
};

export type MemoryChat = {
  id: string;
  event_id: string | null;
  user_id: string;
  message: string;
  parent_id: string | null;
  created_at: string;
};

export type ProviderBooking = {
  id: string;
  provider_id: string;
  user_id: string;
  event_id: string | null;
  quantity: number;
  total_cost: number;
  booking_date: string;
  event_date: string;
  status: 'confirmed' | 'cancelled' | 'pending' | 'completed';
  notes: string | null;
};
