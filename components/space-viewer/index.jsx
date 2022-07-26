import { useMemo } from 'react';
import { isNil } from 'ramda';

import { SIDE, getCoordinate, getCanvasSize } from './helpers';
import Space from './Space';
import EmptyState from './EmptyState';

const SpaceViewer = ({ spaces, onSpaceSelect, xMirror }) => {
  const normalizedSpaces = useMemo(() => {
    const mapper = getCoordinate({ spaces, xMirror });

    return spaces.map((space) => {
      const { x, y } = mapper(space);

      return {
        ...space,
        x,
        y,
      };
    });
  }, [spaces, xMirror]);

  const canvasSize = useMemo(() => {
    return getCanvasSize(spaces);
  }, [spaces]);

  const isRenderReady = !isNil(xMirror) && normalizedSpaces.length !== 0;
  if (!isRenderReady) {
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
