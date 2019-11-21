import React from "react";
import styled from "styled-components";

interface IProps {
  id: string;
  value: number;
  sliderChangeHandler: (event: any) => void;
}

const Container = styled.div`
  width: 90%;
  margin: 1rem auto;
  > input {
    width: 60%;
    margin-right: 4rem;
  }
`;

const SilderFilter: React.FC<IProps> = ({ id, value, sliderChangeHandler }) => {
  let max = 100;
  let min = 0;
  let unit = "%";
  if (id === "huRotate") {
    max = 90;
    min = 0;
    unit = "deg";
  } else if (id === "blur") {
    max = 10;
    min = 0;
    unit = "px";
  } else if (
    id === "contrast" ||
    id === "brightness" ||
    id === "saturate" ||
    id === "opacity"
  ) {
    max = 200;
    min = 0;
  }

  return (
    <Container>
      <input
        type="range"
        name="slider"
        min={min}
        max={max}
        id={id}
        value={value}
        onChange={e => sliderChangeHandler(e)}
      />
      <label htmlFor={id}>
        {id} : {value + unit}
      </label>
    </Container>
  );
};

export default SilderFilter;
