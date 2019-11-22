import React, { MouseEvent } from "react";
import styled from "styled-components";
import { IImage } from "../../hooks/imageReducer";

interface IProps {
  image: IImage;
  handleClickImg: (e: MouseEvent) => void;
}

const ImageBox: React.FC<IProps> = ({ image, handleClickImg }): JSX.Element => {
  return (
    <Container selected={image.selected}>
      <img
        alt="capture"
        data-id={image.id}
        src={image.url}
        onClick={handleClickImg}
      />
    </Container>
  );
};

export default ImageBox;

interface IBox {
  selected: boolean;
}

const Container = styled.div`
  background-color: ${(props: IBox) => props.selected && "lightgray"};
  opacity: ${(props: IBox) => props.selected && "0.5"};
  padding: 1rem;
  width: fit-content;
  > img {
    height: 100%;
  }
`;
