import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import loadingVideo from "../assets/video/loadingpage.mp4";

export default function VideoLoader({ onComplete }) {
  const [showLoader, setShowLoader] = useState(true);
  const [progress, setProgress] = useState(5);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const animFrameId = useRef(null);

  const handleFinish = () => {
    setShowLoader(false);
    if (onComplete) {
      onComplete();
    }
  };

  // Screen-wide user gesture listener for instant sound enablement if browser policy blocked unmuted initial autoplay
  useEffect(() => {
    const handleGesture = () => {
      const vid = videoRef.current;
      if (vid) {
        vid.muted = false;
        vid.volume = 1.0;
        vid.play().catch(() => {});
      }
    };

    window.addEventListener("click", handleGesture);
    window.addEventListener("pointerdown", handleGesture);
    window.addEventListener("touchstart", handleGesture);
    window.addEventListener("keydown", handleGesture);

    return () => {
      window.removeEventListener("click", handleGesture);
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("touchstart", handleGesture);
      window.removeEventListener("keydown", handleGesture);
    };
  }, []);

  // Keyboard shortcut (Escape to skip)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 60FPS Falling Flower Petals Particle Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const types = ["rose", "rose-dark", "marigold", "gold-sparkle", "petal-pink"];
    const petalCount = 45;
    const petals = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 12 + 8,
        speedY: Math.random() * 1.8 + 1.2,
        speedX: Math.random() * 1.2 - 0.6,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 2.5,
        flip: Math.random() * 360,
        flipSpeed: Math.random() * 3 + 1,
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.03 + 0.015,
        swayRadius: Math.random() * 2 + 1,
        type: types[Math.floor(Math.random() * types.length)],
        opacity: Math.random() * 0.4 + 0.6,
      });
    }

    const drawPetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.scale(Math.cos((p.flip * Math.PI) / 180), 1);
      ctx.globalAlpha = p.opacity;

      if (p.type === "gold-sparkle") {
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 0.6);
        grad.addColorStop(0, "rgba(255, 245, 190, 0.95)");
        grad.addColorStop(0.5, "rgba(245, 192, 66, 0.6)");
        grad.addColorStop(1, "rgba(245, 192, 66, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      } else {
        let grad;
        if (p.type === "rose") {
          grad = ctx.createRadialGradient(-p.size * 0.2, -p.size * 0.2, 0, 0, 0, p.size);
          grad.addColorStop(0, "#ff4757");
          grad.addColorStop(0.6, "#d63031");
          grad.addColorStop(1, "#800020");
        } else if (p.type === "rose-dark") {
          grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          grad.addColorStop(0, "#e84118");
          grad.addColorStop(0.7, "#c23616");
          grad.addColorStop(1, "#500");
        } else if (p.type === "marigold") {
          grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          grad.addColorStop(0, "#ffd32a");
          grad.addColorStop(0.6, "#ff9f1a");
          grad.addColorStop(1, "#eb4d4b");
        } else {
          grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          grad.addColorStop(0, "#ff9ff3");
          grad.addColorStop(0.7, "#f368e0");
          grad.addColorStop(1, "#b71540");
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.8, p.size * 0.9, p.size * 0.5, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.5, -p.size * 0.8, -p.size * 0.8, 0, -p.size);
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.8);
        ctx.lineTo(0, p.size * 0.7);
        ctx.stroke();
      }

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.swayAngle += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.swayAngle) * p.swayRadius;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;
        p.flip += p.flipSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Video Autoplay Execution with Sound by Default
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    // Set Sound ON by default
    vid.muted = false;
    vid.volume = 1.0;

    const startPlayback = async () => {
      try {
        await vid.play();
      } catch {
        // If initial unmuted autoplay restricted by browser policy, play muted and let user interaction unmute seamlessly
        vid.muted = true;
        try {
          await vid.play();
        } catch (err) {
          console.log("Autoplay:", err);
        }
      }
    };

    startPlayback();

    // Fallback timer (maximum 8 seconds)
    const fallbackTimer = setTimeout(() => {
      handleFinish();
    }, 8000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Time & Progress update
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const p = Math.min(
        100,
        Math.max(5, (videoRef.current.currentTime / videoRef.current.duration) * 100)
      );
      setProgress(p);
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
            scale: 1.04,
            filter: "blur(8px)",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 w-screen h-screen z-[999999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{
            background: "radial-gradient(circle at center, #1b1610 0%, #0c0a08 55%, #050505 100%)",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          {/* Falling Flower Petals & Sparkle Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          />

          {/* Ambient Golden Radial Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none z-0 animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(245, 192, 66, 0.22) 0%, rgba(201, 42, 42, 0.08) 45%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* Top Right Floating Skip Button */}
          <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
            <button
              onClick={handleFinish}
              type="button"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 text-[#fff3c4] text-xs font-semibold border border-[#f5c042]/30 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xl active:scale-95 group"
            >
              <span style={{ fontFamily: "'Cinzel', serif", letterSpacing: "1.5px" }}>SKIP</span>
              <ChevronRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 text-[#f5c042]"
              />
            </button>
          </div>

          {/* Main Loader Center Box */}
          <div className="relative z-20 flex flex-col items-center text-center max-w-[90vw] px-4">
            
            {/* Welcoming Namaste Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-1.5 mb-3 rounded-full border border-[#f5c042]/40 backdrop-blur-md shadow-lg"
              style={{
                background: "linear-gradient(135deg, rgba(201, 42, 42, 0.28), rgba(245, 192, 66, 0.28))",
                fontFamily: "'Cinzel', serif",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "2.5px",
                color: "#fff3c4",
                textTransform: "uppercase",
              }}
            >
              <span className="text-[#f5c042]">✨</span>
              <span>Auspicious Welcome</span>
              <span className="text-[#f5c042]">✨</span>
            </motion.div>

            {/* Namaste Video Avatar with Golden Mandala Rings */}
            <div className="relative w-[210px] h-[210px] sm:w-[235px] sm:h-[235px] my-3 flex items-center justify-center">
              
              {/* Outer Spinning Golden Mandala Dashed Ring */}
              <div
                className="absolute w-[240px] h-[240px] sm:w-[265px] sm:h-[265px] rounded-full border border-dashed border-[#f5c042]/75 animate-spin [animation-duration:20s]"
                style={{
                  boxShadow: "0 0 28px rgba(245, 192, 66, 0.4)",
                }}
              />

              {/* Middle Spinning Dual Gradient Ring */}
              <div
                className="absolute w-[224px] h-[224px] sm:w-[248px] sm:h-[248px] rounded-full border-2 border-transparent border-t-[#f5c042] border-b-[#e6a827] animate-spin [animation-duration:10s] [animation-direction:reverse]"
              />

              {/* Central Video Avatar Frame */}
              <div
                className="relative w-[200px] h-[200px] sm:w-[225px] sm:h-[225px] rounded-full overflow-hidden border-[3px] border-[#f5c042] bg-black shadow-2xl flex items-center justify-center"
                style={{
                  boxShadow: "0 0 40px rgba(245, 192, 66, 0.55), inset 0 0 15px rgba(0, 0, 0, 0.5)",
                }}
              >
                <video
                  ref={videoRef}
                  src={loadingVideo}
                  autoPlay
                  playsInline
                  preload="auto"
                  onEnded={handleFinish}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedData={() => {
                    if (videoRef.current) {
                      videoRef.current.play().catch(() => {});
                    }
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 25%",
                    display: "block",
                    filter: "contrast(1.05) saturate(1.08) brightness(1.02)",
                  }}
                />

                {/* Subtle Lens Glare Overlay */}
                <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
              </div>
            </div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-3 flex flex-col items-center"
            >
              <div
                className="text-xs sm:text-sm uppercase tracking-[5px] text-white/80 mb-1"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Welcome to
              </div>

              <h1
                className="text-2xl sm:text-4xl font-extrabold uppercase tracking-[3px] my-1"
                style={{
                  fontFamily: "'Cinzel', 'Playfair Display', serif",
                  background: "linear-gradient(135deg, #ffffff 0%, #fff3c4 25%, #f5c042 50%, #e6a827 75%, #b8860b 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 25px rgba(245, 192, 66, 0.35)",
                }}
              >
                Edge Expert Realty
              </h1>

              <p
                className="italic text-xs sm:text-base text-[#e0d0b5] tracking-[1.5px] mb-4 opacity-90"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "Where Luxury Living Meets Timeless Elegance"
              </p>
            </motion.div>

            {/* Smooth Progress Indicator */}
            <div className="w-[230px] sm:w-[280px] flex flex-col items-center gap-2">
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden shadow-inner p-[1px]">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #c92a2a 0%, #f5c042 50%, #fff3c4 100%)",
                    boxShadow: "0 0 12px #f5c042",
                  }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>

              <div
                className="text-xs sm:text-sm font-semibold tracking-widest text-[#f5c042]"
                style={{ fontFamily: "'Cinzel', monospace" }}
              >
                {Math.round(progress)}%
              </div>
            </div>

          </div>

          {/* ESC Shortcut Indicator at Bottom */}
          <div className="absolute bottom-4 text-[11px] text-[#e0d0b5]/50 font-light">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 font-mono text-[9px] border border-white/10">ESC</kbd> to skip
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


