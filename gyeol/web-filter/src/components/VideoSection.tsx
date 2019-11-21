import React, { useRef, useEffect } from "react";
import styled from "styled-components";

interface IProps {
  setVideo: React.Dispatch<React.SetStateAction<HTMLVideoElement | null>>;
  setOverlay: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
  size: { width: number; height: number };
}

const VideoSection: React.FC<IProps> = ({
  setVideo,
  setOverlay,
  size
}): JSX.Element => {
  const videoEl = useRef<HTMLVideoElement>(null);
  const overlayEl = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!videoEl || !overlayEl) return;
    setVideo(videoEl.current);
    setOverlay(overlayEl.current);
  }, []);

  return (
    <Container size={size}>
      <Video ref={videoEl} />
      <Overlay ref={overlayEl} />
    </Container>
  );
};

export default VideoSection;

interface ISize {
  size: { width: number; height: number };
}
const Container = styled.div`
  position: relative;
  width: ${(props: ISize) => `${props.size.width}px`};
  height: ${(props: ISize) => `${props.size.height}px`};
`;

const Video = styled.video`
  height: 100%;
  width: 100%;
  border: 2px solid lightgray;
  box-sizing: border-box;
`;

const Overlay = styled.canvas`
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
`;
