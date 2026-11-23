"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface BannerProps {
  show: boolean;
}

export const Banner: React.FC<BannerProps> = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="birthday-banner"
          initial={{ y: -600, rotate: -18, opacity: 0 }}
          animate={{
            y: [ -600, 25, -12, 6, 0 ],
            rotate: [ -18, 10, -6, 3, 0 ],
            opacity: 1,
          }}
          exit={{ y: -600, opacity: 0, transition: { duration: 0.8 } }}
          transition={{
            duration: 3.2,
            times: [0, 0.45, 0.7, 0.88, 1],
            ease: "easeOut",
          }}
          className="w-full flex justify-center z-15 relative mt-1 sm:mt-3 pointer-events-none px-4"
        >
          <div className="relative w-full max-w-xl sm:max-w-2xl md:max-w-3xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]">
            <Image
              src="/assets/images/happy-birthday-nida-transparent.png"
              alt="Happy Birthday Banner"
              width={1200}
              height={400}
              className="w-full h-auto object-contain mx-auto"
              priority
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
