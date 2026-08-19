import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import loadingVideo from "../assets/video/loadingpage.mp4";

export default function VideoLoader({ onComplete }) {
  const [showLoader, setShowLoader] = useState(true);
  const [progress, setProgress] = useState(10);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const animFrameId = useRef(null);

  const handleFinish = () => {
    setShowLoader(false);
    if (onComplete) {
      onComplete();
    }
  };

  // Immediate Audio Unlock function (Browser Autoplay compliance)
  const unlockAudio = () => {
    const vid = videoRef.current;
    if (vid) {
      vid.muted = false;
      vid.volume = 1.0;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  // Screen-wide gesture listener for instant sound enablement if browser restricted initial unmuted autoplay
  useEffect(() => {
    const handleGesture = () => {
      const vid = videoRef.current;
      if (vid && vid.muted) {
        unlockAudio();
      }
    };

    window.addEventListener("click", handleGesture, { passive: true });
    window.addEventListener("pointerdown", handleGesture, { passive: true });
    window.addEventListener("touchstart", handleGesture, { passive: true });
    window.addEventListener("keydown", handleGesture, { passive: true });

    return () => {
      window.removeEventListener("click", handleGesture);
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("touchstart", handleGesture);
      window.removeEventListener("keydown", handleGesture);
    };
  }, []);

  // 60FPS Golden Luxury Petals Canvas
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

    const types = ["gold-sparkle", "rose-gold", "amber", "champagne", "marigold"];
    const petalCount = 42;
    const petals = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 11 + 7,
        speedY: Math.random() * 1.6 + 1.1,
        speedX: Math.random() * 1.0 - 0.5,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 2.2,
        flip: Math.random() * 360,
        flipSpeed: Math.random() * 2.8 + 1,
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.025 + 0.015,
        swayRadius: Math.random() * 2 + 1,
        type: types[Math.floor(Math.random() * types.length)],
        opacity: Math.random() * 0.45 + 0.55,
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
        if (p.type === "rose-gold") {
          grad = ctx.createRadialGradient(-p.size * 0.2, -p.size * 0.2, 0, 0, 0, p.size);
          grad.addColorStop(0, "#ff7675");
          grad.addColorStop(0.6, "#d63031");
          grad.addColorStop(1, "#630018");
        } else if (p.type === "amber") {
          grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          grad.addColorStop(0, "#f9ca24");
          grad.addColorStop(0.7, "#f0932b");
          grad.addColorStop(1, "#994c00");
        } else if (p.type === "marigold") {
          grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          grad.addColorStop(0, "#ffd32a");
          grad.addColorStop(0.6, "#ff9f1a");
          grad.addColorStop(1, "#eb4d4b");
        } else {
          grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          grad.addColorStop(0, "#fff5cc");
          grad.addColorStop(0.7, "#f5c042");
          grad.addColorStop(1, "#b8860b");
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.8, p.size * 0.9, p.size * 0.5, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.5, -p.size * 0.8, -p.size * 0.8, 0, -p.size);
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 0.5;
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

  // Video Autoplay Execution with Sound ON by Default
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    // Audio Default ON
    vid.muted = false;
    vid.volume = 1.0;

    const startPlayback = async () => {
      try {
        await vid.play();
      } catch (err) {
        // Browser Autoplay Policy suspended unmuted autoplay -> play muted first, unlock on gesture
        vid.muted = true;
        try {
          await vid.play();
        } catch (e) {
          console.log("Autoplay error:", e);
        }
      }
    };

    startPlayback();

    // Auto-advance fallback timer (maximum 8.5 seconds)
    const fallbackTimer = setTimeout(() => {
      handleFinish();
    }, 8500);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Time & Progress calculation
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const p = Math.min(
        100,
        Math.max(10, (videoRef.current.currentTime / videoRef.current.duration) * 100)
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
            scale: 1.03,
            filter: "blur(10px)",
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 w-screen h-screen z-[999999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{
            background: "radial-gradient(circle at center, #18130e 0%, #0c0a07 60%, #030303 100%)",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          {/* Falling Flower Petals & Golden Ambient Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          />

          {/* Ambient Golden Radial Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full pointer-events-none z-0 animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(245, 192, 66, 0.25) 0%, rgba(201, 42, 42, 0.1) 45%, transparent 70%)",
              filter: "blur(70px)",
            }}
          />

          {/* Main Loader Content Center */}
          <div className="relative z-20 flex flex-col items-center text-center max-w-[92vw] px-4">
            
            {/* Auspicious Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
            <div className="relative w-[215px] h-[215px] sm:w-[245px] sm:h-[245px] my-3 flex items-center justify-center group">
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
                className="relative w-[205px] h-[205px] sm:w-[235px] sm:h-[235px] rounded-full overflow-hidden border-[3px] border-[#f5c042] bg-black shadow-2xl flex items-center justify-center group-hover:border-[#fff3c4] transition-all duration-300"
                style={{
                  boxShadow: "0 0 45px rgba(245, 192, 66, 0.6), inset 0 0 20px rgba(0, 0, 0, 0.6)",
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
                    const vid = videoRef.current;
                    if (vid) {
                      vid.volume = 1.0;
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

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-2 flex flex-col items-center"
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
                    boxShadow: "0 0 14px #f5c042",
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}


