"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export const FloatingParticles: React.FC<{ active: boolean }> = ({ active }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) return;

    const colors = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff", "#ffd166", "#ffffff"];
    const generated: Particle[] = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 3,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
      color: colors[i % colors.length],
    }));

    setParticles(generated);
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: 0,
            scale: 0.3,
          }}
          animate={{
            top: [`${p.y}%`, `${(p.y - 25 + 100) % 100}%`],
            opacity: [0, 0.7, 0.2, 0.8, 0],
            scale: [0.3, 1.2, 0.8, 1.4, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          className="absolute rounded-full blur-[1px]"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
};
