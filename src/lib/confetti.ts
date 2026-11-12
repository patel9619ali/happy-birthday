import confetti from "canvas-confetti";

export function fireCelebrationConfetti() {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

  const interval: any = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / duration);

    // Left cannon
    confetti({
      ...defaults,
      particleCount,
      origin: { x: 0.15, y: 0.7 },
      colors: ["#ff0a54", "#ff477e", "#ff85a1", "#fbb1bd", "#f7cad0", "#ffd166", "#06d6a0", "#118ab2"],
    });

    // Right cannon
    confetti({
      ...defaults,
      particleCount,
      origin: { x: 0.85, y: 0.7 },
      colors: ["#ffd166", "#06d6a0", "#118ab2", "#073b4c", "#ff477e", "#9b5de5", "#f15bb5"],
    });
  }, 250);
}

export function fireHeartConfetti() {
  confetti({
    particleCount: 50,
    spread: 100,
    origin: { y: 0.6 },
    shapes: ["circle"],
    colors: ["#ff1493", "#ff69b4", "#ffb6c1", "#ff007f", "#ffffff"],
    scalar: 1.2,
    zIndex: 10000,
  });
}

export function fireStarBurst() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.5 },
    colors: ["#ffd700", "#ffae00", "#ff6b6b", "#4ecdc4"],
    zIndex: 10000,
  });
}
