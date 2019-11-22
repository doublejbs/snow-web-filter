import React, { useState, MouseEvent } from "react";
import styled from "styled-components";

import VideoSection from "../components/VideoSection/VideoSection";
import FilterSection from "../components/FilterSection/FilterSection";
import Gallary from "../components/Gallary/Gallary";
import { Sticker } from "../utils/getStickerPosition";
import { useImageReducer } from "../hooks/imageReducer";

const WebFilter: React.FC = (): JSX.Element => {
  const [sticker, setSticker] = useState<Sticker | null>(null);
  const [filter, setFilter] = useState<string>("");
  // const [images, setImages] = useState<string[]>([]);
  const { images, dispatch } = useImageReducer();

  const addImage = (img: string): void => {
    dispatch({ type: "ADD_IMAGE", img });
  };
  const deleteImage = (_: MouseEvent, selectedImageIndex: boolean[]): void => {
    dispatch({ type: "DELETE_IMAGE", selectedImageIndex });
  };

  return (
    <Container>
      <VideoSection filter={filter} sticker={sticker} addImages={addImage} />
      <FilterSection setSticker={setSticker} setFilter={setFilter} />
      <Gallary images={images} deleteImage={deleteImage} />
    </Container>
  );
};

export default WebFilter;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
