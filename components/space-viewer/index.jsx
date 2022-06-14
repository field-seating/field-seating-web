import { useMemo } from 'react';

import { SIDE, getCoordinate } from './helpers';
import Space from './Space';
import EmptyState from './EmptyState';

const SpaceViewer = ({ spaces }) => {
  const normalizedSpaces = useMemo(() => {
    return spaces.map((space) => {
      console.log('getCoordinate heavy computing again');
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
      {normalizedSpaces.map(({ id, colNumber, rowNumber, x, y }) => (
        <Space
          key={id}
          title={`${rowNumber}-${colNumber}`}
          id={`${rowNumber}-${colNumber}`}
          x={x}
          y={y}
          width={SIDE}
          height={SIDE}
        />
      ))}
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
