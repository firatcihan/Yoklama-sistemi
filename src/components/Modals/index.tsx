import Modals from "./allModals";
import useModalStore from "@/stores/modal";
import ModalWrapper from "@/components/Modals/modalWrapper.tsx";

export default function Modal() {
  const { modal: modalStack } = useModalStore();

  if (modalStack.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000a6]">
      {modalStack.map((modal, index) => {
        const modalComponent = Modals.find((m) => m.name === modal.name);
        if (!modalComponent) return null;

        const isTop = index === modalStack.length - 1;

        return (
          <ModalWrapper
            key={index}
            element={modalComponent.element}
            data={modal.data}
            isTop={isTop}
          />
        );
      })}
    </div>
  );
}
