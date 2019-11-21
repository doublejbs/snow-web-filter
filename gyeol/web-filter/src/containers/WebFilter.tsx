import React, { useState, useEffect } from "react";
import styled from "styled-components";

import VideoSection from "../components/VideoSection";
import FilterSection from "../components/FilterSection/FilterSection";
import Gallary from "../components/Gallary";
import { Sticker } from "../utils/getStickerPosition";

const WebFilter: React.FC = (): JSX.Element => {
  const [sticker, setSticker] = useState<Sticker | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 400,
    height: 250
  });

  return (
    <Container>
      <VideoSection
        setSize={setSize}
        size={size}
        filter={filter}
        sticker={sticker}
      />
      <FilterSection setSticker={setSticker} setFilter={setFilter} />
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
