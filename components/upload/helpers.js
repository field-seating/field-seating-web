import { compose, sort, groupBy, map, defaultTo } from 'ramda';

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

export const spacesToRowOptions = (spaces) => {
  const rowSpaceMap = groupByRow(spaces);

  const rowOptions = Object.keys(rowSpaceMap).map((row) => ({
    id: row,
    name: row,
  }));

  return {
    rowOptions: sortById(rowOptions),
    rowSpaceMap,
  };
};

export const spacesToColOptions = compose(
  sortById,
  map((space) => ({
    id: space.colNumber,
    name: space.colNumber,
  })),
  defaultTo([])
);
