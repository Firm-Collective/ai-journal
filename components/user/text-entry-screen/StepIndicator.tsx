// StepIndicator.tsx
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '@/components/StyledText';
import {MaterialIcons} from '@expo/vector-icons';

interface StepIndicatorProps {
  currentStep: 1 | 2;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({currentStep}) => {
  return (
    <View style={styles.container}>
      <View style={styles.stepGroup}>
        <MaterialIcons
          name="local-offer"
          size={20}
          color={currentStep === 1 ? '#800080' : '#B39DDB'}
          style={styles.icon}
        />
        <View style={styles.textGroup}>
          <Text
            style={[
              styles.stepText,
              currentStep === 1 ? styles.activeText : styles.inactiveText,
            ]}>
            Step 1
          </Text>
          <Text
            style={[
              styles.stepLabel,
              currentStep === 1 ? styles.activeText : styles.inactiveText,
            ]}>
            Tags
          </Text>
        </View>
      </View>

      <View style={styles.dotContainer}>
        {[...Array(5)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {backgroundColor: '#B39DDB'},
            ]}
          />
        ))}
      </View>

      <View style={styles.stepGroup}>
        <MaterialIcons
          name="lock-outline"
          size={20}
          color={currentStep === 2 ? '#800080' : '#B39DDB'}
          style={styles.icon}
        />
        <View style={styles.textGroup}>
          <Text
            style={[
              styles.stepText,
              currentStep === 2 ? styles.activeText : styles.inactiveText,
            ]}>
            Step 2
          </Text>
          <Text
            style={[
              styles.stepLabel,
              currentStep === 2 ? styles.activeText : styles.inactiveText,
            ]}>
            Privacy
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  stepGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textGroup: {
    marginLeft: 8,
  },
  icon: {
    alignSelf: 'center',
  },
  stepText: {
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 2,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeText: {
    color: '#800080',
  },
  inactiveText: {
    color: '#B39DDB',
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 6,
  },
});

export default StepIndicator;