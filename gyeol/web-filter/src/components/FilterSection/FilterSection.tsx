import React, { useState, ChangeEvent, useCallback } from "react";
import styled from "styled-components";

import CustomFilter from "./CustomFilter";
import Button from "../../common/Button";
import filterToString from "../../utils/filterToString";
import { Sticker } from "../../utils/getStickerPosition";

interface IProps {
  setSticker: React.Dispatch<React.SetStateAction<Sticker | null>>;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  // startFaceTracker: (sticker: Sticker) => void;
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
  setSticker
  // startFaceTracker
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

  let flag = true;

  const sliderChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      if (flag) {
        flag = false;
        setTimeout(() => {
          const newFilter = { ...slideFilter, [name]: value };
          const newFilterString = filterToString(newFilter);

          flag = true;
          setSlideFilter(newFilter);
          setFilter(newFilterString);
        }, 50);
      }
    },
    [flag, filterToString, setSlideFilter, setFilter]
  );

  const onClickFilterButton = useCallback(() => {
    setFilter("blur(2px)");
  }, []);

  const toggleCustomFilter = useCallback(() => {
    setShowCustom(!showCustom);
  }, [showCustom]);

  const onClickSticker = useCallback(e => {
    const { sticker } = e.target.dataset;
    setSticker(sticker);
  }, []);

  return (
    <Container>
      <Button onClick={onClickFilterButton}>blur</Button>
      <Button data-sticker={Sticker.RABBIT} onClick={onClickSticker}>
        토끼귀
      </Button>
      <Button data-sticker={Sticker.TONGUE} onClick={onClickSticker}>
        메롱
      </Button>
      <Button onClick={toggleCustomFilter}>Custom</Button>
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
