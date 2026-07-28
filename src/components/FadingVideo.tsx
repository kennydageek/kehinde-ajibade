import React, { useEffect, useRef } from "react";

interface FadingVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

export const FadingVideo: React.FC<FadingVideoProps> = ({ src, className, style }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const fadingOutRef = useRef<boolean>(false);

  const fadeTo = (targetOpacity: number, duration: number) => {
    const video = videoRef.current;
    if (!video) return;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    const currentStr = video.style.opacity;
    const currentOpacity = currentStr ? parseFloat(currentStr) : 0;
    const startOpacity = isNaN(currentOpacity) ? 0 : currentOpacity;
    const startTime = performance.now();

    const animate = (currentTimeMs: number) => {
      const elapsed = currentTimeMs - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
      video.style.opacity = newOpacity.toString();

      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(animate);
      } else {
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start at opacity: 0
    video.style.opacity = "0";
    video.loop = false; // standard looping OFF as requested, we loop custom-ended

    const handleLoadedData = () => {
      video.style.opacity = "0";
      fadingOutRef.current = false;
      video.play().catch(() => {});
      fadeTo(1, 500); // FADE_MS = 500
    };

    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime) {
        const remaining = video.duration - video.currentTime;
        // FADE_OUT_LEAD = 0.55 seconds
        if (!fadingOutRef.current && remaining <= 0.55 && remaining > 0) {
          fadingOutRef.current = true;
          fadeTo(0, 500);
        }
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        if (!video) return;
        video.currentTime = 0;
        video.play().catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1, 500);
      }, 100); // 100ms timeout before play trigger
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    // Forces a fresh load of the video element and trigger play if already cached
    if (video.readyState >= 2) {
      handleLoadedData();
    } else {
      video.load();
    }

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      autoPlay
      preload="auto"
      className={className}
      style={{ ...style, transition: "none" }} // standard CSS transition is OFF
    />
  );
};
