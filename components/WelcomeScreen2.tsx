import React, { useState, useRef } from 'react';
import { Image, StyleSheet, View, Text, Dimensions, FlatList, ImageBackground } from 'react-native';
import SignupButton from '@/components/auth/buttons/SignupButtonToSignup';
import LoginButton from '@/components/auth/buttons/LoginButtonToLogin';

const { width, height } = Dimensions.get('window');

interface DataItem {
  id: string;
  text: string;
  gradient: string;
}

const data: DataItem[] = [
  { id: '1', text: 'Welcome to OneVoice', gradient: 'orange' },
  { id: '2', text: 'Capture Your Reflections', gradient: 'red' },
  { id: '3', text: 'AI-Powered Insights and Summaries', gradient: 'green' },
  { id: '4', text: 'Share and Connect', gradient: 'blue' },
];

const gradientImages: { [key: string]: any } = {
  'orange': require('../assets/images/welcome-screen/gradient-orange.png'),
  'red': require('../assets/images/welcome-screen/gradient-red.png'),
  'green': require('../assets/images/welcome-screen/gradient-green.png'),
  'blue': require('../assets/images/welcome-screen/gradient-blue.png'),
};

const SwipeScroll: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<DataItem>>(null);

  const onViewRef = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderItem = ({ item }: { item: DataItem }) => (
    activeIndex !== 0 ? (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText1}>{item.text}</Text>
      </View>
    ) : (
      <View style={styles.itemContainer}>
        <Image
          style={styles.logosIcon0}
          resizeMode="contain"
          source={require('../assets/images/welcome-screen/logos.png')}
        />
        <Text style={styles.itemText0}>
          <Text style={styles.thickText0}>Welcome to{'\n'}one</Text>
          <Text style={styles.thinText0}>voice</Text>
        </Text>
      </View>
    )
  );

  const currentGradient = data[activeIndex]?.gradient || 'red';
  const backgroundImage = gradientImages[currentGradient];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        resizeMode="cover"
      >
        {activeIndex !== 0 && (
          <Image
            style={styles.logosIcon1}
            source={require('../assets/images/onevoice-journal-logo-1.png')}
            resizeMode="contain"
          />
        )}

        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
        />
        <View style={styles.dotsContainer}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index <= activeIndex ? '#1177C7' : '#D9D9D9' },
              ]}
            />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <LoginButton />
          <SignupButton />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins',
  },
  welcomeContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logosIcon0: {
    marginTop: 200,
    marginBottom: 20,
    width: 114,
    height: 114,
    alignSelf: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  logosIcon1: {
    marginTop: 60,
    width: 154,
    height: 45,
    alignSelf: 'center',
  },
  itemContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText1: {
    width: '80%',
    fontSize: 34,
    fontFamily: 'Poppins',
    fontWeight: '700',
    textAlign: 'center',
    padding: 20,
    lineHeight: 51,
  },
  itemText0: {
    width: '80%',
    fontSize: 36,
    fontFamily: 'Poppins',
    textAlign: 'center',
    padding: 20,
    lineHeight: 43.52,
  },
  thickText0: {
    fontWeight: '700',
  },
  thinText0: {
    fontWeight: '300',
  },
  dotsContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 150,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
});

export default SwipeScroll;