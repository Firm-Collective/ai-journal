import React, {useRef} from 'react';
import {
  Popup,
  SCROLL_DESTINATION,
  CLOSED_POSITION,
  PopupRef,
} from '@/components/user/home-screen/Popup';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Test() {
  const popupRef = useRef<PopupRef>(null);

  const handleScrollTo = () => {
    if (popupRef.current) {
      popupRef.current.scrollTo(SCROLL_DESTINATION); // Example destination
    } else {
      console.log('not exist');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleScrollTo}>
        <Text>Scroll</Text>
      </TouchableOpacity>
      <Popup ref={popupRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
