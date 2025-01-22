// TagSelectionModal.tsx
import React from 'react';
import {View, Modal, TouchableOpacity} from 'react-native';
import {Text} from '@/components/StyledText';
import {TagOption, TagOptions} from './types';
import StepIndicator from './StepIndicator';
import {MaterialIcons} from '@expo/vector-icons';
import {sharedStyles} from './sharedStyles';

interface TagSelectionModalProps {
  /** Controls visibility of the modal */
  visible: boolean;
  /** Currently selected tags */
  selectedTags: TagOptions;  
  /** Callback when a tag is selected/deselected */
  onSelectTag: (tag: TagOption) => void;  
  /** Callback when proceeding to next step */
  onNext: () => void;
  /** Callback when modal is closed */
  onClose: () => void;
}

/**
 * Modal component for selecting multiple tags for a journal entry
 * Displays a list of predefined tags with multi-select capability
 */
const TagSelectionModal: React.FC<TagSelectionModalProps> = ({
  visible,
  selectedTags,
  onSelectTag,
  onNext,
  onClose,
}) => {
  const tags: TagOption[] = ['Devotional', 'Prophetic Word', 'Personal', 'Dream'];

  const handleTagPress = (tag: TagOption) => {
    onSelectTag(tag);
  };

  const isTagSelected = (tag: TagOption) => {
    return selectedTags.includes(tag);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={sharedStyles.modalOverlay}>
        <View style={sharedStyles.modalContent}>
          <View style={sharedStyles.headerContainer}>
            <StepIndicator currentStep={1} />
            <View style={sharedStyles.dividerContainer}>
              <View style={sharedStyles.divider} />
            </View>
          </View>
          <Text style={sharedStyles.title}>Tags</Text>
          <View style={sharedStyles.optionContainer}>
            {tags.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={sharedStyles.optionItem}
                onPress={() => handleTagPress(tag)}>
                <View
                  style={[
                    sharedStyles.radio,
                    isTagSelected(tag) && sharedStyles.radioSelected,
                  ]}>
                  {isTagSelected(tag) && (
                    <MaterialIcons
                      name="check"
                      size={18}
                      color="#FFFFFF"
                    />
                  )}
                </View>
                <Text style={sharedStyles.optionText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[
              sharedStyles.actionButton,
              selectedTags.length > 0
                ? sharedStyles.actionButtonActive
                : sharedStyles.actionButtonInactive,
            ]}
            onPress={onNext}
            disabled={selectedTags.length === 0}>
            <Text style={sharedStyles.actionButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TagSelectionModal;