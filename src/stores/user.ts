
import create from 'zustand';

type UserStore = {
  user: any;
  storeUser: (user: any) => void;
  removeUser: (id: string) => void;
};

export const useUserStore = create<UserStore>(set => ({
  user: {} as any,
  storeUser: data => set({ user: data }),
  removeUser: id =>
    set(state => (state.user?.user?.id === id ? {} : state.user)),
}));
