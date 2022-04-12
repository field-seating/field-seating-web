import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  shadows: {
    onSurface: '0 0 1px 2px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, .15)',
  },
  colors: {
    primary: {
      main: '#3F2C27',
      dark: '#1B0100',
      light: '#6A554F',
      transparent: 'rgba(63, 44, 39, 0.2)',
      'transparent.60': 'rgba(63, 44, 39, 0.6)',
    },
    onPrimary: {
      main: '#FFFFFF',
      light: 'rgba(255, 255, 255, 0.7)',
      transparent: 'rgba(255, 255, 255, 0.4)',
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
    error: {
      main: '#E53E3E',
    },
  },
});

export default theme;
