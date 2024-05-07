import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PostState {
  post: string;
  add: (newPost: string) => void;
  clear: () => void;
}

export const usePostStore = create<PostState, [['zustand/devtools', never]]>(
  devtools((set) => ({
    post: '',
    add(newPost) {
      set((state) => ({ post: newPost }));
    },
    clear: () => set((state) => ({ post: '' })),
  })),
);
