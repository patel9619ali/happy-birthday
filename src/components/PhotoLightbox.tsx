"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";

interface PhotoLightboxProps {
  selectedPhoto: string | null;
  photoIndex: number;
  photos: { src: string; alt: string }[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  selectedPhoto,
  photoIndex,
  photos,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!selectedPhoto) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {selectedPhoto && (
        <motion.div
          key="photo-lightbox-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          {/* Top toolbar */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-60 pointer-events-none">
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-auto border border-white/10 text-xs sm:text-sm">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>{photos[photoIndex]?.alt || "Photo"} ({photoIndex + 1} of {photos.length})</span>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all pointer-events-auto backdrop-blur-sm border border-white/10 cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-3 sm:left-6 z-60 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-sm border border-white/10 cursor-pointer"
            title="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-3 sm:right-6 z-60 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-sm border border-white/10 cursor-pointer"
            title="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Photo Card */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full max-h-[82vh] bg-white p-3 sm:p-4 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex flex-col items-center"
          >
            <div className="relative w-full h-[55vh] sm:h-[65vh] rounded-xl overflow-hidden bg-neutral-900">
              <Image
                src={selectedPhoto}
                alt={photos[photoIndex]?.alt || "Enlarged Memory Photo"}
                fill
                sizes="(max-width: 1024px) 90vw, 800px"
                className="object-contain"
                priority
              />
            </div>

            <p className="mt-3 text-xs sm:text-sm text-neutral-600 font-medium tracking-wide">
              Click anywhere outside or press Esc to close • Arrow keys to browse
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
