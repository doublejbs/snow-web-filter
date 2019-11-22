import { useReducer } from "react";

type Action =
  | { type: "ADD_IMAGE"; img: string }
  | { type: "DELETE_IMAGE"; selectedImageIndex: boolean[] };

const reducer = (state: string[], action: Action) => {
  switch (action.type) {
    case "ADD_IMAGE":
      return [...state, action.img];
    case "DELETE_IMAGE":
      const { selectedImageIndex } = action;
      const filteredImage = state.filter(
        (_, index) => !selectedImageIndex[index]
      );
      return filteredImage;
  }
};

export const useImageReducer = () => {
  const [images, dispatch] = useReducer(reducer, []);

  return { images, dispatch };
};
