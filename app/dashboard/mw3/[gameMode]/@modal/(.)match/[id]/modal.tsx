"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  onDismiss: () => void;
  renderCloseButton: (onDismiss: () => void) => React.ReactNode;
}

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="fixed inset-0 h-screen w-full flex items-center justify-center p-4 bg-black bg-opacity-75 text-white"
      onClose={onDismiss}
    >
      <button
        onClick={onDismiss}
        className="close-button absolute top-8 right-8  bg-white p-2 rounded-full text-black w-8 h-8 md:w-16 md:h-16 flex items-center justify-center"
      >
        <span className="sm:text-xl">X</span>
      </button>
      {children}
    </dialog>,
    document.getElementById("modal-root")!
  );
}
