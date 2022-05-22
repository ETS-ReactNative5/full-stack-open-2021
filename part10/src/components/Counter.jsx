import { View, Text, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: theme.fontSizes.h1,
    fontWeight: theme.fontWeights.bold,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
    marginTop: 6,
  },
});

const Counter = ({ number, text }) => {
  const formattedNumber = (value) => {
    const round = (value) => Math.round(value * 10) / 10;

    if (typeof value !== "number") return null;
  
    if (value < 1000) return value.toLocaleString();
  
    return `${round(value / 1000).toLocaleString()}k`;
  };

  return (
    <View testID="counterItem" style={styles.container}>
      <Text style={styles.title}>{formattedNumber(number)}</Text>
      <Text style={styles.subtitle}>{text}</Text>
    </View>
  );
};

export default Counter;