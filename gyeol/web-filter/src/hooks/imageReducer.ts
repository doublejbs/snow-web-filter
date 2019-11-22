import { useReducer } from "react";

export interface IImage {
  id: string;
  url: string;
  selected: boolean;
}

type Action =
  | { type: "ADD_IMAGE"; img: IImage }
  | { type: "DELETE_IMAGE" }
  | { type: "TOGGLE_IMAGE"; id: string };

const reducer = (state: IImage[], action: Action): IImage[] => {
  switch (action.type) {
    case "ADD_IMAGE":
      console.log(action.img);
      return [...state, action.img];
    case "DELETE_IMAGE":
      const filteredImage = state.filter(img => !img.selected);
      return filteredImage;
    case "TOGGLE_IMAGE":
      const changedState = state.map(img => {
        if (img.id === action.id) {
          img.selected = !img.selected;
        }
        return img;
      });

      return changedState;
  }
};

export const useImageReducer = () => {
  const [images, dispatch] = useReducer(reducer, []);

  return { images, dispatch };
};
