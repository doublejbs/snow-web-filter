import React from "react";
import styled from "styled-components";
import VideoSection from "../components/VideoSection";
import FilterSection from "../components/FilterSection";
import Gallary from "../components/Gallary";

const WebFilter: React.FC = (): JSX.Element => {
  return (
    <Container>
      <VideoSection />
      <FilterSection />
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
