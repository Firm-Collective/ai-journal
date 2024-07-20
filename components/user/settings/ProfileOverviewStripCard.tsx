import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';

export default function ProfileOverviewStripCard({
  userProp,
  propValue,
  extStyles = {},
}) {
  const {width: windowWidth} = useWindowDimensions();

  return (
    <View style={[styles.container, {width: windowWidth * 0.9}]}>
      <Text>{userProp}</Text>
      <Text>{propValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#DEE5EE',
    padding: 15,
    borderRadius: 5,
    borderWidth: 2,
  },
});
