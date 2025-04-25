import { create } from "zustand";

type store = {
  user: null | userType;
  setUser: (user: userType) => void;
  logoutUser: () => void;
};

type userType = {
  classes?: {
    id: string;
    lectureCode: string;
  }[];
  assignedClasses?: [
    {
      id: string;
      lectureCode: string;
    },
  ];
  createTime: string;
  lastUpdateTime: string;
  email: string;
  id: string;
  name: string;
  role: string;
  studentNumber?: string;
};

const useAuthStore = create<store>()((set) => ({
  user: null,
  setUser: (user: userType) => set({ user }),
  logoutUser: () =>
    set({
      user: null,
    }),
}));

export default useAuthStore;
