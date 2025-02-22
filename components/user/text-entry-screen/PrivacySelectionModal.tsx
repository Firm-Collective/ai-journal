// PrivacySelectionModal.tsx
import React from 'react';
import {View, Modal, TouchableOpacity} from 'react-native';
import {Text} from '@/components/StyledText';
import {PrivacyOption} from './types';
import StepIndicator from './StepIndicator';
import {MaterialIcons} from '@expo/vector-icons';
import {sharedStyles} from './sharedStyles';

interface PrivacySelectionModalProps {
  visible: boolean;
  selectedPrivacy: PrivacyOption | null;
  onSelectPrivacy: (privacy: PrivacyOption) => void;
  onSubmit: () => void;
  onClose: () => void;
}

interface PrivacyOptionType {
  value: PrivacyOption;
  iconName: keyof typeof MaterialIcons.glyphMap;
}

const privacyOptions: PrivacyOptionType[] = [
  {
    value: 'Private',
    iconName: 'lock-outline',
  },
  {
    value: 'Public Select',
    iconName: 'group',
  },
  {
    value: 'Public',
    iconName: 'volume-up',
  },
];

const PrivacySelectionModal: React.FC<PrivacySelectionModalProps> = ({
  visible,
  selectedPrivacy,
  onSelectPrivacy,
  onSubmit,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={sharedStyles.modalOverlay}>
        <View style={sharedStyles.modalContent}>
          <View style={sharedStyles.headerContainer}>
            <StepIndicator currentStep={2} />
            <View style={sharedStyles.dividerContainer}>
              <View style={sharedStyles.divider} />
            </View>
          </View>
          <Text style={sharedStyles.title}>Privacy</Text>
          <View style={sharedStyles.optionContainer}>
            {privacyOptions.map(({value, iconName}) => (
              <TouchableOpacity
                key={value}
                style={sharedStyles.optionItem}
                onPress={() => onSelectPrivacy(value)}>
                <View
                  style={[
                    sharedStyles.radio,
                    selectedPrivacy === value && sharedStyles.radioSelected,
                  ]}>
                  {selectedPrivacy === value && (
                    <MaterialIcons
                      name="check"
                      size={18}
                      color="#FFFFFF"
                    />
                  )}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons 
                    name={iconName}
                    size={16}
                    color="#333"
                    style={sharedStyles.optionIcon}
                  />
                  <Text style={sharedStyles.optionText}>{value}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[
              sharedStyles.actionButton,
              selectedPrivacy
                ? sharedStyles.actionButtonActive
                : sharedStyles.actionButtonInactive,
            ]}
            onPress={onSubmit}
            disabled={!selectedPrivacy}>
            <Text style={sharedStyles.actionButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PrivacySelectionModal;