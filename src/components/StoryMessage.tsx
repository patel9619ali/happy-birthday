"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Heart } from "lucide-react";
import { fireCelebrationConfetti, fireHeartConfetti } from "@/lib/confetti";

export const DEFAULT_MESSAGES = [
  "Today is...",
  "as beautiful as other days",
  "but you realize",
  "another year has gone",
  "in a blink of the eyes",
  "however",
  "Do you know..?",
  "today is just special",
  "so special to you",
  "that's why",
  "Let's make it...",
  "the best celebration ever",
  "and let me share...",
  "a piece of happiness to you",
  "I made all this...",
  "as a birthday present to you",
  "I'm glad we met on zzz",
  "thanks for the friendship we made",
  "thanks for everything",
  "I wish you all the best",
  "May your life be at ease",
  "May all your wishes come true",
  "Remember",
  "your ambitions",
  "you live as a free bird...",
  "flying in the blue sky",
  "Now things are different...",
  "real story of your life",
  "is just about to begin",
  "indeed..",
  "but...",
  "don't worry",
  "because...",
  "Allah has your back",
  "and",
  "this year will be better",
  "and I hope",
  "you'll find...",
  "happiness along the way",
  "keep your spirit up",
  "enjoy every single moment...",
  "that you experience today",
  "fill it with your most beautiful smile",
  "and make it the best memory..",
  "lastly...",
  "I'd like to wish you one more time",
  "a very happy birthday babyy ❤️",
];

interface StoryMessageProps {
  show: boolean;
  onFinished: () => void;
  messages?: string[];
  speed?: "normal" | "slow" | "fast";
}

export const StoryMessage: React.FC<StoryMessageProps> = ({
  show,
  onFinished,
  messages = DEFAULT_MESSAGES,
  speed = "normal",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Speed timings (ms)
  const speedDelays = {
    fast: 1600,
    normal: 2400,
    slow: 3500,
  };
  const delay = speedDelays[speed] || 2400;

  useEffect(() => {
    if (!show) {
      setCurrentIndex(0);
      setIsDone(false);
      return;
    }

    if (isPaused || isDone) return;

    if (currentIndex < messages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      // Reached final message!
      setIsDone(true);
      fireCelebrationConfetti();
      fireHeartConfetti();
      onFinished();
    }
  }, [show, currentIndex, isPaused, isDone, messages.length, delay, onFinished]);

  if (!show) return null;

  const currentText = messages[currentIndex] || "";
  const progressPercent = ((currentIndex + 1) / messages.length) * 100;
  const isFinal = currentIndex === messages.length - 1;

  return (
    <div className="fixed inset-x-0 bottom-24 sm:bottom-28 z-35 flex flex-col items-center justify-center px-4 pointer-events-none select-none">
      {/* Progress pill & mini-controls */}
      <div className="pointer-events-auto flex items-center gap-3 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 mb-4 shadow-lg text-xs text-white/80">
        <span>
          Story: <strong className="text-white">{currentIndex + 1}</strong> / {messages.length}
        </span>
        <div className="w-20 sm:w-28 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-rose-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Small step buttons */}
        <div className="flex items-center gap-1 pl-1 border-l border-white/20">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            className="p-1 hover:text-white transition-colors"
            title="Previous"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="p-1 hover:text-white transition-colors"
            title={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => {
              if (currentIndex < messages.length - 1) {
                setCurrentIndex((prev) => prev + 1);
              }
            }}
            className="p-1 hover:text-white transition-colors"
            title="Next"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Animated Message Typography */}
      <div className="min-h-[140px] sm:min-h-[180px] flex items-center justify-center text-center max-w-4xl px-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.98 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col items-center"
          >
            <h2
              className={`font-happy text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wide leading-tight ${
                isFinal ? "text-[#C4515C] animate-pulse" : "text-[#C4515C]"
              }`}
              style={{
                textShadow: "2px 2px 4px #FFFFFF, 0 0 20px rgba(255,255,255,0.4)",
              }}
            >
              {currentText}
            </h2>

            {isFinal && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mt-3 text-rose-500"
              >
                <Heart className="w-10 h-10 fill-rose-500 stroke-none drop-shadow-md" />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
