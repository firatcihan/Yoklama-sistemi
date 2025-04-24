import { create } from "zustand";

type store = {
  user: null | userType;
  setUser: (user: userType) => void;
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
}));

export default useAuthStore;
