import React, { useCallback } from "react";
import styled from "styled-components";
import Button from "../../common/Button";
import ImageBox from "./ImageBox";
import { IImage, Action } from "../../hooks/imageReducer";

interface IProps {
  images: IImage[];
  imageDispatch: React.Dispatch<Action>;
}

const Gallary: React.FC<IProps> = ({ images, imageDispatch }): JSX.Element => {
  const handleClickImg = useCallback(e => {
    const { id } = e.target.dataset;
    imageDispatch({ type: "TOGGLE_IMAGE", id });
  }, []);

  const deleteImage = (): void => {
    imageDispatch({ type: "DELETE_IMAGE" });
  };

  const downloadImage = (): void => {
    imageDispatch({ type: "DOWNLOAD_IMAGE" });
  };

  return (
    <>
      <Buttons>
        <Button onClick={deleteImage}>삭제</Button>
        <Button onClick={downloadImage}>저장</Button>
      </Buttons>
      <Container>
        {images.map((image: IImage) => (
          <ImageBox
            key={image.id}
            image={image}
            handleClickImg={handleClickImg}
          ></ImageBox>
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
