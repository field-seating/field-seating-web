import { isEmpty, map, prop, max, compose, multiply, add, reduce } from 'ramda';

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

const multiplyUnitLength = multiply(GAP + SIDE);

const buffer = 10;

export const getCanvasSize = (spaces) => {
  if (isEmpty(spaces)) {
    return {
      width: 0,
      height: 0,
    };
  }

  const height = compose(
    add(buffer),
    multiplyUnitLength,
    reduce(max, 0),
    map(prop('positionRowNumber'))
  )(spaces);

  const width = compose(
    add(buffer),
    multiplyUnitLength,
    reduce(max, 0),
    map(prop('positionColNumber'))
  )(spaces);

  return {
    width,
    height,
  };
};
