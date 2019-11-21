import React, { ChangeEvent } from "react";
import styled from "styled-components";
import Slider from "./atoms/Slider";
import { IFilter } from "./FilterSection";

interface IProps {
  slideFilter: IFilter;
  sliderChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomFilter: React.FC<IProps> = ({
  slideFilter,
  sliderChangeHandler
}): JSX.Element => {
  return (
    <Container>
      {Object.keys(slideFilter).map((filter: string) => (
        <Slider
          key={filter}
          id={filter}
          value={slideFilter[filter]}
          sliderChangeHandler={sliderChangeHandler}
        />
      ))}
    </Container>
  );
};

export default CustomFilter;

const Container = styled.div`
  border: 1px solid black;
  width: 100%;
  margin: 1rem;
`;
