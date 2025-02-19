// TagSelector.tsx
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text} from '@/components/StyledText';

export type TagOption = 'Personal' | 'Prophetic Word' | 'Devotional' | 'Dream';

interface TagSelectorProps {
  selectedTag: TagOption | null;
  onSelectTag: (tag: TagOption) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({selectedTag, onSelectTag}) => {
  const tags: TagOption[] = ['Personal', 'Prophetic Word', 'Devotional', 'Dream'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tags</Text>
      <View style={styles.tagContainer}>
        {tags.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tagButton,
              selectedTag === tag && styles.selectedTagButton,
            ]}
            onPress={() => onSelectTag(tag)}>
            <Text
              style={[
                styles.tagText,
                selectedTag === tag && styles.selectedTagText,
              ]}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedTagButton: {
    backgroundColor: '#800080', // Purple color
  },
  tagText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTagText: {
    color: '#fff',
  },
});

export default TagSelector;