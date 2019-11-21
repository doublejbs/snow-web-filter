import React, { useRef, useEffect } from "react";
import styled from "styled-components";

interface IProps {
  size: { width: number; height: number };
  setSize: React.Dispatch<
    React.SetStateAction<{
      width: number;
      height: number;
    }>
  >;
  filter: string;
  setVideo: React.Dispatch<React.SetStateAction<HTMLVideoElement | null>>;
  setOverlay: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
}

const VideoSection: React.FC<IProps> = ({
  size,
  setSize,
  filter,
  setVideo,
  setOverlay
}): JSX.Element => {
  const videoEl = useRef<HTMLVideoElement>(null);
  const overlayEl = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!videoEl || !overlayEl) return;
    const video = videoEl.current;
    const overlay = overlayEl.current;

    setVideo(video);
    setOverlay(overlay);

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
            video.width = size.width;
            video.height = size.height;
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

  useEffect(() => {
    const video = videoEl.current;

    if (!video) return;

    video.style.filter = filter;
  }, [filter]);

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
