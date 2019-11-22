import React, { useState, MouseEvent } from "react";
import styled from "styled-components";

import VideoSection from "../components/VideoSection/VideoSection";
import FilterSection from "../components/FilterSection/FilterSection";
import Gallary from "../components/Gallary/Gallary";
import { Sticker } from "../utils/getStickerPosition";
import { useImageReducer, IImage } from "../hooks/imageReducer";

const WebFilter: React.FC = (): JSX.Element => {
  const [sticker, setSticker] = useState<Sticker | null>(null);
  const [filter, setFilter] = useState<string>("");
  // const [images, setImages] = useState<string[]>([]);
  const { images, dispatch } = useImageReducer();

  const addImage = (img: IImage): void => {
    dispatch({ type: "ADD_IMAGE", img });
  };
  const deleteImage = (): void => {
    dispatch({ type: "DELETE_IMAGE" });
  };
  const toggleImage = (id: string): void => {
    dispatch({ type: "TOGGLE_IMAGE", id });
  };

  return (
    <Container>
      <VideoSection filter={filter} sticker={sticker} addImages={addImage} />
      <FilterSection setSticker={setSticker} setFilter={setFilter} />
      <Gallary
        images={images}
        deleteImage={deleteImage}
        toggleImage={toggleImage}
      />
    </Container>
  );
};

export default WebFilter;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
