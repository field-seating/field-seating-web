import { isEmpty, map, prop, max, compose, multiply, add, reduce } from 'ramda';

export const GAP = 5;
export const SIDE = 50;

const multiplyUnitLength = multiply(GAP + SIDE);

const buffer = 10;

const getPosition =
  ({ rightEdgePosition, xMirror }) =>
  ({ positionRowNumber, positionColNumber }) => {
    if (!xMirror) {
      const y = multiplyUnitLength(positionRowNumber - 1);
      const x = rightEdgePosition - multiplyUnitLength(positionColNumber);

      return {
        x,
        y,
      };
    }

    const y = multiplyUnitLength(positionRowNumber - 1);
    const x = multiplyUnitLength(positionColNumber - 1);
    return {
      x,
      y,
    };
  };

export const getCoordinate = ({ spaces, xMirror }) => {
  const rightEdgePosition = compose(
    multiplyUnitLength,
    reduce(max, 0),
    map(prop('positionColNumber'))
  )(spaces);

  const renderPosition = getPosition({ rightEdgePosition, xMirror });

  return renderPosition;
};

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

export const renderSpaceTitle = ({ spaceType, rowNumber, colNumber, name }) => {
  if (spaceType === 'group') {
    return name;
  }

  return `${rowNumber}-${colNumber}`;
};
