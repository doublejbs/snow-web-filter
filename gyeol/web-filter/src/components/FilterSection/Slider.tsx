import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface IProps {
  name: string;
  value: number;
  sliderChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Container = styled.div`
  width: 90%;
  margin: 1rem auto;
  > input {
    width: 60%;
    margin-right: 4rem;
  }
`;

const SilderFilter: React.FC<IProps> = ({
  name,
  value,
  sliderChangeHandler
}) => {
  let max = 100;
  let min = 0;
  let unit = "%";

  if (name === "huRotate") {
    max = 90;
    min = 0;
    unit = "deg";
  } else if (name === "blur") {
    max = 10;
    min = 0;
    unit = "px";
  } else if (
    name === "contrast" ||
    name === "brightness" ||
    name === "saturate" ||
    name === "opacity"
  ) {
    max = 200;
    min = 0;
  }

  return (
    <Container>
      <input
        type="range"
        min={min}
        max={max}
        name={name}
        value={value}
        onChange={e => sliderChangeHandler(e)}
      />
      <label htmlFor={name}>
        {name} : {value + unit}
      </label>
    </Container>
  );
};

export default SilderFilter;
