import React, { useState, useEffect } from "react";
import styled from "styled-components";
import clmtrackr from "clmtrackr";

import VideoSection from "../components/VideoSection";
import FilterSection from "../components/FilterSection";
import Gallary from "../components/Gallary";

const WebFilter: React.FC = (): JSX.Element => {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 400,
    height: 250
  });

  // clmtrackr init setting
  useEffect(() => {
    const ctrack = new clmtrackr.tracker();
    ctrack.init();
  }, []);

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
          };
        }
      })
      .catch(err => {
        console.log(`ERROR : ${err}`);
      });
  }, [video]);
  return (
    <Container>
      <VideoSection setVideo={setVideo} size={size} />
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
