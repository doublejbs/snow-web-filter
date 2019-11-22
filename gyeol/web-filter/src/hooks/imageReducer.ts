import { useReducer } from "react";

export interface IImage {
  id: string;
  url: string;
  selected: boolean;
}

export type Action =
  | { type: "ADD_IMAGE"; img: IImage }
  | { type: "DELETE_IMAGE" }
  | { type: "TOGGLE_IMAGE"; id: string }
  | { type: "DOWNLOAD_IMAGE" };

const reducer = (state: IImage[], action: Action): IImage[] => {
  switch (action.type) {
    case "ADD_IMAGE":
      return [...state, action.img];
    case "DELETE_IMAGE":
      const filteredImage = state.filter(img => !img.selected);
      return filteredImage;
    case "TOGGLE_IMAGE":
      const copyState = [...state];
      const target = copyState.find(img => img.id === action.id);
      if (target) {
        target.selected = !target.selected;
      }
      return copyState;
    case "DOWNLOAD_IMAGE":
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
  }
};

export const useImageReducer = () => {
  const [images, dispatch] = useReducer(reducer, []);

  return { images, dispatch };
};
