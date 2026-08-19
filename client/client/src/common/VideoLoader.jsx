import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Volume2, VolumeX } from "lucide-react";
import loadingVideo from "../assets/video/loading page.mp4";

export default function VideoLoader({ onComplete }) {
  const [showLoader, setShowLoader] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const handleFinish = () => {
    setShowLoader(false);
    if (onComplete) {
      onComplete();
    }
  };

  const toggleSound = (e) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleScreenClick = () => {
    if (videoRef.current && videoRef.current.muted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  };

  useEffect(() => {
    // Attempt playback with audio/voice enabled
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      videoRef.current
        .play()
        .then(() => {
          setIsMuted(false);
        })
        .catch(() => {
          // If browser restricts unmuted autoplay, start muted and allow user unmute
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
    }

    // Safety fallback timer
    const fallbackTimer = setTimeout(() => {
      handleFinish();
    }, 10000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          key="fullscreen-video-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
          onClick={handleScreenClick}
          className="fixed inset-0 w-screen h-screen z-[999999] bg-black flex items-center justify-center overflow-hidden select-none cursor-pointer"
        >
          {/* Fullscreen Video Element */}
          <video
            ref={videoRef}
            src={loadingVideo}
            autoPlay
            playsInline
            preload="auto"
            onEnded={handleFinish}
            onTimeUpdate={handleTimeUpdate}
            style={{
              filter: "contrast(1.05) saturate(1.08) brightness(1.02)",
              imageRendering: "-webkit-optimize-contrast",
            }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Sound & Skip Controls at Top */}
          <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
            {/* Audio Toggle Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              onClick={toggleSound}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/50 hover:bg-black/70 text-white text-xs md:text-sm font-medium backdrop-blur-md border border-white/25 transition-all duration-300 hover:scale-105 cursor-pointer shadow-2xl"
              title={isMuted ? "Unmute Voice" : "Mute Sound"}
            >
              {isMuted ? (
                <>
                  <VolumeX size={16} className="text-amber-400" />
                  <span>Tap for Sound</span>
                </>
              ) : (
                <>
                  <Volume2 size={16} className="text-emerald-400" />
                  <span>Voice ON</span>
                </>
              )}
            </motion.button>

            {/* Skip Intro Button */}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={(e) => {
                e.stopPropagation();
                handleFinish();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 text-white text-xs md:text-sm font-medium backdrop-blur-md border border-white/25 transition-all duration-300 hover:scale-105 cursor-pointer shadow-2xl"
            >
              <span>Skip Intro</span>
              <ChevronRight size={16} />
            </motion.button>
          </div>

          {/* Bottom Sleek Progress Overlay */}
          <div className="absolute bottom-5 left-0 right-0 z-30 max-w-lg mx-auto px-6 flex flex-col items-center gap-2 pointer-events-none">
            <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden backdrop-blur-md">
              <motion.div
                className="h-full bg-gradient-to-r from-teal-400 via-blue-400 to-[#3BAFDA]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>

            <div className="flex items-center justify-between w-full text-xs text-white/80 drop-shadow-md">
              <span className="font-semibold tracking-wider uppercase text-amber-300">Edge Expert</span>
              <span className="text-[11px] text-white/60 font-medium">Loading Experience...</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
