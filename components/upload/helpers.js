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
      action: () => {
        send('NEXT');
      },
    };
  }

  return {
    title: '下一步',
    action: () => {
      send('NEXT');
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
