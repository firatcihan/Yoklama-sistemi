import { useRef, useState, useEffect } from "react";
import { useClickAway } from "react-use";
import useModalStore from "@/stores/modal";
import { ModalProps } from "./allModals";

interface ModalWrapperProps {
  element: React.ComponentType<ModalProps & any>;
  data?: any;
  isTop: boolean;
}

export default function ModalWrapper({
  element: Component,
  data,
  isTop,
}: ModalWrapperProps) {
  const { closeModal } = useModalStore();
  const modalRef = useRef<HTMLDivElement>(null);

  // local state to trigger animation exactly once
  const [playedIn, setPlayedIn] = useState(false);

  // when this becomes the top modal, play the animation
  useEffect(() => {
    if (isTop) {
      setPlayedIn(true);
    }
  }, [isTop]);

  useClickAway(modalRef, (event) => {
    if (!isTop) return;
    if ((event.target as Element)?.closest(".dontClose")) return;
    closeModal();
  });

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        zIndex: 10,
        pointerEvents: isTop ? "auto" : "none",
      }}
    >
      <div
        ref={modalRef}
        className={`
          rounded-md bg-white p-1.5
          transition-all duration-200
          ${!isTop ? "opacity-10 scale-[0.97]" : ""}
          ${playedIn && isTop ? "animate-modalIn" : ""}
        `}
      >
        <Component close={closeModal} {...data} />
      </div>
    </div>
  );
}
