import React, { useState, useEffect } from "react";
import styled from "styled-components";
import clmtrackr from "clmtrackr";

import VideoSection from "../components/VideoSection";
import FilterSection from "../components/FilterSection/FilterSection";
import Gallary from "../components/Gallary";

const WebFilter: React.FC = (): JSX.Element => {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 400,
    height: 250
  });
  const [filter, setFilter] = useState<string>("");

  // clmtrackr init setting
  useEffect(() => {
    const ctrack = new clmtrackr.tracker();

    ctrack.init();
  }, []);

  return (
    <Container>
      <VideoSection setSize={setSize} size={size} filter={filter} />
      <FilterSection setFilter={setFilter} />
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
