import { useCallback } from 'react';

import { colors } from 'lib/theme/customTheme';
import { renderSpaceTitle } from './helpers';

const spaceTypeClassNameMap = {
  seat: 'seat',
  pillar: 'pillar',
  group: 'group',
};

const allowList = new Set(['seat', 'group']);

const Space = ({
  id,
  rowNumber,
  colNumber,
  name,
  x,
  y,
  width,
  height,
  spaceType,
  onSelect,
}) => {
  const onClick = useCallback(() => {
    onSelect(id);
  }, [onSelect, id]);

  const spaceClassname = spaceTypeClassNameMap[spaceType] || 'seat';

  const isClickable = allowList.has(spaceType);

  const title = renderSpaceTitle(spaceType)({
    name,
    rowNumber,
    colNumber,
  });

  return (
    <g className="container" onClick={isClickable ? onClick : null}>
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
        .container {
          cursor: pointer;
        }
        .group {
          fill: ${colors.secondary.light};
        }
        .seat {
          fill: ${colors.secondary.dark};
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
