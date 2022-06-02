import { compose, sort, groupBy, map, defaultTo, head } from 'ramda';

const getBackOptions = (send) => (stepIndex) => {
  if (stepIndex === 1) {
    return null;
  }

  return {
    title: '上一步',
    action: () => {
      send('BACK');
    },
  };
};

const getForwardOptions = (send) => (stepIndex, totalStep) => {
  if (stepIndex === totalStep) {
    return {
      title: '送出',
      action: (data) => {
        send({ type: 'NEXT', ...data });
      },
    };
  }

  return {
    title: '下一步',
    action: (data) => {
      send({ type: 'NEXT', ...data });
    },
  };
};

export const getChildProps = (send) => (stepIndex, totalStep) => {
  const backOption = getBackOptions(send)(stepIndex) || {};
  const forwardOption = getForwardOptions(send)(stepIndex, totalStep) || {};
  return {
    forwardTitle: forwardOption.title,
    onForward: forwardOption.action,
    backTitle: backOption.title,
    onBack: backOption.action,
  };
};

const sortById = sort((a, b) => a.id - b.id);

const groupByRow = groupBy((space) => space.rowNumber);
const groupByRowColumn = compose(
  map(head),
  groupBy((space) => `${space.rowNumber}:${space.colNumber}`)
);

export const spacesToRowOptions = (spaces) => {
  const rowSpaceMap = groupByRow(spaces);
  const rowColumnSpaceMap = groupByRowColumn(spaces);

  const rowOptions = Object.keys(rowSpaceMap).map((rowNumber) => ({
    id: rowNumber,
    name: rowNumber,
  }));

  return {
    rowOptions: sortById(rowOptions),
    rowSpaceMap,
    rowColumnSpaceMap,
  };
};

export const spacesToColumnOptions = compose(
  sortById,
  map((space) => ({
    id: space.colNumber,
    name: space.colNumber,
  })),
  defaultTo([])
);

export const getDefaultValue = (valueInContext, options) => {
  if (options.length === 0) {
    return null;
  }

  const optionSet = new Set(options.map((option) => String(option.id)));

  if (valueInContext && optionSet.has(String(valueInContext))) {
    return valueInContext;
  }

  return head(options).id;
};
