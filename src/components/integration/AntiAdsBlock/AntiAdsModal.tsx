"use client"

import { useEffect } from "react";
import { HandRaisedIcon, NoSymbolIcon } from "@heroicons/react/24/outline";

type AntiAdsModalProps = {
  onClose: () => void;
};

export default function AntiAdsModal({ onClose }: AntiAdsModalProps) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleReload = () => {
    onClose();
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80">
      <div className="relative isolate mx-4 w-full max-w-md overflow-hidden rounded-xl bg-gradient-to-t from-main-600/80 to-main-800/80 p-6 shadow-2xl ring-1 ring-white/10">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white">
          <HandRaisedIcon className="h-7 w-7 text-white" aria-hidden="true" />
        </div>
        <h2 className="mb-2 text-center text-lg font-semibold text-white">
          Bloqueio de anúncios detectado
        </h2>
        <p className="mb-6 text-center text-sm text-gray-300">
          Para continuar usando o site, desative seu bloqueador de anúncios e
          recarregue a página.
        </p>
        <div className="flex items-center justify-center">
          <button
            onClick={handleReload}
            className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm cursor-pointer bg-main-950 hover:bg-main-800/80 border border-white"
          >
            Eu desativei meu Adblock
          </button>
        </div>
      </div>
    </div>
  );
}