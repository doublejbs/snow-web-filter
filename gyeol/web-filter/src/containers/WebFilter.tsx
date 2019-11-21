import React, { useState, useEffect } from "react";
import styled from "styled-components";
import clmtrackr from "clmtrackr";

import rabbitPng from "../assets/rabbit.png";

import VideoSection from "../components/VideoSection";
import FilterSection from "../components/FilterSection/FilterSection";
import Gallary from "../components/Gallary";

const rabbit = new Image();
rabbit.src = rabbitPng;

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

  const startFaceTracker = () => {
    if (!video || !overlay || !ctrack) return;
    video.play();
    ctrack.start(video);
    setOverlayCC(overlay.getContext("2d"));
    drawLoop();
  };

  const drawLoop = () => {
    if (!overlay || !ctrack || !overlayCC) return;
    requestAnimationFrame(drawLoop);
    overlayCC.clearRect(0, 0, size.width, size.height);
    const positions = ctrack.getCurrentPosition();
    if (positions) {
      // get face position
      const leftEars = positions[0];
      const rightEars = positions[14];
      const nose = positions[33];
      const noseBottom = positions[37];

      const rabbitWidth = (rightEars[0] - leftEars[0]) * 1.3;
      const rabbitHeight = (rabbit.height * rabbitWidth) / rabbit.width;

      // draw rabbit
      overlayCC.drawImage(
        rabbit,
        nose[0] - rabbitWidth / 2,
        nose[1] - rabbitHeight - (noseBottom[1] - nose[1]),
        rabbitWidth,
        rabbitHeight
      );
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
