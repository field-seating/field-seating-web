import { useMemo } from 'react';

import { SIDE, getCoordinate, getCanvasSize } from './helpers';
import Space from './Space';
import EmptyState from './EmptyState';

const SpaceViewer = ({ spaces, onSpaceSelect }) => {
  const normalizedSpaces = useMemo(() => {
    return spaces.map((space) => {
      const { x, y } = getCoordinate(space);

      return {
        ...space,
        x,
        y,
      };
    });
  }, [spaces]);

  const canvasSize = useMemo(() => {
    return getCanvasSize(spaces);
  }, [spaces]);

  if (normalizedSpaces.length === 0) {
    return <EmptyState />;
  }

  return (
    <svg
      viewBox={`0 0 ${canvasSize.width} ${canvasSize.height}`}
      className="container"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      {normalizedSpaces.map(
        ({ id, name, colNumber, rowNumber, spaceType, x, y }) => (
          <Space
            key={id}
            id={id}
            name={name}
            rowNumber={rowNumber}
            colNumber={colNumber}
            x={x}
            y={y}
            width={SIDE}
            height={SIDE}
            spaceType={spaceType}
            onSelect={onSpaceSelect}
          />
        )
      )}
      <style jsx>{`
        .container {
          width: ${canvasSize.width}px;
          height: ${canvasSize.height}px;
        }
      `}</style>
    </svg>
  );
};

export default SpaceViewer;
