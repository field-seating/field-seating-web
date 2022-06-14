import { useCallback } from 'react';

import { colors } from 'lib/theme/customTheme';

const Space = ({ id, title, x, y, width, height }) => {
  const onClick = useCallback(() => {
    alert(`select the seat: ${id}`);
  }, [id]);

  return (
    <g className="group" onClick={onClick}>
      <rect className="space" x={x} y={y} width={width} height={height}></rect>
      <text
        x={x + 0.5 * width}
        y={y + 0.5 * height}
        fontFamily="Verdana"
        fontSize="12"
        textAnchor="middle"
        alignmentBaseline="central"
        className="title"
      >
        {title}
      </text>
      <style jsx>{`
        .group {
          cursor: pointer;
        }
        .space {
          fill: ${colors.secondary.main};
        }
        .group:hover > .space {
          fill: ${colors.secondary.light};
        }
        .title {
          fill: ${colors.surface.main};
        }
      `}</style>
    </g>
  );
};

export default Space;
