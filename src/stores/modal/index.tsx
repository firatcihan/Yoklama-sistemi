// /stores/modal.ts
import { create } from "zustand";

interface ModalData {
  name: string;
  data?: any;
}

interface ModalStore {
  modal: ModalData[];
  setModal: (modal: ModalData) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  modal: [],
  setModal: (modal) =>
    set((state) => ({ modal: [...state.modal, modal] })),
  closeModal: () =>
    set((state) => ({
      modal: state.modal.slice(0, -1),
    })),
}));

export default useModalStore;
