import React, { useState, useCallback, useEffect, MouseEvent } from "react";
import styled from "styled-components";
import Button from "../../common/Button";

interface IProps {
  images: string[];
  deleteImage: (e: MouseEvent, seletedImageIndex: boolean[]) => void;
}

const Gallary: React.FC<IProps> = ({ images, deleteImage }): JSX.Element => {
  const [selectedImgIndex, setSelectedImgIndex] = useState<boolean[]>([]);

  useEffect(() => {
    const len = images.length;
    const temp = Array(len).fill(false);
    setSelectedImgIndex(temp);
  }, [images]);

  const handleClickImg = useCallback(
    e => {
      const { index } = e.target.dataset;
      console.log(e.target);
      const newIndexArray = [...selectedImgIndex];
      newIndexArray[index] = !newIndexArray[index];
      setSelectedImgIndex(newIndexArray);
    },
    [images, selectedImgIndex]
  );

  const handleDelete = useCallback(
    (e: MouseEvent) => {
      deleteImage(e, selectedImgIndex);
    },
    [images, selectedImgIndex]
  );

  return (
    <>
      <Buttons>
        <Button onClick={handleDelete}>삭제</Button>
        <Button>저장</Button>
      </Buttons>
      <Container>
        {images.map((image: string, index: number) => (
          <ImageBox key={image} selected={selectedImgIndex[index]}>
            <img
              alt="capture"
              data-index={index}
              src={image}
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
