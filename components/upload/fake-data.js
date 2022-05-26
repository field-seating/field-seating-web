import { isNil } from 'ramda';

export const fieldOptions = [
  {
    id: 1,
    name: '桃園棒球場',
  },
  {
    id: 2,
    name: '新莊棒球場',
  },
  {
    id: 3,
    name: '台南棒球場',
  },
];

const orientationMap = {
  1: [
    {
      id: 1,
      name: '桃園西',
    },
    {
      id: 2,
      name: '桃園東',
    },
  ],
  2: [
    {
      id: 3,
      name: '新莊西',
    },
    {
      id: 4,
      name: '新莊東',
    },
  ],
  3: [
    {
      id: 5,
      name: '台南西',
    },
    {
      id: 6,
      name: '台南東',
    },
  ],
};

const levelMap = {
  1: [
    {
      id: 1,
      name: '桃園上',
    },
    {
      id: 2,
      name: '桃園下',
    },
  ],
  2: [
    {
      id: 3,
      name: '新莊上',
    },
    {
      id: 4,
      name: '新莊下',
    },
  ],
  3: [
    {
      id: 5,
      name: '台南上',
    },
    {
      id: 6,
      name: '台南下',
    },
  ],
};

export const fetchOptions = (fieldId) => {
  console.log('fetch orientation and level by field', fieldId);

  if (isNil(fieldId)) {
    return Promise.resolve([]);
  }

  return Promise.resolve({
    orientationOptions: orientationMap[fieldId],
    levelOptions: levelMap[fieldId],
  });
};
