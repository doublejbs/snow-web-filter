import React, { useState, useEffect } from "react";
import styled from "styled-components";

import VideoSection from "../components/VideoSection/VideoSection";
import FilterSection from "../components/FilterSection/FilterSection";
import Gallary from "../components/Gallary/Gallary";
import { Sticker } from "../utils/getStickerPosition";

const WebFilter: React.FC = (): JSX.Element => {
  const [sticker, setSticker] = useState<Sticker | null>(null);
  const [filter, setFilter] = useState<string>("");

  return (
    <Container>
      <VideoSection filter={filter} sticker={sticker} />
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
