import { ActivationSection, PlayButton } from "./components";
import { VideoContainer, VideoLandingContainer, VideoOverlay } from "./styles";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIsMounted, useWindowSize } from "~/legacy/src/hooks";
import landingVideoSrc from "~/legacy/src/assets/pos-landing/video-landing.webm";
import { useTranslation } from "react-i18next";

const MAX_MEDIA_HEIGHT = 350;
const MIN_MEDIA_HEIGHT = 250;

export function VideoLanding() {
  const { t } = useTranslation();
  const isMounted = useIsMounted();
  const windowSizes = useWindowSize();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sizes, setSizes] = useState({
    width: 0,
    height: 0,
  });
  const isPaused = videoRef.current ? videoRef.current.paused : !isPlaying;
  const isTablet = windowSizes.width < 768;

  const handleOnPlay = useCallback(() => {
    videoRef.current?.play();
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    videoRef.current?.addEventListener("ended", () => {
      setIsPlaying(false);
    });
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const {
          contentRect: { width, height },
        } = entry;
        setSizes({ width, height });
      }
    });
    resizeObserver.observe(videoRef.current as HTMLVideoElement);
    return !isMounted
      ? resizeObserver.unobserve(videoRef.current as HTMLVideoElement)
      : void 0;
  }, [isMounted]);

  const videoHeight = isTablet
    ? windowSizes.width / 2
    : Math.max(MIN_MEDIA_HEIGHT, Math.min(MAX_MEDIA_HEIGHT, windowSizes.width));

  return (
    <VideoLandingContainer id={t("anchorTags.activation")}>
      <section className="video-landing__video">
        <VideoContainer width={sizes.width} height={sizes.height}>
          <video
            aria-label="Video presentación POS"
            height={videoHeight}
            ref={videoRef}
            controls={isPlaying}
            controlsList="nofullscreen nodownload"
            className="video-landing__video--media"
            playsInline
          >
            <source src={`${landingVideoSrc}#t=0.5`} type="video/webm" />
          </video>
          <VideoOverlay show={isPaused} />
          <PlayButton onPlay={handleOnPlay} show={isPaused} />
        </VideoContainer>
      </section>
      <ActivationSection />
    </VideoLandingContainer>
  );
}
