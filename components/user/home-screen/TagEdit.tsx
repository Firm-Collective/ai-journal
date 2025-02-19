import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@/components/StyledText';

// Predefined tag options for the journal entries
const TAGS = [
  { id: 1, name: 'Personal' },
  { id: 2, name: 'Prophetic Word' },
  { id: 3, name: 'Devotional' },
  { id: 4, name: 'Dream' }
];

// Props interface for the TagEdit component
interface TagEditProps {
  /** Callback function when tags are saved - receives array of selected tag IDs */
  onSave: (selectedTags: number[]) => void;
  initialTags?: number[];
  onClose: () => void;
}

/**
 * TagEdit Component
 * 
 * A component that displays a list of selectable tags and allows multiple selection.
 * Used within the journal entry popup menu for editing tags.
 */
export function TagEdit({ onSave, initialTags = [], onClose }: TagEditProps) {
  const [selectedTags, setSelectedTags] = useState<number[]>(initialTags);

  const handleTagPress = (tagId: number) => {
    setSelectedTags(prev => {
      if (prev.includes(tagId)) {
        return prev.filter(id => id !== tagId);
      }
      return [...prev, tagId];
    });
  };

  /**
   * Handles the save action and closes the tag edit view
   */
  const handleSave = () => {
    onSave(selectedTags);
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.tagsContainer}>
        {TAGS.map(tag => (
          <TouchableOpacity
            key={tag.id}
            onPress={() => handleTagPress(tag.id)}
            style={[
              styles.tagButton,
              selectedTags.includes(tag.id) 
                ? styles.selectedTag 
                : styles.unselectedTag
            ]}
          >
            <Text style={styles.tagText}>{tag.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  tagButton: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedTag: {
    backgroundColor: 'rgba(234, 216, 250, 1)',
    borderWidth: 2,
    borderColor: 'rgba(81, 9, 147, 1)',
  },
  unselectedTag: {
    backgroundColor: '#E5E5E5',
  },
  tagText: {
    color: 'rgba(81, 9, 147, 1)',
    fontSize: 14,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 16,
    alignItems: 'flex-end',
  },
  saveButton: {
    backgroundColor: 'rgba(81, 9, 147, 1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});