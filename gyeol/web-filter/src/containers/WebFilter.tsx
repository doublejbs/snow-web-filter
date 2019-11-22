import React, { useState, MouseEvent } from "react";
import styled from "styled-components";

import VideoSection from "../components/VideoSection";
import FilterSection from "../components/FilterSection";
import Gallary from "../components/Gallary";
import { Sticker } from "../utils/getStickerPosition";
import { useImageReducer, IImage } from "../hooks/imageReducer";

const WebFilter: React.FC = (): JSX.Element => {
  const [sticker, setSticker] = useState<Sticker | null>(null);
  const [filter, setFilter] = useState<string>("");
  const { images, dispatch } = useImageReducer();

  return (
    <Container>
      <VideoSection
        filter={filter}
        sticker={sticker}
        imageDispatch={dispatch}
      />
      <FilterSection setSticker={setSticker} setFilter={setFilter} />
      <Gallary images={images} imageDispatch={dispatch} />
    </Container>
  );
};

export default WebFilter;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
