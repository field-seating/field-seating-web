const getBackOptions = (send) => (stepIndex) => {
  if (stepIndex === 1) {
    return null;
  }

  return {
    title: '上一步',
    onClick: () => {
      send('BACK');
    },
  };
};

const getForwardOptions = (send) => (stepIndex, totalStep) => {
  if (stepIndex === totalStep) {
    return {
      title: '送出',
      onClick: () => {
        send('SUBMIT');
      },
    };
  }

  return {
    title: '下一步',
    onClick: () => {
      send('NEXT');
    },
  };
};

export const getFooterOptions = (send) => (stepIndex, totalStep) => {
  return {
    back: getBackOptions(send)(stepIndex),
    forward: getForwardOptions(send)(stepIndex, totalStep),
  };
};
