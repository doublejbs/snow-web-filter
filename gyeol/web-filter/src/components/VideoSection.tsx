import React, { useRef, useEffect } from "react";
import styled from "styled-components";

interface IProps {
  setVideo: React.Dispatch<React.SetStateAction<HTMLVideoElement | null>>;
  size: { width: number; height: number };
}

const VideoSection: React.FC<IProps> = ({ setVideo, size }): JSX.Element => {
  const videoEl = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoEl) {
      return;
    }
    setVideo(videoEl.current);
  }, []);

  return (
    <Container>
      <Video ref={videoEl} size={size} />
    </Container>
  );
};

export default VideoSection;

const Container = styled.div``;

interface IVideo {
  size: { width: number; height: number };
}
const Video = styled.video`
  width: ${(props: IVideo) => `${props.size.width}px`};
  height: ${(props: IVideo) => `${props.size.height}px`};
  border: 2px solid lightgray;
`;
