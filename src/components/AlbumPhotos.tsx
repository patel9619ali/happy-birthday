"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

interface AlbumPhotosProps {
  show: boolean;
  onSelectPhoto: (src: string, index: number) => void;
}

const PHOTOS = [
  {
    id: 1,
    src: "/assets/images/photo1.png",
    alt: "Precious Memory 1",
    side: "left",
    positionClasses: "top-20 sm:top-24 left-2 sm:left-8 md:left-14",
    rotation: -5,
  },
  {
    id: 2,
    src: "/assets/images/photo2.png",
    alt: "Precious Memory 2",
    side: "left",
    positionClasses: "top-72 sm:top-80 left-4 sm:left-12 md:left-20",
    rotation: 4,
  },
  {
    id: 3,
    src: "/assets/images/photo3.png",
    alt: "Precious Memory 3",
    side: "right",
    positionClasses: "top-20 sm:top-24 right-2 sm:right-8 md:right-14",
    rotation: 5,
  },
  {
    id: 4,
    src: "/assets/images/photo4.png",
    alt: "Precious Memory 4",
    side: "right",
    positionClasses: "top-72 sm:top-80 right-4 sm:right-12 md:right-20",
    rotation: -4,
  },
];

export const AlbumPhotos: React.FC<AlbumPhotosProps> = ({ show, onSelectPhoto }) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-auto">
          {PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.6, y: 40, rotate: photo.rotation * 2 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: photo.rotation }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.4 } }}
              transition={{
                delay: 0.2 + index * 0.15,
                type: "spring",
                stiffness: 140,
                damping: 15,
              }}
              whileHover={{
                scale: 1.12,
                rotate: 0,
                zIndex: 40,
                transition: { duration: 0.25 },
              }}
              onClick={() => onSelectPhoto(photo.src, index)}
              className={`fixed hidden lg:block ${photo.positionClasses} z-10 cursor-pointer group`}
            >
              <div className="relative p-2.5 sm:p-3 bg-white rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-shadow group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-neutral-100">
                {/* Vintage tape effect on top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-amber-100/70 border border-amber-200/50 backdrop-blur-xs rotate-1 shadow-xs rounded-xs pointer-events-none" />

                <div className="relative w-44 sm:w-56 md:w-64 h-32 sm:h-40 md:h-44 overflow-hidden rounded-lg bg-neutral-100">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 180px, 260px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-xs">
                      <ZoomIn className="w-3.5 h-3.5" /> Zoom
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Hint badge: "Click to Zoom" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="fixed hidden lg:block top-[480px] right-12 z-20 pointer-events-none"
          >
            <div className="relative w-40 sm:w-48 h-auto drop-shadow-md animate-bounce">
              <Image
                src="/assets/images/can-zoom.png"
                alt="Click on photos to zoom"
                width={200}
                height={80}
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
