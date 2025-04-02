import Modals from "./allModals";
import useModalStore from "@/stores/modal";
import { useClickAway } from "react-use";
import { useRef } from "react";

export default function Modal() {
    const { modal, closeModal } = useModalStore();
    const modalRef = useRef(null);

    useClickAway(modalRef, (event) => {
        if ((event.target as Element)?.closest('.dontClose')) return;
        closeModal();
    });

    if (!modal) return null;
    const currentModal = modal.name
        ? Modals.find((m) => m.name === modal.name)
        : false;

    return (
        <div className="fixed inset-0 flex items-center bg-[#000000a6] justify-center z-20">
            <div ref={modalRef} className="overflow-auto rounded-2xl">
                {currentModal && <currentModal.element close={closeModal} />}
            </div>
        </div>
    );
}
