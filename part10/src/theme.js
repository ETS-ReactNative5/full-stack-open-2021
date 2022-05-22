import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    lightGray: "#e1e4e8",
    darkGray: "#24292e",
    error: "#d73a4a",
  },
  fontSizes: {
    h1: 20,
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  borderRadius: {
    small: 4,
    normal: 6,
    big: 8,
  },
  spacing: {
    spacing10: 10,
    spacing15: 15,
    spacing20: 20,
  },
};

export default theme;