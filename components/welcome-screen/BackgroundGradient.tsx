import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
  Rect,
} from 'react-native-svg';

const GradientBackground = ({children}: any) => {
  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
        <Defs>
          <RadialGradient
            id="grad1"
            cx="100%"
            cy="0%"
            rx="150%"
            ry="150%"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor="#E9F5FF" stopOpacity="1" />
            <Stop offset="60%" stopColor="#E9F5FF" stopOpacity="0.6" />
            <Stop offset="100%" stopColor="#E9F5FF" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient
            id="grad2"
            cx="50%"
            cy="40%"
            rx="80%"
            ry="80%"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor="#F8F0FF" stopOpacity="0.8" />
            <Stop offset="70%" stopColor="#F8F0FF" stopOpacity="0.3" />
            <Stop offset="100%" stopColor="#F8F0FF" stopOpacity="0" />
          </RadialGradient>
          <LinearGradient
            id="grad3"
            x1="0%"
            y1="100%"
            x2="0%"
            y2="0%"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor="#FFF0E7" stopOpacity="0.9" />
            <Stop offset="60%" stopColor="#FFF0E7" stopOpacity="0.5" />
            <Stop offset="100%" stopColor="#FFF0E7" stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="#FFF0E7" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad3)" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad2)" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad1)" />
      </Svg>
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default GradientBackground;
