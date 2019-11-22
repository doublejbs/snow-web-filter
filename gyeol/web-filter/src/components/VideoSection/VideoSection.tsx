import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import clmtrackr from "clmtrackr";

import Button from "../../common/Button";
import getStickerPosition, { Sticker } from "../../utils/getStickerPosition";
import { IImage, Action } from "../../hooks/imageReducer";
import getUUID from "../../utils/getUUID";
import actionTypes from "../../consts/actionTypes";

interface IProps {
  filter: string;
  sticker: Sticker | null;
  imageDispatch: React.Dispatch<Action>;
}

const VideoSection: React.FC<IProps> = ({
  filter,
  sticker,
  imageDispatch
}): JSX.Element => {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [overlay, setOverlay] = useState<HTMLCanvasElement | null>(null);
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
    setOverlay(overlay);

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

    if (!video || !overlay) return;

    video.style.filter = filter;
    overlay.style.filter = filter;
  }, [filter]);

  // sticker가 바뀔 때,
  useEffect(() => {
    if (sticker) {
      startFaceTracker(sticker);
    }
  }, [sticker]);

  // capture
  const takePicture = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = size.width;
    canvas.height = size.height;

    if (!context || !video || !overlay) return;

    context.filter = filter;
    context.drawImage(video, 0, 0, size.width, size.height);
    context.drawImage(overlay, 0, 0, size.width, size.height);

    const imgUrl = canvas.toDataURL("image/png");

    const img = {
      id: getUUID(),
      url: imgUrl,
      selected: false
    };

    imageDispatch({ type: actionTypes.ADD_IMAGE, img });
  };

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
      <CaptureButton onClick={takePicture}>캡쳐</CaptureButton>
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
  min-height: ${(props: IVideo) => `${props.size.height}px`};
`;

const Video = styled.video`
  width: 100%;
  border: 2px solid lightgray;
  box-sizing: border-box;
`;

const Overlay = styled.canvas`
  position: absolute;
  left: 0;
  width: 100%;
`;

const CaptureButton = styled(Button)`
  border-radius: 0;
  width: 100px;
  margin: 0.5rem auto;
  text-align: center;
`;
