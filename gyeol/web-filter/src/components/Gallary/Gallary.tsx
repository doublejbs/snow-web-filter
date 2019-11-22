import React, { useState, useCallback, useEffect, MouseEvent } from "react";
import styled from "styled-components";
import Button from "../../common/Button";
import { IImage } from "../../hooks/imageReducer";

interface IProps {
  images: IImage[];
  deleteImage: () => void;
  toggleImage: (id: string) => void;
}

const Gallary: React.FC<IProps> = ({
  images,
  deleteImage,
  toggleImage
}): JSX.Element => {
  const handleClickImg = useCallback(e => {
    const { id } = e.target.dataset;
    toggleImage(id);
  }, []);

  return (
    <>
      <Buttons>
        <Button onClick={deleteImage}>삭제</Button>
        <Button>저장</Button>
      </Buttons>
      <Container>
        {images.map((image: IImage) => (
          <ImageBox key={image.id} selected={image.selected}>
            <img
              alt="capture"
              data-id={image.id}
              src={image.url}
              onClick={handleClickImg}
            />
          </ImageBox>
        ))}
      </Container>
    </>
  );
};

export default Gallary;

const Container = styled.div`
  border: 1px solid black;
  height: 200px;
  width: 90%;
  margin: 1rem;
  overflow: auto;
  display: flex;
`;

const Buttons = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 2rem;
`;

interface IBox {
  selected: boolean;
}

const ImageBox = styled.div`
  background-color: ${(props: IBox) => props.selected && "lightgray"};
  opacity: ${(props: IBox) => props.selected && "0.5"};
  padding: 1rem;
  width: fit-content;
  > img {
    height: 100%;
  }
`;
