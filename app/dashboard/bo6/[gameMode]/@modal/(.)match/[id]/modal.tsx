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

    // Disable scrolling on mount
    document.body.style.overflow = "hidden";

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
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
      <div className="relative w-full max-w-5xl">
        <button
          onClick={onDismiss}
          className="absolute top-2 right-2 z-50 p-2 rounded-full bg-black/30 hover:bg-black/50 w-8 h-8 flex items-center justify-center"
        >
          <span className="">X</span>
        </button>
        {children}
      </div>
    </dialog>,
    document.getElementById("modal-root")!
  );
}
