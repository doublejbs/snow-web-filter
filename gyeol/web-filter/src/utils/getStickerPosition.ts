const getStickerPosition = (
  positions: [number, number][],
  sticker: Sticker,
  img: HTMLImageElement
): number[] => {
  switch (sticker) {
    case Sticker.RABBIT:
      const leftEars = positions[0];
      const rightEars = positions[14];
      const nose = positions[33];
      const noseBottom = positions[37];

      const rabbitWidth = (rightEars[0] - leftEars[0]) * 1.3;
      const rabbitHeight = (img.height * rabbitWidth) / img.width;
      return [
        nose[0] - rabbitWidth / 2,
        nose[1] - rabbitHeight - (noseBottom[1] - nose[1]),
        rabbitWidth,
        rabbitHeight
      ];
    case Sticker.TONGUE:
      const topLip = positions[60];
      const bottomLip = positions[57];
      const tongueWidth = positions[50][0] - positions[44][0];
      const tongueHeight = (img.height * tongueWidth) / img.width;

      if (bottomLip[1] - topLip[1] > 5) {
        return [
          topLip[0] - tongueWidth / 2,
          (topLip[1] + bottomLip[1]) / 2,
          tongueWidth,
          tongueHeight
        ];
      }
      return [0, 0, 0, 0];
    default:
      return [0, 0, 0, 0];
  }
};

export default getStickerPosition;

export enum Sticker {
  RABBIT = "rabbit",
  TONGUE = "tongue"
}
