import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Volume2, VolumeX } from "lucide-react";
import loadingVideo from "../assets/video/loadingpage.mp4";

export default function VideoLoader({ onComplete }) {
  const [showLoader, setShowLoader] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressTextRef = useRef(null);
  const animFrameId = useRef(null);
  const progressIntervalRef = useRef(null);
  const hasFinishedRef = useRef(false);

  const handleFinish = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    setShowLoader(false);
    if (onComplete) {
      onComplete();
    }
  };

  // High-Performance 60FPS Golden Luxury Petals (Zero CPU Overhead)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Pre-rendered offscreen sprite canvases
    const spriteSize = 30;
    const colorThemes = [
      { c1: "rgba(255, 245, 190, 0.95)", c2: "rgba(245, 192, 66, 0.7)", c3: "rgba(245, 192, 66, 0)" },
      { c1: "#ff7675", c2: "#d63031", c3: "#630018" },
      { c1: "#f9ca24", c2: "#f0932b", c3: "#994c00" },
      { c1: "#fff5cc", c2: "#f5c042", c3: "#b8860b" },
      { c1: "#ffeaa7", c2: "#fdcb6e", c3: "#e17055" },
    ];

    const sprites = colorThemes.map((theme) => {
      const offCanvas = document.createElement("canvas");
      offCanvas.width = spriteSize * 2;
      offCanvas.height = spriteSize * 2;
      const offCtx = offCanvas.getContext("2d");
      if (!offCtx) return offCanvas;

      offCtx.translate(spriteSize, spriteSize);
      const grad = offCtx.createRadialGradient(0, 0, 0, 0, 0, spriteSize * 0.9);
      grad.addColorStop(0, theme.c1);
      grad.addColorStop(0.6, theme.c2);
      grad.addColorStop(1, theme.c3);

      offCtx.fillStyle = grad;
      offCtx.beginPath();
      offCtx.moveTo(0, -spriteSize * 0.8);
      offCtx.bezierCurveTo(spriteSize * 0.7, -spriteSize * 0.7, spriteSize * 0.8, spriteSize * 0.4, 0, spriteSize * 0.9);
      offCtx.bezierCurveTo(-spriteSize * 0.8, spriteSize * 0.4, -spriteSize * 0.7, -spriteSize * 0.7, 0, -spriteSize * 0.8);
      offCtx.fill();

      return offCanvas;
    });

    const petalCount = 24;
    const petals = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 10 + 8,
        speedY: Math.random() * 1.2 + 0.7,
        speedX: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.4,
        flip: Math.random() * 360,
        flipSpeed: Math.random() * 1.8 + 0.8,
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayRadius: Math.random() * 1.4 + 0.6,
        spriteIndex: Math.floor(Math.random() * sprites.length),
        opacity: Math.random() * 0.35 + 0.65,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.swayAngle += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.swayAngle) * p.swayRadius;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;
        p.flip += p.flipSpeed;

        if (p.y > height + 25) {
          p.y = -25;
          p.x = Math.random() * width;
        }
        if (p.x > width + 25) p.x = -25;
        if (p.x < -25) p.x = width + 25;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(Math.cos((p.flip * Math.PI) / 180) * (p.size / spriteSize), p.size / spriteSize);
        ctx.globalAlpha = p.opacity;
        ctx.drawImage(sprites[p.spriteIndex], -spriteSize, -spriteSize);
        ctx.restore();
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Toggle or Unmute Sound
  const toggleSound = (e) => {
    if (e) e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;

    if (vid.muted) {
      vid.muted = false;
      vid.volume = 1.0;
      setIsMuted(false);
      const p = vid.play();
      if (p !== undefined) {
        p.catch(() => {
          // If browser rejects, keep muted
          vid.muted = true;
          setIsMuted(true);
        });
      }
    } else {
      vid.muted = true;
      setIsMuted(true);
    }
  };

  // Robust Non-Blocking Video Playback Engine
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    // 1. Set required attributes for zero-friction mobile/desktop autoplay
    vid.muted = true;
    vid.defaultMuted = true;
    vid.volume = 1.0;
    vid.playsInline = true;

    // 2. Immediate Autoplay Attempt
    const attemptPlay = () => {
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay successfully started (muted)
            // 3. Try to seamlessly unmute if browser allows (Desktop with engagement)
            tryUnmuteSilently();
          })
          .catch((err) => {
            console.log("Initial autoplay fallback:", err);
            vid.muted = true;
            vid.play().catch(() => {});
          });
      }
    };

    // Try unmuting silently without interrupting video flow
    const tryUnmuteSilently = () => {
      // Check if browser allows unmuted audio
      if (vid && vid.muted) {
        vid.muted = false;
        const p = vid.play();
        if (p !== undefined) {
          p.then(() => {
            setIsMuted(false);
          }).catch(() => {
            // Browser blocked unmuted autoplay -> keep playing muted smoothly!
            vid.muted = true;
            setIsMuted(true);
            vid.play().catch(() => {});
          });
        }
      }
    };

    attemptPlay();

    // 4. Instant Unmute on the VERY FIRST touch/click anywhere on the screen
    const handleGlobalInteraction = () => {
      if (vid && vid.muted) {
        vid.muted = false;
        vid.volume = 1.0;
        setIsMuted(false);
        const p = vid.play();
        if (p !== undefined) {
          p.catch(() => {
            // Fallback if needed
            vid.muted = true;
            setIsMuted(true);
            vid.play().catch(() => {});
          });
        }
      }
    };

    const interactionEvents = ["pointerdown", "touchstart", "click", "keydown"];
    interactionEvents.forEach((ev) =>
      window.addEventListener(ev, handleGlobalInteraction, { passive: true, once: true })
    );

    // 5. Dynamic Progress Bar Animation & Watchdog
    let simulatedProgress = 10;
    progressIntervalRef.current = setInterval(() => {
      if (hasFinishedRef.current) return;
      if (vid && vid.duration && vid.duration > 0) {
        const actualProgress = (vid.currentTime / vid.duration) * 100;
        simulatedProgress = Math.max(simulatedProgress, actualProgress);
      } else {
        // Smooth increment even if video buffer takes 200ms
        simulatedProgress = Math.min(simulatedProgress + 4, 90);
      }

      const pClamped = Math.min(100, Math.max(10, Math.round(simulatedProgress)));
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${pClamped}%`;
      }
      if (progressTextRef.current) {
        progressTextRef.current.innerText = `${pClamped}%`;
      }

      if (simulatedProgress >= 100) {
        handleFinish();
      }
    }, 100);

    // 6. Absolute Fallback Timer (Never traps the user)
    const fallbackTimer = setTimeout(() => {
      handleFinish();
    }, 6500);

    return () => {
      clearTimeout(fallbackTimer);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      interactionEvents.forEach((ev) => window.removeEventListener(ev, handleGlobalInteraction));
    };
  }, []);

  // Update progress directly from video time update
  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (vid && vid.duration) {
      const p = Math.min(100, Math.max(10, (vid.currentTime / vid.duration) * 100));
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${p}%`;
      }
      if (progressTextRef.current) {
        progressTextRef.current.innerText = `${Math.round(p)}%`;
      }
      if (vid.currentTime >= vid.duration - 0.2) {
        handleFinish();
      }
    }
  };

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          key="edge-luxury-namaste-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: "blur(8px)",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 w-screen h-screen z-[999999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{
            background: "radial-gradient(circle at center, #18130e 0%, #0c0a07 60%, #030303 100%)",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          {/* Falling Flower Petals Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          />

          {/* Ambient Golden Radial Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full pointer-events-none z-0 animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(245, 192, 66, 0.22) 0%, rgba(201, 42, 42, 0.08) 45%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* Header Action Buttons (Sound Toggle & Skip) */}
          <div className="absolute top-5 right-5 sm:top-7 sm:right-7 z-30 flex items-center gap-2.5">
            {/* Audio Toggle Button */}
            <button
              type="button"
              onClick={toggleSound}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#f5c042]/40 bg-black/50 backdrop-blur-md text-[#f5c042] hover:bg-[#f5c042]/20 transition-all duration-300 text-xs font-medium cursor-pointer shadow-lg"
              title={isMuted ? "Tap to Unmute Sound" : "Sound Enabled"}
            >
              {isMuted ? (
                <>
                  <VolumeX size={14} className="text-[#f5c042] animate-pulse" />
                  <span className="text-[11px] text-[#fff3c4] tracking-wide">Sound Off</span>
                </>
              ) : (
                <>
                  <Volume2 size={14} className="text-[#f5c042]" />
                  <span className="text-[11px] text-[#fff3c4] tracking-wide">Sound On</span>
                </>
              )}
            </button>

            {/* Skip Button */}
            <button
              type="button"
              onClick={handleFinish}
              className="px-4 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-[#e0d0b5] hover:text-white hover:border-[#f5c042]/60 hover:bg-[#f5c042]/10 transition-all duration-300 text-xs font-medium cursor-pointer"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Skip
            </button>
          </div>

          {/* Main Loader Content Center */}
          <div className="relative z-20 flex flex-col items-center text-center max-w-[92vw] px-4">
            
            {/* Auspicious Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 px-5 py-1.5 mb-2 rounded-full border border-[#f5c042]/50 backdrop-blur-md shadow-lg"
              style={{
                background: "linear-gradient(135deg, rgba(201, 42, 42, 0.35), rgba(245, 192, 66, 0.32))",
                fontFamily: "'Cinzel', serif",
                fontSize: "0.82rem",
                fontWeight: 600,
                letterSpacing: "2.5px",
                color: "#fff3c4",
                textTransform: "uppercase",
              }}
            >
              <Sparkles size={13} className="text-[#f5c042]" />
              <span>Auspicious Welcome</span>
              <Sparkles size={13} className="text-[#f5c042]" />
            </motion.div>

            {/* Namaste Video Avatar with Golden Rings */}
            <div 
              onClick={toggleSound}
              className="relative w-[215px] h-[215px] sm:w-[245px] sm:h-[245px] my-3 flex items-center justify-center cursor-pointer group"
              title="Click or Tap to toggle sound"
            >
              {/* Outer Spinning Golden Mandala Dashed Ring */}
              <div
                className="absolute w-[248px] h-[248px] sm:w-[278px] sm:h-[278px] rounded-full border border-dashed border-[#f5c042]/75 animate-spin [animation-duration:22s]"
                style={{
                  boxShadow: "0 0 30px rgba(245, 192, 66, 0.4)",
                }}
              />

              {/* Middle Spinning Gradient Ring */}
              <div
                className="absolute w-[230px] h-[230px] sm:w-[258px] sm:h-[258px] rounded-full border-2 border-transparent border-t-[#f5c042] border-b-[#d4af37] animate-spin [animation-duration:12s] [animation-direction:reverse]"
              />

              {/* Central Video Frame */}
              <div
                className="relative w-[205px] h-[205px] sm:w-[235px] sm:h-[235px] rounded-full overflow-hidden border-[3px] border-[#f5c042] bg-black shadow-2xl flex items-center justify-center"
                style={{
                  boxShadow: "0 0 45px rgba(245, 192, 66, 0.6), inset 0 0 20px rgba(0, 0, 0, 0.6)",
                }}
              >
                <video
                  ref={videoRef}
                  src={loadingVideo}
                  autoPlay
                  playsInline
                  webkit-playsinline="true"
                  x5-playsinline="true"
                  x5-video-player-type="h5"
                  muted
                  defaultMuted
                  preload="auto"
                  onEnded={handleFinish}
                  onTimeUpdate={handleTimeUpdate}
                  onCanPlay={() => {
                    const vid = videoRef.current;
                    if (vid && vid.paused) {
                      vid.play().catch(() => {});
                    }
                  }}
                  onLoadedData={() => {
                    const vid = videoRef.current;
                    if (vid && vid.paused) {
                      vid.play().catch(() => {});
                    }
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 25%",
                    display: "block",
                    filter: "contrast(1.06) saturate(1.1) brightness(1.02)",
                  }}
                />

                {/* Subtle Lens Glare Overlay */}
                <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
              </div>
            </div>

            {/* Sound Prompt Hint for Mobile Users */}
            {isMuted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                onClick={toggleSound}
                className="inline-flex items-center gap-1.5 px-3 py-1 -mt-1 mb-1 rounded-full bg-black/40 border border-[#f5c042]/30 text-[11px] text-[#f5c042] cursor-pointer"
              >
                <Volume2 size={12} />
                <span>Tap anywhere for sound</span>
              </motion.div>
            )}

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mt-1 flex flex-col items-center"
            >
              <div
                className="text-[11px] sm:text-xs uppercase tracking-[5px] text-[#e0d0b5]/90 mb-1"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Welcome to
              </div>

              <h1
                className="text-2xl sm:text-4xl font-extrabold uppercase tracking-[3.5px] my-1"
                style={{
                  fontFamily: "'Cinzel', 'Playfair Display', serif",
                  background: "linear-gradient(135deg, #ffffff 0%, #fff3c4 25%, #f5c042 55%, #e6a827 80%, #b8860b 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 30px rgba(245, 192, 66, 0.4)",
                }}
              >
                Edge Expert Realty
              </h1>

              <p
                className="italic text-xs sm:text-base text-[#e0d0b5] tracking-[1.5px] mb-3 opacity-90"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "Where Luxury Living Meets Timeless Elegance"
              </p>
            </motion.div>

            {/* High-Performance Smooth Progress Indicator */}
            <div className="w-[230px] sm:w-[280px] flex flex-col items-center gap-2">
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden shadow-inner p-[1px]">
                <div
                  ref={progressBarRef}
                  className="h-full rounded-full transition-all duration-100 ease-out"
                  style={{
                    width: "10%",
                    background: "linear-gradient(90deg, #c92a2a 0%, #f5c042 50%, #fff3c4 100%)",
                    boxShadow: "0 0 14px #f5c042",
                  }}
                />
              </div>

              <div
                ref={progressTextRef}
                className="text-xs sm:text-sm font-semibold tracking-widest text-[#f5c042]"
                style={{ fontFamily: "'Cinzel', monospace" }}
              >
                10%
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



