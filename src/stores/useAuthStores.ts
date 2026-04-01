import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  name?: string;
  avatar?: string;
  email: string;  
  token?: string;  
};

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void; 
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage", 
    },
  ),
);