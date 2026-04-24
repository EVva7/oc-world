import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, World, OC, Comment, Favorite, Follow, Notification, UserSettings } from '../types';

interface AppState {
  currentUser: User | null;
  currentOC: OC | null;
  currentView: 'hall' | 'worlds' | 'my' | 'profile' | 'chat' | 'notifications' | 'auth';
  currentMode: 'all' | 'my' | 'favorites';
  theme: 'light' | 'dark';
  isLoading: boolean;
  
  worlds: World[];
  ocs: OC[];
  comments: Comment[];
  favorites: Favorite[];
  follows: { following: Follow[]; followers: Follow[] };
  notifications: Notification[];
  userSettings: UserSettings | null;
  
  setCurrentUser: (user: User | null) => void;
  setCurrentOC: (oc: OC | null) => void;
  setCurrentView: (view: AppState['currentView']) => void;
  setCurrentMode: (mode: AppState['currentMode']) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setIsLoading: (loading: boolean) => void;
  
  setWorlds: (worlds: World[]) => void;
  setOCs: (ocs: OC[]) => void;
  setComments: (comments: Comment[]) => void;
  setFavorites: (favorites: Favorite[]) => void;
  setFollows: (follows: AppState['follows']) => void;
  setNotifications: (notifications: Notification[]) => void;
  setUserSettings: (settings: UserSettings | null) => void;
  
  addWorld: (world: World) => void;
  updateWorld: (id: string, data: Partial<World>) => void;
  deleteWorld: (id: string) => void;
  
  addOC: (oc: OC) => void;
  updateOC: (id: string, data: Partial<OC>) => void;
  deleteOC: (id: string) => void;
  
  addComment: (comment: Comment) => void;
  deleteComment: (id: string) => void;
  
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (ocId: string) => void;
  
  addFollow: (follow: Follow) => void;
  removeFollow: (userId: string) => void;
  
  markNotificationRead: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentUser: null,
      currentOC: null,
      currentView: 'auth',
      currentMode: 'all',
      theme: 'light',
      isLoading: false,
      
      worlds: [],
      ocs: [],
      comments: [],
      favorites: [],
      follows: { following: [], followers: [] },
      notifications: [],
      userSettings: null,
      
      setCurrentUser: (user) => set({ currentUser: user }),
      setCurrentOC: (oc) => set({ currentOC: oc }),
      setCurrentView: (view) => set({ currentView: view }),
      setCurrentMode: (mode) => set({ currentMode: mode }),
      setTheme: (theme) => set({ theme }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      
      setWorlds: (worlds) => set({ worlds }),
      setOCs: (ocs) => set({ ocs }),
      setComments: (comments) => set({ comments }),
      setFavorites: (favorites) => set({ favorites }),
      setFollows: (follows) => set({ follows }),
      setNotifications: (notifications) => set({ notifications }),
      setUserSettings: (settings) => set({ userSettings: settings }),
      
      addWorld: (world) => set((state) => ({ worlds: [...state.worlds, world] })),
      updateWorld: (id, data) => set((state) => ({
        worlds: state.worlds.map((w) => w.id === id ? { ...w, ...data } : w)
      })),
      deleteWorld: (id) => set((state) => ({
        worlds: state.worlds.filter((w) => w.id !== id)
      })),
      
      addOC: (oc) => set((state) => ({ ocs: [...state.ocs, oc] })),
      updateOC: (id, data) => set((state) => ({
        ocs: state.ocs.map((o) => o.id === id ? { ...o, ...data } : o)
      })),
      deleteOC: (id) => set((state) => ({
        ocs: state.ocs.filter((o) => o.id !== id)
      })),
      
      addComment: (comment) => set((state) => ({ comments: [...state.comments, comment] })),
      deleteComment: (id) => set((state) => ({
        comments: state.comments.filter((c) => c.id !== id)
      })),
      
      addFavorite: (favorite) => set((state) => ({ favorites: [...state.favorites, favorite] })),
      removeFavorite: (ocId) => set((state) => ({
        favorites: state.favorites.filter((f) => f.oc_id !== ocId)
      })),
      
      addFollow: (follow) => set((state) => ({
        follows: { ...state.follows, following: [...state.follows.following, follow] }
      })),
      removeFollow: (userId) => set((state) => ({
        follows: {
          ...state.follows,
          following: state.follows.following.filter((f) => f.following_id !== userId)
        }
      })),
      
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) => 
          n.id === id ? { ...n, is_read: true } : n
        )
      })),
    }),
    {
      name: 'oc-world-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        theme: state.theme,
      }),
    }
  )
);
