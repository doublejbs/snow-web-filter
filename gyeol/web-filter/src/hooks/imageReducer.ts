import { useReducer } from "react";
import actionTypes from "../consts/actionTypes";

export interface IImage {
  id: string;
  url: string;
  selected: boolean;
}

export type Action = { type: Symbol; img?: IImage; id?: string };

const reducer = (state: IImage[], action: Action): IImage[] => {
  switch (action.type) {
    case actionTypes.ADD_IMAGE:
      if (action.img) {
        return [...state, action.img];
      }
      return state;
    case actionTypes.DELETE_IMAGE:
      const filteredImage = state.filter(img => !img.selected);
      return filteredImage;
    case actionTypes.TOGGLE_IMAGE:
      const copyState = [...state];
      const target = copyState.find(img => img.id === action.id);
      if (target) {
        target.selected = !target.selected;
      }
      return copyState;
    case actionTypes.DOWNLOAD_IMAGE:
      const images = [...state];
      const link = document.createElement("a");
      const download = () => {
        const image = images.pop();

        if (image && image.selected) {
          link.href = image.url;
          link.download = image.url;
          link.click();
        }
      };

      while (images.length) {
        download();
      }
      return state;
    default:
      return state;
  }
};

export const useImageReducer = () => {
  const [images, dispatch] = useReducer(reducer, []);

  return { images, dispatch };
};
