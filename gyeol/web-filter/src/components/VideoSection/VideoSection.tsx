import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import clmtrackr from "clmtrackr";

import getStickerPosition, { Sticker } from "../../utils/getStickerPosition";

interface IProps {
  filter: string;
  sticker: Sticker | null;
}

const VideoSection: React.FC<IProps> = ({ filter, sticker }): JSX.Element => {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [overlayCC, setOverlayCC] = useState<CanvasRenderingContext2D | null>(
    null
  );
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 400,
    height: 300
  });

  const videoEl = useRef<HTMLVideoElement>(null);
  const overlayEl = useRef<HTMLCanvasElement>(null);

  const [ctrack, setCtrack] = useState<clmtrackr.tracker | null>(null);

  // clmtrackr init setting
  useEffect(() => {
    if (!ctrack) {
      const ct = new clmtrackr.tracker({
        faceDetection: {
          useWebWorkers: false
        }
      });
      setCtrack(ct);
      ct.init();
    }
  }, [ctrack]);

  useEffect(() => {
    if (!videoEl || !overlayEl) return;
    const video = videoEl.current;
    const overlay = overlayEl.current;
    if (overlay) {
      const overlayCC = overlay.getContext("2d");

      setOverlayCC(overlayCC);
    }

    setVideo(video);

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true
      })
      .then((stream: MediaStream) => {
        if (video && overlay) {
          video.srcObject = stream;
          video.onloadedmetadata = (): void => {
            const height = video.videoHeight / (video.videoWidth / size.width);
            video.width = size.width;
            video.height = size.height;
            overlay.width = size.width;
            overlay.height = size.height;
            setSize({ ...size, height });
          };

          // 준비 되면 play
          video.oncanplaythrough = (): void => {
            video.play();
          };
        }
      })
      .catch(err => {
        console.log(`ERROR : ${err}`);
      });
  }, []);

  // filter가 바뀔 때,
  useEffect(() => {
    const video = videoEl.current;

    if (!video) return;

    video.style.filter = filter;
  }, [filter]);

  // sticker가 바뀔 때,
  useEffect(() => {
    if (sticker) {
      startFaceTracker(sticker);
    }
  }, [sticker]);

  const startFaceTracker = (sticker: Sticker) => {
    if (!video || !ctrack) return;
    ctrack.start(video);
    drawLoop(sticker);
  };

  const drawLoop = (sticker: Sticker) => {
    if (!ctrack || !overlayCC) return;
    requestAnimationFrame(() => drawLoop(sticker));
    overlayCC.clearRect(0, 0, size.width, size.height);

    const positions = ctrack.getCurrentPosition();

    if (positions) {
      const [x, y, width, height, img] = getStickerPosition(positions, sticker);

      overlayCC.drawImage(img, x, y, width, height);
    }
  };

  return (
    <Container size={size}>
      <Video ref={videoEl} />
      <Overlay ref={overlayEl} />
    </Container>
  );
};

export default VideoSection;

interface IVideo {
  size: { width: number; height: number };
}
const Container = styled.div`
  position: relative;
  width: ${(props: IVideo) => `${props.size.width}px`};
  height: ${(props: IVideo) => `${props.size.height}px`};
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  border: 2px solid lightgray;
  box-sizing: border-box;
`;

const Overlay = styled.canvas`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
`;
