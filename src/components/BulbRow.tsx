"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface BulbRowProps {
  lightsOn: boolean;
  musicPlaying: boolean;
}

const BULBS = [
  { id: "yellow", color: "yellow", pulseClass: "bulb-pulse-yellow", glowColor: "#ffd43b" },
  { id: "red", color: "red", pulseClass: "bulb-pulse-red", glowColor: "#fa5252" },
  { id: "blue", color: "blue", pulseClass: "bulb-pulse-blue", glowColor: "#339af0" },
  { id: "green", color: "green", pulseClass: "bulb-pulse-green", glowColor: "#40c057" },
  { id: "pink", color: "pink", pulseClass: "bulb-pulse-pink", glowColor: "#e64980" },
  { id: "orange", color: "orange", pulseClass: "bulb-pulse-orange", glowColor: "#fd7e14" },
];

export const BulbRow: React.FC<BulbRowProps> = ({ lightsOn, musicPlaying }) => {
  return (
    <div className="w-full max-w-4xl mx-auto pt-2 sm:pt-4 px-2 sm:px-4 z-20 relative">
      {/* Wire connecting bulbs */}
      <div className="absolute top-6 sm:top-8 left-8 right-8 h-[2px] bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-800 -z-10 shadow-sm" />
      
      <div className="grid grid-cols-6 gap-2 sm:gap-4 items-start justify-items-center">
        {BULBS.map((bulb, index) => {
          const isGlowing = lightsOn;
          const isPulsing = musicPlaying;
          const imgSrc = isGlowing
            ? `/assets/images/bulbs/bulb_${bulb.color}.png`
            : `/assets/images/bulbs/bulb.png`;

          return (
            <motion.div
              key={bulb.id}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.08, duration: 0.5, type: "spring" }}
              whileHover={{ scale: 1.15, rotate: [-2, 2, -1, 0] }}
              className="flex flex-col items-center cursor-pointer group"
            >
              {/* Wire attachment node */}
              <div className="w-2.5 h-3 bg-neutral-800 rounded-t-sm shadow-sm" />

              <div
                className={`relative w-10 h-10 sm:w-14 sm:h-14 transition-all duration-700 ${
                  isPulsing ? bulb.pulseClass : ""
                }`}
                style={{
                  filter: isGlowing
                    ? `drop-shadow(0 0 16px ${bulb.glowColor})`
                    : "drop-shadow(0 0 1px rgba(255,255,255,0.1))",
                }}
              >
                <Image
                  src={imgSrc}
                  alt={`${bulb.color} bulb`}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Light cast below bulb */}
              {isGlowing && (
                <div
                  className="w-8 sm:w-12 h-2 rounded-full blur-md opacity-70 transition-opacity duration-1000 mt-1"
                  style={{ backgroundColor: bulb.glowColor }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
