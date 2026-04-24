export interface User {
  id: string;
  nickname: string;
  avatar?: string;
  bio?: string;
  website?: string;
  role: 'user' | 'admin' | 'guest';
  created_at: string;
  updated_at?: string;
  github_id?: string;
  email?: string;
}

export interface UserSettings {
  id: string;
  user_id: string;
  theme: 'light' | 'dark';
  language: string;
  notifications_enabled: boolean;
}

export interface World {
  id: string;
  name: string;
  description?: string;
  image?: string;
  author_id: string;
  author_nickname?: string;
  is_public: boolean;
  tags?: string[];
  oc_count?: number;
  created_at: string;
  updated_at?: string;
}

export interface OC {
  id: string;
  name: string;
  image?: string;
  description?: string;
  author_id: string;
  author_nickname?: string;
  world_id?: string;
  world_name?: string;
  tags?: string[];
  likes_count?: number;
  comments_count?: number;
  favorites_count?: number;
  is_featured?: boolean;
  created_at: string;
  updated_at?: string;
}

export interface OCConnection {
  id: string;
  oc1_id: string;
  oc2_id: string;
  relationship: string;
  description?: string;
  created_at: string;
}

export interface Comment {
  id: string;
  oc_id: string;
  user_id: string;
  user_nickname?: string;
  user_avatar?: string;
  content: string;
  created_at: string;
  updated_at?: string;
}

export interface Favorite {
  id: string;
  oc_id: string;
  user_id: string;
  created_at: string;
}

export interface Follow {
  id: string;
  following_id: string;
  follower_id: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'like' | 'comment' | 'follow' | 'system' | 'message';
  title: string;
  content: string;
  is_read: boolean;
  link?: string;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface DMMessage {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface Friend {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted';
  created_at: string;
}

export interface Report {
  id: string;
  reporter_id: string;
  target_type: 'oc' | 'user' | 'comment';
  target_id: string;
  reason: string;
  status: 'pending' | 'resolved';
  created_at: string;
}

export interface DBData {
  users: User[];
  worlds: World[];
  ocs: OC[];
  comments: Comment[];
  favorites: Favorite[];
  follows: { following: Follow[]; followers: Follow[] };
  notifications: Notification[];
  messages: Message[];
  dmMessages: DMMessage[];
  friends: Friend[];
  reports: Report[];
  user_settings: UserSettings;
}
