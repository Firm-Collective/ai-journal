import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import Post from './Post';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];


export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.view}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Post title={item.title} />}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  list:{
    flex: 1,
    width: '95%',
  }
});
