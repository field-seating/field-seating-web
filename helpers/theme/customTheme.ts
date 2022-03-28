import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      main: '#3F2C27',
      dark: '#1B0100',
      light: '#6A554F',
      transparent: 'rgba(63, 44, 39, 0.2)',
    },
    onPrimary: {
      main: '#FFFFFF',
      light: 'rgba(255, 255, 255, 0.7)',
    },
    secondary: {
      main: '#1B813E',
      light: '#53B16A',
      dark: '#005314',
    },
    onSecondary: {
      main: '#FFFFFF',
      light: 'rgba(255, 255, 255, 0.7)',
    },
    surface: {
      main: '#FFFFFF',
    },
    onSurface: {
      main: 'rgba(0, 0, 0, 0.75)',
      light: 'rgba(197, 197, 197, 0.5)',
      gray: 'rgba(0, 0, 0, 0.2)',
      40: 'rgba(0, 0, 0, 0.4)',
    },
  },
});

export default theme;
