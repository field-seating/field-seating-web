export const GAP = 5;
export const SIDE = 50;

export const getCoordinate = ({ positionRowNumber, positionColNumber }) => {
  const y = (positionRowNumber - 1) * (SIDE + GAP);
  const x = (positionColNumber - 1) * (SIDE + GAP);

  return {
    x,
    y,
  };
};
