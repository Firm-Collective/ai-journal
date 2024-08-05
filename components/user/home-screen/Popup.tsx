import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {forwardRef, useEffect, useImperativeHandle} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {MonoText} from '@/components/StyledText';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const SCROLL_DESTINATION = -SCREEN_HEIGHT / 4;
const CLOSED_POSITION = SCREEN_HEIGHT / 5;

export interface PopupRef {
  scrollTo: (destination: number) => void;
}

const Popup = forwardRef<PopupRef>((props, ref) => {
  const translateY = useSharedValue(CLOSED_POSITION);
  const overlayOpacity = useSharedValue(0);
  const context = useSharedValue({y: 0});

  /**
   * Animated style for the bottom sheet
   */
  const reanimatedBottomStyle = useAnimatedStyle(e => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value,
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

  const handleEdit = () => {
    scrollTo(CLOSED_POSITION);
  };

  useImperativeHandle(ref, () => ({
    scrollTo,
  }));

  const tap = Gesture.Tap().onEnd(() => scrollTo(CLOSED_POSITION));

  return (
    <>
      <GestureDetector gesture={tap}>
        <Animated.View
          style={[styles.overlay, overlayStyle]}
          pointerEvents="auto"
        />
      </GestureDetector>
      <Animated.View style={[styles.container, reanimatedBottomStyle]}>
        <View style={styles.line} />
        <View style={styles.buttons_container}>
          <TouchableOpacity
            style={[styles.button, styles.button_border]}
            onPress={handleEdit}
          >
            <Image
              source={require('../../../assets/images/home-screen/Pencil.png')}
            />
            <MonoText>Edit</MonoText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.button_border]}>
            <Image
              source={require('../../../assets/images/home-screen/Bookmark.png')}
            />
            <MonoText>Mark As Favourite</MonoText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.button_border]}>
            <Image
              source={require('../../../assets/images/home-screen/Price Tag.png')}
            />
            <MonoText>Edit Tag</MonoText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require('../../../assets/images/home-screen/Delete.png')}
            />
            <MonoText style={{color: '#F34848'}}>Delete</MonoText>
          </TouchableOpacity>
        </View>
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
  buttons_container: {
    flex: 1,
    flexDirection: 'column',
  },
  button: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 12,
    gap: 10,
  },
  button_border: {
    borderBottomWidth: 1.5,
    borderBlockColor: '#ECEAEA',
  },
});

export {Popup, SCROLL_DESTINATION, CLOSED_POSITION};
