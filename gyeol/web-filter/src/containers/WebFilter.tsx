import React, { useState, useEffect } from "react";
import styled from "styled-components";
import clmtrackr from "clmtrackr";

import VideoSection from "../components/VideoSection";
import FilterSection from "../components/FilterSection";
import Gallary from "../components/Gallary";

const WebFilter: React.FC = (): JSX.Element => {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [overlay, setOverlay] = useState<HTMLCanvasElement | null>(null);

  const [ctrack, setCtrack] = useState<clmtrackr.tracker | null>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 400,
    height: 250
  });

  // clmtrackr init setting
  useEffect(() => {
    if (!ctrack) {
      const ct = new clmtrackr.tracker();
      setCtrack(ct);
    } else {
      ctrack.init();
    }
  }, [ctrack]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true
      })
      .then((stream: MediaStream) => {
        if (video) {
          video.srcObject = stream;
          video.onloadedmetadata = (): void => {
            const height = video.videoHeight / (video.videoWidth / size.width);
            setSize({ ...size, height });
          };

          // 준비 되면 play
          video.oncanplaythrough = (): void => {
            video.play();
            startTracker();
          };
        }
      })
      .catch(err => {
        console.log(`ERROR : ${err}`);
      });
  }, [video]);

  const startTracker = () => {
    if (!ctrack || !video) return;
    video.play();
    ctrack.start(video);
    drawRabbitEars();
  };

  const drawRabbitEars = () => {
    if (!overlay || !ctrack) return;
    // 화면에 표시되는 동안만, frame에 맞게 반복 실행
    // requestAnimationFrame(drawRabbitEars);
    // overlay 초기화
    const overlayCC = overlay.getContext("2d");
    console.log(ctrack);
    if (!overlayCC) return;
    overlayCC.clearRect(0, 0, size.width, size.height);

    if (ctrack.getCurrentPosition()) {
      console.log("!!");
      // get points
      const positions = ctrack.getCurrentPosition();
      console.log(positions);
    }
  };

  return (
    <Container>
      <VideoSection setVideo={setVideo} setOverlay={setOverlay} size={size} />
      <FilterSection />
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
