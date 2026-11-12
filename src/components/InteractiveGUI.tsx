"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  Music,
  Sparkles,
  PartyPopper,
  Cake,
  Flame,
  Gift,
  Mail,
  RotateCcw,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SlidersHorizontal,
  Heart,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { fireCelebrationConfetti, fireHeartConfetti } from "@/lib/confetti";

export interface GUIProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  onNextStep: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
  storySpeed: "normal" | "slow" | "fast";
  onChangeSpeed: (spd: "normal" | "slow" | "fast") => void;
  recipientName: string;
  onUpdateRecipientName: (name: string) => void;
  showParticles: boolean;
  onToggleParticles: () => void;
  onReset: () => void;
}

export const STEP_CONFIGS = [
  { step: 0, label: "Turn On Lights", icon: Lightbulb, variant: "default" as const },
  { step: 1, label: "Play the Music Buddy", icon: Music, variant: "celebrate" as const },
  { step: 2, label: "Let's Decorate", icon: Sparkles, variant: "default" as const },
  { step: 3, label: "Calm, i got you some balloons", icon: PartyPopper, variant: "default" as const },
  { step: 4, label: "Cake? of course!", icon: Cake, variant: "celebrate" as const },
  { step: 5, label: "Don't forget to Light the Candle", icon: Flame, variant: "gold" as const },
  { step: 6, label: "Happy Birthday", icon: Gift, variant: "celebrate" as const },
  { step: 7, label: "A message for you", icon: Mail, variant: "celebrate" as const },
  { step: 8, label: "Replay Celebration", icon: RotateCcw, variant: "default" as const },
];

export const InteractiveGUI: React.FC<GUIProps> = ({
  currentStep,
  onStepChange,
  onNextStep,
  isPlayingMusic,
  onToggleMusic,
  volume,
  onVolumeChange,
  storySpeed,
  onChangeSpeed,
  recipientName,
  onUpdateRecipientName,
  showParticles,
  onToggleParticles,
  onReset,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [tempName, setTempName] = useState(recipientName);

  const activeConfig = STEP_CONFIGS[currentStep] || STEP_CONFIGS[0];
  const StepIcon = activeConfig.icon;

  return (
    <>
      {/* Primary Big Step Action Button (matches original flow) */}
      <div className="fixed bottom-16 sm:bottom-20 inset-x-0 z-40 flex flex-col items-center justify-center px-4 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 35, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="pointer-events-auto"
          >
            <Button
              variant={activeConfig.variant}
              size="lg"
              onClick={() => {
                if (currentStep === 8) {
                  onReset();
                } else {
                  onNextStep();
                }
              }}
              className="text-base sm:text-lg px-7 py-3 sm:py-3.5 shadow-2xl tracking-wide uppercase transition-all duration-300 hover:shadow-cyan-500/25 active:scale-95"
            >
              <StepIcon className="w-5 h-5 mr-2 animate-pulse" />
              {activeConfig.label}
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Bottom GUI Dock / Timeline Studio */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="fixed bottom-2 inset-x-2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-45 flex flex-col items-center"
      >
        <div className="bg-black/60 hover:bg-black/80 transition-colors backdrop-blur-xl border border-white/15 px-3 py-2 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex items-center gap-2 sm:gap-3 text-white">
          {/* Step Indicators */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5 max-w-[200px] sm:max-w-none">
            {STEP_CONFIGS.slice(0, 8).map((cfg, idx) => {
              const isPast = currentStep > idx;
              const isCurrent = currentStep === idx;
              return (
                <button
                  key={cfg.step}
                  onClick={() => onStepChange(idx)}
                  title={`${idx + 1}. ${cfg.label}`}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                    isCurrent
                      ? "bg-rose-500 text-white shadow-md shadow-rose-500/50 scale-110"
                      : isPast
                      ? "bg-white/20 text-white/90 hover:bg-white/30"
                      : "bg-white/5 text-white/40 hover:bg-white/10"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="h-5 w-[1px] bg-white/20" />

          {/* Audio Quick Control */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onToggleMusic}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isPlayingMusic
                  ? "bg-rose-500/25 text-rose-300 border border-rose-500/40"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
              title={isPlayingMusic ? "Pause Music" : "Play Music"}
            >
              {isPlayingMusic ? (
                <div className="flex items-center gap-1">
                  <Pause className="w-4 h-4" />
                  <span className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 h-full bg-rose-400 animate-pulse" />
                    <span className="w-0.5 h-2 bg-rose-400 animate-pulse" />
                    <span className="w-0.5 h-3 bg-rose-400 animate-pulse" />
                  </span>
                </div>
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Quick Confetti & Heart Blast */}
          <button
            onClick={() => fireCelebrationConfetti()}
            className="p-2 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 transition-all cursor-pointer"
            title="Launch Confetti!"
          >
            <PartyPopper className="w-4 h-4" />
          </button>

          <button
            onClick={() => fireHeartConfetti()}
            className="p-2 rounded-xl bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 border border-pink-500/30 transition-all cursor-pointer"
            title="Rain Hearts!"
          >
            <Heart className="w-4 h-4 fill-pink-300/40" />
          </button>

          {/* Settings Customizer Modal Trigger */}
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-xl bg-white/10 text-white/80 hover:bg-white/20 transition-all cursor-pointer"
            title="Animation & Experience GUI Settings"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* GUI Settings & Customizer Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettings(false)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-white/20 rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-2xl text-white"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-rose-400" />
                  <h3 className="text-lg font-bold">Animation & Show Studio</h3>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5 pt-4">
                {/* Recipient Name Customization */}
                <div>
                  <label className="text-xs font-semibold text-neutral-400 block mb-1.5 uppercase tracking-wider">
                    Birthday Person Name / Nickname
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      placeholder="e.g. babyy, Alex, Sarah"
                      className="flex-1 bg-black/50 border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                    <Button
                      size="sm"
                      onClick={() => onUpdateRecipientName(tempName)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Music Volume */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-neutral-400 mb-1.5">
                    <span>MUSIC VOLUME</span>
                    <span className="text-white">{Math.round(volume * 100)}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <VolumeX
                      className="w-4 h-4 text-neutral-400 cursor-pointer"
                      onClick={() => onVolumeChange(0)}
                    />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                      className="flex-1 accent-rose-500 cursor-pointer"
                    />
                    <Volume2
                      className="w-4 h-4 text-neutral-400 cursor-pointer"
                      onClick={() => onVolumeChange(1)}
                    />
                  </div>
                </div>

                {/* Story Speed */}
                <div>
                  <label className="text-xs font-semibold text-neutral-400 block mb-1.5 uppercase tracking-wider">
                    Story Message Speed
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["slow", "normal", "fast"] as const).map((spd) => (
                      <button
                        key={spd}
                        onClick={() => onChangeSpeed(spd)}
                        className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                          storySpeed === spd
                            ? "bg-rose-500 text-white font-bold shadow-md shadow-rose-500/30"
                            : "bg-white/10 text-white/70 hover:bg-white/20"
                        }`}
                      >
                        {spd}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ambient Particles Toggle */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-sm font-medium">Magical Ambient Particles</span>
                  <button
                    onClick={onToggleParticles}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                      showParticles ? "bg-rose-500" : "bg-neutral-700"
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                        showParticles ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Restart Experience */}
                <div className="pt-2 border-t border-white/10 flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onReset();
                      setShowSettings(false);
                    }}
                    className="w-full text-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                    Reset Show to Beginning
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
