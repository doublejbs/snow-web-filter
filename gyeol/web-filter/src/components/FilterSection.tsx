import React from "react";
import styled from "styled-components";

import Button from "./atoms/Button";

const FilterSection: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Button>필터 1</Button>
      <Button>필터 2</Button>
      <Button>필터 3</Button>
      <CaptureButton>캡쳐</CaptureButton>
    </Container>
  );
};

export default FilterSection;

const Container = styled.div`
  border: 1px solid black;
  margin: 1rem;
  padding: 1rem;
  display: flex;
`;

const CaptureButton = styled(Button)`
  border-radius: 0;
`;
