import { create } from "zustand";
type Store = {
  modal: { name: string; data?: string | undefined } | false;
  setModal: (name: string, data?: string) => void;
  closeModal: () => void;
};

const useModalStore = create<Store>()((set) => ({
  modal: false,
  setModal: (name, data) => set({ modal: { name, data } }),
  closeModal: () => set({ modal: false }),
}));

export default useModalStore;
