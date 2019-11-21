import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";

import CustomFilter from "./CustomFilter";
import Button from "./Button";
import filterToString from "../../utils/filterToString";

interface IProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  startFaceTracker: () => void;
}

export interface IFilter {
  grayscale: number;
  sepia: number;
  invert: number;
  hueRotate: number;
  blur: number;
  contrast: number;
  brightness: number;
  saturate: number;
  opacity: number;
}

const FilterSection: React.FC<IProps> = ({
  setFilter,
  startFaceTracker
}): JSX.Element => {
  const [showCustom, setShowCustom] = useState<boolean>(false);

  const [slideFilter, setSlideFilter] = useState<IFilter>({
    // 이하 0 ~ 100
    grayscale: 0,
    sepia: 0,
    invert: 0,
    hueRotate: 0, // deg
    blur: 0, // px
    // 이하 0 ~ 200%
    contrast: 100,
    brightness: 100,
    saturate: 100,
    opacity: 100
  });

  const [timer, setTimer] = useState<number>(0);
  const sliderChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (!timer) {
      setTimer(
        setTimeout(() => {
          const newFilter = { ...slideFilter, [name]: value };
          const newFilterString = filterToString(newFilter);

          setTimer(0);
          setSlideFilter(newFilter);
          setFilter(newFilterString);
        }, 50)
      );
    }
  };

  const onClickFilterButton = () => {
    setFilter("blur(2px)");
  };

  return (
    <Container>
      <Button onClick={onClickFilterButton}>blur</Button>
      <Button onClick={startFaceTracker}>필터 2</Button>
      <Button onClick={() => setShowCustom(!showCustom)}>Custom</Button>
      <CaptureButton>캡쳐</CaptureButton>
      {showCustom ? (
        <CustomFilter
          slideFilter={slideFilter}
          sliderChangeHandler={sliderChangeHandler}
        />
      ) : null}
    </Container>
  );
};

export default FilterSection;

const Container = styled.div`
  border: 1px solid black;
  margin: 1rem;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
`;

const CaptureButton = styled(Button)`
  border-radius: 0;
`;
