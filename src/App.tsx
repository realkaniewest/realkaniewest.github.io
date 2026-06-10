import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/media/underground-scroll.mp4";
const WALLPAPER_SRC = "/media/xp-wallpaper.png";

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frame = 0;

    const syncVideoToScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      setProgress(nextProgress);

      if (video.duration && Number.isFinite(video.duration)) {
        video.currentTime = nextProgress * video.duration;
      }
    };

    const requestSync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncVideoToScroll);
    };

    const unlockVideo = () => {
      video.pause();
      syncVideoToScroll();
    };

    video.addEventListener("loadedmetadata", unlockVideo);
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    requestSync();

    return () => {
      cancelAnimationFrame(frame);
      video.removeEventListener("loadedmetadata", unlockVideo);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, []);

  return (
    <main className="scroll-cinema" style={{ "--progress": progress } as React.CSSProperties}>
      <section className="scene scene--fixed" aria-label="Windows XP field underground scroll scene">
        <img className="scene__wallpaper" src={WALLPAPER_SRC} alt="" />
        <video
          ref={videoRef}
          className="scene__video"
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
        />
        <div className="scene__shade" />
        <div className="scene__hud">
          <p className="scene__eyebrow">realkaniewest.exe</p>
          <h1>scroll down</h1>
          <p>Поле уходит вниз, видео проматывается вместе со скроллом. Вверх - возвращаемся обратно.</p>
        </div>
      </section>

      <section className="scroll-space" aria-hidden="true">
        <div className="depth-marker depth-marker--one">surface</div>
        <div className="depth-marker depth-marker--two">soil layer</div>
        <div className="depth-marker depth-marker--three">deeper</div>
      </section>
    </main>
  );
}
