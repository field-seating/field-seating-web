import { colors } from 'lib/theme/customTheme';

const getContent = () => {
  return {
    name: '球場坐座',
    short_name: '球場坐座',
    start_url: '.',
    display: 'standalone',
    background_color: `${colors.surface.main}`,
    theme_color: `${colors.primary.main}`,
    description:
      '透過群眾上傳，提升看球體驗。照片更多，共享更多看球視野！操作更快，手機上傳一指搞定！',
    icons: [
      {
        src: 'icons/icon256.png',
        sizes: '256x256',
        type: 'image/png',
      },
    ],
  };
};

export default function handler(_, res) {
  const content = getContent();
  res.json(content);
}
