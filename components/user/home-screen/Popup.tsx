import {Dimensions, StyleSheet, View} from 'react-native';
import React, {forwardRef, useImperativeHandle} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const SCROLL_DESTINATION = -SCREEN_HEIGHT / 4;
const CLOSED_POSITION = SCREEN_HEIGHT / 2;

export interface PopupProps {
  children?: React.ReactNode;
}

export interface PopupRef {
  scrollTo: (destination: number) => void;
}

const Popup = forwardRef<PopupRef, PopupProps>((props, ref) => {
  const {children} = props;
  const translateY = useSharedValue(CLOSED_POSITION);
  const overlayOpacity = useSharedValue(0);

  /**
   * Animated style for the bottom sheet
   */
  const reanimatedBottomStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value,
      pointerEvents: overlayOpacity.value > 0 ? 'auto' : 'none',
    };
  });

  /**
   * Scrolls to a specific destination
   * @param {number} destination - The destination to scroll to
   */
  const scrollTo = (destination: any) => {
    'worklet';
    translateY.value = withSpring(destination, {
      damping: 15,
      stiffness: 80,
      velocity: 15,
    });
    overlayOpacity.value =
      destination === CLOSED_POSITION ? withTiming(0) : withTiming(1);
  };

  useImperativeHandle(ref, () => ({
    scrollTo,
  }));

  const tap = Gesture.Tap().onEnd(() => scrollTo(CLOSED_POSITION));

  return (
    <>
      <GestureDetector gesture={tap}>
        <Animated.View style={[styles.overlay, overlayStyle]} />
      </GestureDetector>
      <Animated.View style={[styles.container, reanimatedBottomStyle]}>
        <View style={styles.line} />
        {children}
      </Animated.View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: SCREEN_HEIGHT,
    position: 'absolute',
    backgroundColor: '#FFF',
    top: SCREEN_HEIGHT / 1.5,
    zIndex: 12000,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 11000,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'black',
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export {Popup, SCROLL_DESTINATION, CLOSED_POSITION};
