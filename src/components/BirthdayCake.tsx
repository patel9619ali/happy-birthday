"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, Flame } from "lucide-react";
import { fireCelebrationConfetti } from "@/lib/confetti";

interface BirthdayCakeProps {
  showCake: boolean;
  candleLit: boolean;
  onToggleFlame?: () => void;
  personImage?: string;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({
  showCake,
  candleLit,
  onToggleFlame,
  personImage = "/assets/images/person.jpeg",
}) => {
  return (
    <AnimatePresence>
      {showCake && (
        <motion.div
          key="birthday-cake-container"
          initial={{ opacity: 0, scale: 0.7, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 80, transition: { duration: 0.5 } }}
          transition={{
            type: "spring",
            stiffness: 110,
            damping: 15,
            duration: 0.8,
          }}
          className="relative w-[300px] h-[300px] mx-auto z-25 flex items-center justify-center select-none"
        >
          {/* Base Plate Shadow */}
          <div className="absolute bottom-0 left-0 w-[300px] h-[10px] bg-white/90 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.4)]" />

          {/* Sponge Cake (Bizcocho) */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[160px] h-[100px] bg-[#6d3826] rounded-t-lg shadow-inner overflow-hidden border-b-4 border-[#4a2418]">
            {/* Cake layers */}
            <div className="absolute top-[30%] left-0 w-full h-[14px] bg-[#ece7e3]/80 shadow-xs" />
            <div className="absolute top-[60%] left-0 w-full h-[14px] bg-[#ece7e3]/80 shadow-xs" />
          </div>

          {/* Frosting / Cobertura */}
          <div className="absolute top-[56%] left-1/2 -translate-x-1/2 w-[174px] h-[38px] bg-[#ece7e3] rounded-full z-10 shadow-md">
            {/* Dripping frosting droplets */}
            <div className="absolute -bottom-3 right-8 w-4 h-7 bg-[#ece7e3] rounded-full shadow-xs" />
            <div className="absolute -bottom-2 right-14 w-3.5 h-5 bg-[#ece7e3] rounded-full shadow-xs" />
            <div className="absolute -bottom-3.5 left-10 w-4 h-8 bg-[#ece7e3] rounded-full shadow-xs" />
            <div className="absolute -bottom-2 left-6 w-3 h-5 bg-[#ece7e3] rounded-full shadow-xs" />
          </div>

          {/* Candle (Velas) */}
          <div
            onClick={onToggleFlame}
            className="absolute top-[38%] left-1/2 -translate-x-1/2 w-[15px] h-[52px] bg-white rounded-t-sm z-20 cursor-pointer group shadow-sm"
          >
            {/* Candle red diagonal stripes */}
            <div className="absolute top-[25%] left-0 w-full h-[7px] bg-red-500/60" />
            <div className="absolute top-[55%] left-0 w-full h-[7px] bg-red-500/60" />
            {/* Candle wick */}
            <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-[2px] h-[8px] bg-neutral-800" />

            {/* Candle Flame (Fuego) with 5 animated flame layers */}
            <AnimatePresence>
              {candleLit && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -top-[35px] left-1/2 -translate-x-1/2 w-[22px] h-[40px] pointer-events-none"
                >
                  {/* Warm aura glow */}
                  <div className="absolute -inset-4 bg-amber-400/30 rounded-full blur-xl animate-pulse pointer-events-none" />

                  {/* 5 Layered CSS flame animations */}
                  <div className="absolute inset-0 rounded-full flame-1" />
                  <div className="absolute inset-0 rounded-full flame-2" />
                  <div className="absolute inset-0 rounded-full flame-3" />
                  <div className="absolute inset-0 rounded-full flame-4" />
                  <div className="absolute inset-0 rounded-full flame-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Picture Next to Cake */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 6 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="absolute bottom-6 -right-16 sm:-right-24 w-32 sm:w-36 h-32 sm:h-36 p-2 bg-white rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.35)] border-4 border-white z-20 cursor-pointer"
            onClick={() => fireCelebrationConfetti()}
          >
            <div className="relative w-full h-full overflow-hidden rounded-xl bg-pink-100">
              <Image
                src={personImage}
                alt="Birthday Person"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -top-3 -right-2 bg-rose-500 text-white rounded-full p-1 shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
