import React, { useState } from 'react';
import { View, SafeAreaView, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon
import { useLayout } from '@/components/context/LayoutContext'; // Import the context hook
import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router"

const Navbar = () => {
  const router = useRouter();
  // State to track which button is selected
  const [selectedLayout, setSelectedLayout] = useState(null);

  const { layout, setLayout } = useLayout(); // Use the context hook
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {/* Left-aligned group (homepageLayout) */}
      <View style={styles.homepageLayout}>
        <TouchableOpacity
          style={[
            styles.horizontalLayout,
            layout === 'horizontal' && styles.selectedLayout, // Apply selected styles
          ]}
          onPress={() => setLayout('horizontal')}
        >
          <Image
            source={require('../assets/images/home-screen/layout1.png')}
            style={styles.horizontalImg} // Use the same size as avatar
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.verticalLayout,
            layout === 'vertical' && styles.selectedLayout, // Apply selected styles
          ]}
          onPress={() => setLayout('vertical')}
        >
          <Image
            source={require('../assets/images/home-screen/layout2.png')}
            style={styles.verticalImg} // Use the same size as avatar
          />
        </TouchableOpacity>
      </View>

      {/* Right-aligned group (subcontainer) */}
      <View style={styles.subcontainer}>
        {/* Searching button */}
        <TouchableOpacity style={styles.button} onPress={() => router.push('search')}>
          <Icon name="search" size={30} color="purple" />
        </TouchableOpacity>

        {/* User Avatar button on press go to setting */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('profile')}>
          <Image
            source={require('../assets/images/User/defaultAvatar.jpeg')} // Simplified path
            style={styles.avatar}
          />

        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align subcontainer to the right
    width: '100%', // Ensures full width
    marginRight: 30,
    marginTop: 30,
    backgroundColor: 'transparent',
  },
  subcontainer: {
    width: 95, // Adjust width as needed
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',

  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40, // Tappable area width
    height: 40, // Tappable area height
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20, // Adjusted to match half of width/height for a circle
  },
  homepageLayout: {
    flexDirection: 'row',
    alignItems: 'center',  // This centers the items vertically inside the container
    justifyContent: 'flex-start',  // Align items to the left side of the container
    marginLeft: 30,  // Add margin for spacing from the left side
  },
  horizontalLayout: {
    marginRight: 5,  // Space between the items horizontally
    width: 45,
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#fff', // Default background color (when not selected)
    padding: 5,
    borderColor: '#fff', // Default border color (when not selected)
    borderWidth: 1, // Ensure the border is visible (when not selected)
    borderRadius: 5, // Rounded corners if needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalLayout: {
    marginLeft: 5,
    width: 45,
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#fff', // Default background color (when not selected)
    padding: 5,
    borderColor: '#fff', // Default border color (when not selected)
    borderWidth: 1, // Ensure the border is visible (when not selected)
    borderRadius: 5, // Rounded corners if needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedLayout: {
    backgroundColor: '#CCABEB', // Purple background color for selected
    borderColor: '#62239B', // Purple border for selected
    borderWidth: 1, // Ensure the border is visible for selected
    borderRadius: 5, // Rounded corners for selected
  },
  horizontalImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  verticalImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Navbar;
