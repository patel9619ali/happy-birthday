"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { fireStarBurst } from "@/lib/confetti";

interface BalloonsProps {
  showBalloons: boolean;
  alignBalloons: boolean;
  customLetters?: string[];
}

interface BalloonData {
  id: number;
  letter: string;
  color: string;
  img: string;
  baseRotate: number;
  swayClass: string;
}

const DEFAULT_BALLOONS: BalloonData[] = [
  { id: 1, letter: "H", color: "#F2B300", img: "/assets/images/balloons/b1.png", baseRotate: 15, swayClass: "balloon-sway-1" },
  { id: 2, letter: "B", color: "#0719D4", img: "/assets/images/balloons/b2.png", baseRotate: -12, swayClass: "balloon-sway-2" },
  { id: 3, letter: "D", color: "#D14D39", img: "/assets/images/balloons/b3.png", baseRotate: -10, swayClass: "balloon-sway-2" },
  { id: 4, letter: "N", color: "#8FAD00", img: "/assets/images/balloons/b4.png", baseRotate: 14, swayClass: "balloon-sway-1" },
  { id: 5, letter: "I", color: "#8377E4", img: "/assets/images/balloons/b5.png", baseRotate: 12, swayClass: "balloon-sway-1" },
  { id: 6, letter: "D", color: "#99C96A", img: "/assets/images/balloons/b6.png", baseRotate: -14, swayClass: "balloon-sway-2" },
  { id: 7, letter: "A", color: "#20CFB4", img: "/assets/images/balloons/b7.png", baseRotate: 16, swayClass: "balloon-sway-1" },
];

export const Balloons: React.FC<BalloonsProps> = ({
  showBalloons,
  alignBalloons,
  customLetters,
}) => {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [showBorder, setShowBorder] = useState(false);

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showBalloons && !alignBalloons) {
      setShowBorder(true);
      const timer = setTimeout(() => setShowBorder(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [showBalloons, alignBalloons]);

  // Floating coordinates when unaligned (natural ambient drift)
  const getRandomCoords = (idx: number) => {
    const seed = (idx + 1) * 137;
    const xBase = (dimensions.width * 0.15) + ((seed * 73) % (dimensions.width * 0.7));
    const yBase = (dimensions.height * 0.2) + ((seed * 41) % (dimensions.height * 0.45));
    return { x: xBase, y: yBase };
  };

  // Aligned coordinates in a neat banner line across screen center
  const getAlignedCoords = (idx: number, total: number) => {
    const isMobile = dimensions.width < 640;
    const isTablet = dimensions.width < 1024;
    const spacing = isMobile ? 44 : isTablet ? 72 : 92;
    const totalWidth = (total - 1) * spacing;
    const startX = dimensions.width / 2 - totalWidth / 2;
    const targetX = startX + idx * spacing;
    const targetY = isMobile ? dimensions.height * 0.22 : 210;

    return { x: targetX, y: targetY };
  };

  return (
    <>
      {/* Balloon Border that floats upward when balloons are released */}
      <AnimatePresence>
        {showBorder && (
          <motion.div
            initial={{ y: dimensions.height, opacity: 0.8 }}
            animate={{ y: -600, opacity: 0 }}
            transition={{ duration: 7.5, ease: "easeInOut" }}
            className="fixed inset-x-0 z-40 pointer-events-none"
          >
            <div className="relative w-full h-40">
              <Image
                src="/assets/images/Balloon-Border.png"
                alt="Balloon Border"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7 Floating & Alignable Balloons */}
      <AnimatePresence>
        {showBalloons && (
          <div className="fixed inset-0 pointer-events-none z-30">
            {DEFAULT_BALLOONS.map((balloon, index) => {
              const letter = customLetters?.[index] || balloon.letter;
              const random = getRandomCoords(index);
              const aligned = getAlignedCoords(index, DEFAULT_BALLOONS.length);

              return (
                <motion.div
                  key={balloon.id}
                  initial={{
                    x: (dimensions.width / 8) * (index + 0.8),
                    y: dimensions.height + 150,
                    opacity: 0.7,
                    scale: 0.8,
                  }}
                  animate={
                    alignBalloons
                      ? {
                          x: aligned.x - 45,
                          y: aligned.y,
                          rotate: 0,
                          scale: dimensions.width < 640 ? 0.65 : 1,
                          opacity: 0.95,
                          transition: {
                            type: "spring",
                            stiffness: 80,
                            damping: 14,
                            delay: index * 0.05,
                          },
                        }
                      : {
                          x: [
                            random.x - 45,
                            random.x - 20,
                            random.x - 60,
                            random.x - 45,
                          ],
                          y: [
                            random.y,
                            random.y - 40,
                            random.y + 30,
                            random.y,
                          ],
                          rotate: [
                            balloon.baseRotate,
                            -balloon.baseRotate,
                            balloon.baseRotate,
                          ],
                          scale: dimensions.width < 640 ? 0.75 : 1,
                          opacity: 0.85,
                          transition: {
                            duration: 10 + (index % 4) * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }
                  }
                  whileHover={{ scale: 1.15 }}
                  onClick={() => fireStarBurst()}
                  className="absolute cursor-pointer pointer-events-auto flex flex-col items-center select-none"
                  style={{ width: 90, height: 165 }}
                >
                  {/* Balloon Image */}
                  <div className="relative w-[90px] h-[165px] flex items-center justify-center">
                    <Image
                      src={balloon.img}
                      alt={`Balloon ${letter}`}
                      width={90}
                      height={165}
                      className="w-full h-full object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)]"
                      priority
                    />

                    {/* Balloon Letter */}
                    <AnimatePresence>
                      {alignBalloons && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.2, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{
                            delay: 0.3 + index * 0.1,
                            type: "spring",
                            stiffness: 200,
                            damping: 12,
                          }}
                          className="absolute top-[32px] font-signika text-4xl sm:text-5xl font-black uppercase tracking-wider drop-shadow-[2px_2px_4px_rgba(255,255,255,0.95)]"
                          style={{ color: balloon.color }}
                        >
                          {letter}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
