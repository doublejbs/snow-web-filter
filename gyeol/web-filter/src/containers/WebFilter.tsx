import React, { useState, useEffect } from "react";
import styled from "styled-components";
import clmtrackr from "clmtrackr";

import rabbitPng from "../assets/rabbit.png";
import tonguePng from "../assets/tongue.png";

import VideoSection from "../components/VideoSection";
import FilterSection from "../components/FilterSection/FilterSection";
import Gallary from "../components/Gallary";
import getStickerPosition, { Sticker } from "../utils/getStickerPosition";

const rabbit = new Image();
rabbit.src = rabbitPng;
const tongue = new Image();
tongue.src = tonguePng;

const WebFilter: React.FC = (): JSX.Element => {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [overlay, setOverlay] = useState<HTMLCanvasElement | null>(null);
  const [overlayCC, setOverlayCC] = useState<CanvasRenderingContext2D | null>(
    null
  );
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 400,
    height: 250
  });
  const [filter, setFilter] = useState<string>("");
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

  const startFaceTracker = (sticker: Sticker) => {
    if (!video || !overlay || !ctrack) return;
    ctrack.start(video);
    drawLoop(sticker);
  };

  const drawLoop = (sticker: Sticker) => {
    if (!overlay || !ctrack || !overlayCC) return;
    requestAnimationFrame(() => drawLoop(sticker));
    overlayCC.clearRect(0, 0, size.width, size.height);

    const positions = ctrack.getCurrentPosition();

    if (positions) {
      let img;
      switch (sticker) {
        case Sticker.RABBIT:
          img = rabbit;
          break;
        case Sticker.TONGUE:
          img = tongue;
          break;
        default:
          break;
      }

      if (!img) return;

      const [x, y, width, height] = getStickerPosition(positions, sticker, img);

      overlayCC.drawImage(img, x, y, width, height);
    }
  };

  return (
    <Container>
      <VideoSection
        setSize={setSize}
        size={size}
        filter={filter}
        setVideo={setVideo}
        setOverlay={setOverlay}
        setOverlayCC={setOverlayCC}
      />
      <FilterSection
        setFilter={setFilter}
        startFaceTracker={startFaceTracker}
      />
      <Gallary />
    </Container>
  );
};

export default WebFilter;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
