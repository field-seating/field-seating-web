import { useMemo } from 'react';

import { SIDE, getCoordinate } from './helpers';
import Space from './Space';
import EmptyState from './EmptyState';

const SpaceViewer = ({ spaces }) => {
  const normalizedSpaces = useMemo(() => {
    console.log('getCoordinate heavy computing again');
    return spaces.map((space) => {
      const { x, y } = getCoordinate(space);

      return {
        ...space,
        x,
        y,
      };
    });
  }, [spaces]);

  if (normalizedSpaces.length === 0) {
    return <EmptyState />;
  }

  return (
    <svg
      viewBox="0 0 2000 1000"
      className="container"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      {normalizedSpaces.map(
        ({ id, name, colNumber, rowNumber, spaceType, x, y }) => (
          <Space
            key={id}
            id={`${rowNumber}-${colNumber}`}
            name={name}
            rowNumber={rowNumber}
            colNumber={colNumber}
            x={x}
            y={y}
            width={SIDE}
            height={SIDE}
            spaceType={spaceType}
          />
        )
      )}
      <style jsx>{`
        .container {
          width: 2000px;
          height: 1000px;
        }
      `}</style>
    </svg>
  );
};

export default SpaceViewer;
