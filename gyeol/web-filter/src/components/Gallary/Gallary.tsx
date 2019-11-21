import React from "react";
import styled from "styled-components";

interface IProps {
  images: string[];
}

const Gallary: React.FC<IProps> = ({ images }): JSX.Element => {
  return (
    <Container>
      {images.map((image: string) => (
        <img alt="capture" src={image} key={image} />
      ))}
    </Container>
  );
};

export default Gallary;

const Container = styled.div`
  border: 1px solid black;
  height: 200px;
  width: 90%;
  margin: 1rem;
  padding: 1rem;
  overflow: auto;
  display: flex;
  > img {
    height: 100%;
    margin: 0 1rem;
  }
`;
