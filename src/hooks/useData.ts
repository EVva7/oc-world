import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { User, World, OC, Comment, Favorite, Follow, Notification, UserSettings } from '../types';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) throw error;
      return data as User[];
    },
  });
}

export function useUser(id: string | null) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
      if (error) throw error;
      return data as User;
    },
    enabled: !!id,
  });
}

export function useWorlds() {
  return useQuery({
    queryKey: ['worlds'],
    queryFn: async () => {
      const { data: worlds, error } = await supabase
        .from('worlds')
        .select('*, author:users(nickname)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return worlds.map(w => ({
        ...w,
        author_nickname: (w.author as any)?.nickname
      })) as World[];
    },
  });
}

export function useWorld(id: string | null) {
  return useQuery({
    queryKey: ['world', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('worlds')
        .select('*, author:users(nickname)')
        .eq('id', id)
        .single();
      if (error) throw error;
      return { ...data, author_nickname: (data.author as any)?.nickname } as World;
    },
    enabled: !!id,
  });
}

export function useOCs(filters?: { world_id?: string; author_id?: string }) {
  return useQuery({
    queryKey: ['ocs', filters],
    queryFn: async () => {
      let query = supabase
        .from('ocs')
        .select('*, author:users(nickname), world:worlds(name)')
        .order('created_at', { ascending: false });
      
      if (filters?.world_id) query = query.eq('world_id', filters.world_id);
      if (filters?.author_id) query = query.eq('author_id', filters.author_id);
      
      const { data, error } = await query;
      if (error) throw error;
      return data.map(oc => ({
        ...oc,
        author_nickname: (oc.author as any)?.nickname,
        world_name: (oc.world as any)?.name
      })) as OC[];
    },
  });
}

export function useOC(id: string | null) {
  return useQuery({
    queryKey: ['oc', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('ocs')
        .select('*, author:users(nickname), world:worlds(name)')
        .eq('id', id)
        .single();
      if (error) throw error;
      return { 
        ...data, 
        author_nickname: (data.author as any)?.nickname,
        world_name: (data.world as any)?.name
      } as OC;
    },
    enabled: !!id,
  });
}

export function useComments(ocId: string) {
  return useQuery({
    queryKey: ['comments', ocId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*, user:users(nickname, avatar)')
        .eq('oc_id', ocId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data.map(c => ({
        ...c,
        user_nickname: (c.user as any)?.nickname,
        user_avatar: (c.user as any)?.avatar
      })) as Comment[];
    },
    enabled: !!ocId,
  });
}

export function useFavorites(userId: string | null) {
  return useQuery({
    queryKey: ['favorites', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId);
      if (error) throw error;
      return data as Favorite[];
    },
    enabled: !!userId,
  });
}

export function useFollows(userId: string | null) {
  return useQuery({
    queryKey: ['follows', userId],
    queryFn: async () => {
      if (!userId) return { following: [], followers: [] };
      const [following, followers] = await Promise.all([
        supabase.from('follows').select('*').eq('follower_id', userId),
        supabase.from('follows').select('*').eq('following_id', userId),
      ]);
      return {
        following: following.data || [],
        followers: followers.data || [],
      } as { following: Follow[]; followers: Follow[] };
    },
    enabled: !!userId,
  });
}

export function useNotifications(userId: string | null) {
  return useQuery({
    queryKey: ['notifications', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Notification[];
    },
    enabled: !!userId,
  });
}

export function useUserSettings(userId: string | null) {
  return useQuery({
    queryKey: ['userSettings', userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .single();
      if (error) return null;
      return data as UserSettings;
    },
    enabled: !!userId,
  });
}
