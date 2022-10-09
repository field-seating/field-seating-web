const anonymousNameList = ['大王', '大谷', '十號隊友'];

export const generateAnonymousName = () => {
  const name =
    anonymousNameList[Math.floor(Math.random() * anonymousNameList.length)];
  return `匿名的${name}`;
};
