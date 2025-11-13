/*
  # Create Media, Likes, and Follows Tables

  1. New Tables
    - `media_content`
      - `id` (uuid, primary key)
      - `title` (text)
      - `creator_name` (text)
      - `creator_id` (uuid, foreign key to profiles)
      - `thumbnail_url` (text)
      - `content_url` (text)
      - `duration` (text, nullable)
      - `read_time` (text, nullable)
      - `category` (text)
      - `type` (text) - stream, listen, blog, gallery, resources
      - `content_type` (text) - music-video, movie, audio-music, etc.
      - `description` (text)
      - `price` (integer, nullable)
      - `rating` (numeric, default 0)
      - `is_premium` (boolean, default false)
      - `views_count` (integer, default 0)
      - `plays_count` (integer, default 0)
      - `sales_count` (integer, default 0)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `media_likes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `media_id` (uuid, foreign key to media_content)
      - `created_at` (timestamptz, default now())
      - Unique constraint on (user_id, media_id)
    
    - `creator_follows`
      - `id` (uuid, primary key)
      - `follower_id` (uuid, foreign key to profiles)
      - `creator_name` (text)
      - `created_at` (timestamptz, default now())
      - Unique constraint on (follower_id, creator_name)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read all content
    - Add policies for authenticated users to manage their own likes/follows
*/

-- Create media_content table
CREATE TABLE IF NOT EXISTS media_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  creator_name text NOT NULL,
  creator_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  thumbnail_url text,
  content_url text,
  duration text,
  read_time text,
  category text NOT NULL,
  type text NOT NULL,
  content_type text NOT NULL,
  description text,
  price integer,
  rating numeric DEFAULT 0,
  is_premium boolean DEFAULT false,
  views_count integer DEFAULT 0,
  plays_count integer DEFAULT 0,
  sales_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create media_likes table
CREATE TABLE IF NOT EXISTS media_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  media_id uuid NOT NULL REFERENCES media_content(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, media_id)
);

-- Create creator_follows table
CREATE TABLE IF NOT EXISTS creator_follows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  creator_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(follower_id, creator_name)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_media_likes_user_id ON media_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_media_likes_media_id ON media_likes(media_id);
CREATE INDEX IF NOT EXISTS idx_creator_follows_follower_id ON creator_follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_creator_follows_creator_name ON creator_follows(creator_name);
CREATE INDEX IF NOT EXISTS idx_media_content_type ON media_content(type);
CREATE INDEX IF NOT EXISTS idx_media_content_category ON media_content(category);

-- Enable Row Level Security
ALTER TABLE media_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_follows ENABLE ROW LEVEL SECURITY;

-- Policies for media_content
CREATE POLICY "Anyone can view media content"
  ON media_content FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Creators can insert their own content"
  ON media_content FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update their own content"
  ON media_content FOR UPDATE
  TO authenticated
  USING (auth.uid() = creator_id)
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can delete their own content"
  ON media_content FOR DELETE
  TO authenticated
  USING (auth.uid() = creator_id);

-- Policies for media_likes
CREATE POLICY "Users can view all likes"
  ON media_likes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own likes"
  ON media_likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes"
  ON media_likes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for creator_follows
CREATE POLICY "Users can view all follows"
  ON creator_follows FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own follows"
  ON creator_follows FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can delete their own follows"
  ON creator_follows FOR DELETE
  TO authenticated
  USING (auth.uid() = follower_id);