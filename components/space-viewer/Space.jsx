import { useCallback } from 'react';

import { colors } from 'lib/theme/customTheme';

const spaceTypeClassNameMap = {
  seat: 'seat',
  pillar: 'pillar',
};

const allowList = new Set(['seat', 'group']);

const Space = ({ id, title, x, y, width, height, spaceType }) => {
  const onSelect = useCallback(() => {
    alert(`select the seat: ${id}`);
  }, [id]);

  const spaceClassname = spaceTypeClassNameMap[spaceType] || 'seat';
  const isClickable = allowList.has(spaceType);

  return (
    <g className="group" onClick={isClickable ? onSelect : null}>
      <rect
        className={spaceClassname}
        x={x}
        y={y}
        width={width}
        height={height}
      ></rect>
      {isClickable && (
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
      )}
      <style jsx>{`
        .group {
          cursor: pointer;
        }
        .seat {
          fill: ${colors.secondary.main};
        }
        .pillar {
          fill: ${colors.onSurface.main};
        }
        .group:hover > .seat {
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
