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
}

const VideoSection: React.FC<IProps> = ({ size, setSize }): JSX.Element => {
  const videoEl = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoEl) return;
    const video = videoEl.current;

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
