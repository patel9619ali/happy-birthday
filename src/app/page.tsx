"use client";

import React, { useState, useRef, useEffect } from "react";
import { BulbRow } from "@/components/BulbRow";
import { Banner } from "@/components/Banner";
import { AlbumPhotos } from "@/components/AlbumPhotos";
import { Balloons } from "@/components/Balloons";
import { BirthdayCake } from "@/components/BirthdayCake";
import { StoryMessage, DEFAULT_MESSAGES } from "@/components/StoryMessage";
import { InteractiveGUI } from "@/components/InteractiveGUI";
import { PhotoLightbox } from "@/components/PhotoLightbox";
import { FloatingParticles } from "@/components/FloatingParticles";
import { fireCelebrationConfetti, fireHeartConfetti } from "@/lib/confetti";

const ALBUM_PHOTOS = [
  { src: "/assets/images/photo1.png", alt: "Special Moment 1" },
  { src: "/assets/images/photo2.png", alt: "Special Moment 2" },
  { src: "/assets/images/photo3.png", alt: "Special Moment 3" },
  { src: "/assets/images/photo4.png", alt: "Special Moment 4" },
];

export default function BirthdayPage() {
  // Main Step state (0 to 8)
  const [currentStep, setCurrentStep] = useState(0);

  // Audio State
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [volume, setVolume] = useState(0.8);

  // Lightbox State
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  // Customization & Settings
  const [recipientName, setRecipientName] = useState("babyy");
  const [storySpeed, setStorySpeed] = useState<"normal" | "slow" | "fast">("normal");
  const [showParticles, setShowParticles] = useState(true);

  // Candle state (can be toggled in step >= 6)
  const [candleLit, setCandleLit] = useState(false);

  // Sync audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle music play/pause
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch((err) => {
        console.warn("Audio autoplay blocked:", err);
      });
    }
  };

  // Step advancement logic (faithfully mirroring original timings & triggers)
  const handleNextStep = () => {
    if (currentStep === 0) {
      // Step 0 -> 1: Turn On Lights
      setCurrentStep(1);
    } else if (currentStep === 1) {
      // Step 1 -> 2: Play the Music
      setCurrentStep(2);
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
      }
    } else if (currentStep === 2) {
      // Step 2 -> 3: Let's Decorate (Banner + Photos)
      setCurrentStep(3);
      fireCelebrationConfetti();
    } else if (currentStep === 3) {
      // Step 3 -> 4: Fly Balloons
      setCurrentStep(4);
    } else if (currentStep === 4) {
      // Step 4 -> 5: Cake Fade In
      setCurrentStep(5);
    } else if (currentStep === 5) {
      // Step 5 -> 6: Light the Candle
      setCurrentStep(6);
      setCandleLit(true);
      fireHeartConfetti();
    } else if (currentStep === 6) {
      // Step 6 -> 7: Happy Birthday (Align balloons with letters)
      setCurrentStep(7);
      fireCelebrationConfetti();
    } else if (currentStep === 7) {
      // Step 7 -> 8: A message for you (Story starts)
      setCurrentStep(8);
    }
  };

  // Direct step jump from GUI Dock
  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    if (step >= 2 && !isPlayingMusic && audioRef.current) {
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }
    if (step >= 6) {
      setCandleLit(true);
    } else {
      setCandleLit(false);
    }
    if (step === 3 || step === 7) {
      fireCelebrationConfetti();
    }
  };

  // Reset show
  const handleReset = () => {
    setCurrentStep(0);
    setCandleLit(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlayingMusic(false);
    }
  };

  // Build messages with customizable recipient name
  const formattedMessages = DEFAULT_MESSAGES.map((msg, idx) => {
    if (idx === DEFAULT_MESSAGES.length - 1) {
      return `a very happy birthday ${recipientName} ❤️`;
    }
    return msg;
  });

  // Calculate dynamic background color class
  const getBackgroundClass = () => {
    if (currentStep === 0) return "bg-black";
    if (currentStep === 1) return "bg-peach-stage1";
    return "bg-peach-active";
  };

  return (
    <main
      className={`relative min-h-screen w-full transition-colors duration-1000 overflow-hidden flex flex-col justify-between ${getBackgroundClass()}`}
    >
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="/assets/audio/hbd.mp3" loop preload="auto" />

      {/* Floating Ambient Particles & Bokeh */}
      <FloatingParticles active={showParticles && currentStep >= 1} />

      {/* Top Section: Ceiling Bulbs */}
      <header className="w-full pt-2 sm:pt-4 z-20">
        <BulbRow
          lightsOn={currentStep >= 1}
          musicPlaying={currentStep >= 2 && isPlayingMusic}
        />
      </header>

      {/* Center Stage: Banner, Balloons, Photos, Cake & Story */}
      <div className="relative flex-1 w-full flex flex-col items-center justify-center -mt-6 sm:-mt-10">
        {/* Birthday Banner */}
        <Banner show={currentStep >= 3} />

        {/* Polaroid Album Photos */}
        <AlbumPhotos
          show={currentStep >= 3}
          onSelectPhoto={(src, index) => {
            setSelectedPhoto(src);
            setSelectedPhotoIndex(index);
          }}
        />

        {/* Flying & Word-aligned Balloons */}
        <Balloons
          showBalloons={currentStep >= 4}
          alignBalloons={currentStep >= 7}
        />

        {/* 3D Birthday Cake */}
        <div className="my-auto z-25">
          <BirthdayCake
            showCake={currentStep >= 5 && (currentStep !== 8 || candleLit)}
            candleLit={candleLit}
            onToggleFlame={() => setCandleLit((prev) => !prev)}
            personImage="/assets/images/person.jpeg"
          />
        </div>

        {/* Heartfelt Story Message Presentation */}
        <StoryMessage
          show={currentStep === 8}
          messages={formattedMessages}
          speed={storySpeed}
          onFinished={() => {
            setCandleLit(true);
          }}
        />
      </div>

      {/* Interactive GUI Control Dock & Action Button */}
      <InteractiveGUI
        currentStep={currentStep}
        onStepChange={handleStepChange}
        onNextStep={handleNextStep}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={toggleMusic}
        volume={volume}
        onVolumeChange={setVolume}
        storySpeed={storySpeed}
        onChangeSpeed={setStorySpeed}
        recipientName={recipientName}
        onUpdateRecipientName={setRecipientName}
        showParticles={showParticles}
        onToggleParticles={() => setShowParticles((prev) => !prev)}
        onReset={handleReset}
      />

      {/* Photo Lightbox Dialog */}
      <PhotoLightbox
        selectedPhoto={selectedPhoto}
        photoIndex={selectedPhotoIndex}
        photos={ALBUM_PHOTOS}
        onClose={() => setSelectedPhoto(null)}
        onNext={() => {
          const nextIdx = (selectedPhotoIndex + 1) % ALBUM_PHOTOS.length;
          setSelectedPhotoIndex(nextIdx);
          setSelectedPhoto(ALBUM_PHOTOS[nextIdx].src);
        }}
        onPrev={() => {
          const prevIdx = (selectedPhotoIndex - 1 + ALBUM_PHOTOS.length) % ALBUM_PHOTOS.length;
          setSelectedPhotoIndex(prevIdx);
          setSelectedPhoto(ALBUM_PHOTOS[prevIdx].src);
        }}
      />
    </main>
  );
}
