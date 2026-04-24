import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAppStore } from '../stores/appStore';
import type { World, OC, Comment, Favorite, Follow } from '../types';

export function useCreateWorld() {
  const queryClient = useQueryClient();
  const { addWorld, currentUser } = useAppStore();
  
  return useMutation({
    mutationFn: async (data: Partial<World>) => {
      const { data: world, error } = await supabase
        .from('worlds')
        .insert({
          name: data.name,
          description: data.description,
          image: data.image,
          author_id: currentUser?.id,
          is_public: data.is_public ?? true,
          tags: data.tags || [],
        })
        .select()
        .single();
      if (error) throw error;
      return world as World;
    },
    onSuccess: (world) => {
      queryClient.invalidateQueries({ queryKey: ['worlds'] });
      addWorld(world);
    },
  });
}

export function useUpdateWorld() {
  const queryClient = useQueryClient();
  const { updateWorld } = useAppStore();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<World> }) => {
      const { data: world, error } = await supabase
        .from('worlds')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return world as World;
    },
    onSuccess: (world) => {
      queryClient.invalidateQueries({ queryKey: ['worlds'] });
      updateWorld(world.id, world);
    },
  });
}

export function useDeleteWorld() {
  const queryClient = useQueryClient();
  const { deleteWorld } = useAppStore();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('worlds').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['worlds'] });
      deleteWorld(id);
    },
  });
}

export function useCreateOC() {
  const queryClient = useQueryClient();
  const { addOC, currentUser } = useAppStore();
  
  return useMutation({
    mutationFn: async (data: Partial<OC>) => {
      const { data: oc, error } = await supabase
        .from('ocs')
        .insert({
          name: data.name,
          image: data.image,
          description: data.description,
          author_id: currentUser?.id,
          world_id: data.world_id,
          tags: data.tags || [],
        })
        .select()
        .single();
      if (error) throw error;
      return oc as OC;
    },
    onSuccess: (oc) => {
      queryClient.invalidateQueries({ queryKey: ['ocs'] });
      addOC(oc);
    },
  });
}

export function useUpdateOC() {
  const queryClient = useQueryClient();
  const { updateOC } = useAppStore();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<OC> }) => {
      const { data: oc, error } = await supabase
        .from('ocs')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return oc as OC;
    },
    onSuccess: (oc) => {
      queryClient.invalidateQueries({ queryKey: ['ocs'] });
      updateOC(oc.id, oc);
    },
  });
}

export function useDeleteOC() {
  const queryClient = useQueryClient();
  const { deleteOC } = useAppStore();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('ocs').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['ocs'] });
      deleteOC(id);
    },
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();
  const { addComment, currentUser } = useAppStore();
  
  return useMutation({
    mutationFn: async ({ ocId, content }: { ocId: string; content: string }) => {
      const { data: comment, error } = await supabase
        .from('comments')
        .insert({
          oc_id: ocId,
          user_id: currentUser?.id,
          content,
        })
        .select()
        .single();
      if (error) throw error;
      return {
        ...comment,
        user_nickname: currentUser?.nickname,
        user_avatar: currentUser?.avatar
      } as Comment;
    },
    onSuccess: (comment) => {
      queryClient.invalidateQueries({ queryKey: ['comments', comment.oc_id] });
      addComment(comment);
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const { deleteComment } = useAppStore();
  
  return useMutation({
    mutationFn: async ({ id, ocId: _ocId }: { id: string; ocId: string }) => {
      const { error } = await supabase.from('comments').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_, { id, ocId }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', ocId] });
      deleteComment(id);
    },
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { addFavorite, removeFavorite, currentUser } = useAppStore();
  
  return useMutation({
    mutationFn: async (ocId: string) => {
      const { data: existing } = await supabase
        .from('favorites')
        .select('*')
        .eq('oc_id', ocId)
        .eq('user_id', currentUser?.id)
        .single();
      
      if (existing) {
        await supabase.from('favorites').delete().eq('id', existing.id);
        return { action: 'remove', favorite: existing };
      } else {
        const { data: favorite, error } = await supabase
          .from('favorites')
          .insert({
            oc_id: ocId,
            user_id: currentUser?.id,
          })
          .select()
          .single();
        if (error) throw error;
        return { action: 'add', favorite: favorite as Favorite };
      }
    },
    onSuccess: ({ action, favorite }) => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      if (action === 'add') {
        addFavorite(favorite);
      } else {
        removeFavorite(favorite.oc_id);
      }
    },
  });
}

export function useToggleFollow() {
  const queryClient = useQueryClient();
  const { addFollow, removeFollow, currentUser } = useAppStore();
  
  return useMutation({
    mutationFn: async (userId: string) => {
      const { data: existing } = await supabase
        .from('follows')
        .select('*')
        .eq('following_id', userId)
        .eq('follower_id', currentUser?.id)
        .single();
      
      if (existing) {
        await supabase.from('follows').delete().eq('id', existing.id);
        return { action: 'unfollow', follow: existing };
      } else {
        const { data: follow, error } = await supabase
          .from('follows')
          .insert({
            following_id: userId,
            follower_id: currentUser?.id,
          })
          .select()
          .single();
        if (error) throw error;
        return { action: 'follow', follow: follow as Follow };
      }
    },
    onSuccess: ({ action, follow }) => {
      queryClient.invalidateQueries({ queryKey: ['follows'] });
      if (action === 'follow') {
        addFollow(follow);
      } else {
        removeFollow(follow.following_id);
      }
    },
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  const { markNotificationRead } = useAppStore();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      markNotificationRead(id);
    },
  });
}
