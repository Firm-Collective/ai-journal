import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';
import { useJournalEntries } from '@/providers/JournalEntriesProvider';

export default function SearchButton() {
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  // Get journal entries from context
  const { journalEntries: initialJournalEntries } = useJournalEntries();
  const [filteredEntries, setFilteredEntries] = useState(initialJournalEntries);

  useEffect(() => {
    // Function to filter entries by title and content
    const retrieveEntriesWithText = (text: string) => {
      if (text.trim() === '') {
        setFilteredEntries(initialJournalEntries);
      } else {
        const filtered = initialJournalEntries.filter(
          (entry) => 
            entry.title.toLowerCase().includes(text.toLowerCase()) || 
            entry.content.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredEntries(filtered);
      }
    };

    retrieveEntriesWithText(searchText);
  }, [searchText, initialJournalEntries]);

  // Function to highlight search text in a given string
  const highlightText = (text: string, query: string) => {
    if (!query) return <Text>{text}</Text>;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <Text key={index} style={styles.highlightedText}>
          {part}
        </Text>
      ) : (
        <Text key={index}>{part}</Text>
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Search notes.."
            style={styles.input}
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
            }}
            autoFocus
          />
          <TouchableOpacity onPress={() => setSearchText('')} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      {searchText.length > 0 && (
        <FlatList
          data={filteredEntries}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.entryBox}>
              <Text style={styles.entryTitle}>{highlightText(item.title, searchText)}</Text>
              <Text style={styles.entryContent}>{highlightText(item.content, searchText)}</Text>
            </View>
          )}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'Tags' && styles.activeFilterButton]}
          onPress={() => setActiveFilter('Tags')}
        >
          <Text style={activeFilter === 'Tags' && styles.activeFilterText}>Tags ⌄</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'Date' && styles.activeFilterButton]}
          onPress={() => setActiveFilter('Date')}
        >
          <Text style={activeFilter === 'Date' && styles.activeFilterText}>Date ⌄</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'Media' && styles.activeFilterButton]}
          onPress={() => setActiveFilter('Media')}
        >
          <Text style={activeFilter === 'Media' && styles.activeFilterText}>Media ⌄</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 30,
        left: 23,
        right: -3,
        //backgroundColor: 'pink',
        zIndex: 50,
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        zIndex: 40,
    },
    searchButton: {
        padding: 8,
        marginRight: 8,
    },
    searchIcon: {
        width: 24,
        height: 24,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 1,
        //borderBottomWidth: 1,
        //borderBottomColor: '#e5e5e5',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white', //#f3f4f6
        borderRadius: 8,
        paddingLeft: 16,
        borderWidth: 1,
    },
    input: {
        flex: 1,
        height: 40,
    },
    cancelButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    cancelText: {
        color: '#007AFF',
        fontSize: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 8,
        left: -14,
    },
    filterButton: {
        backgroundColor: 'ghostwhite',
        paddingVertical: 5,
        paddingHorizontal: 13,
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 1,
    },
    activeFilterButton: {
        backgroundColor: '#e6f2ff',
        borderColor: '#004080',
    },
    activeFilterText: {
        color: '#004080',
    },
    entryBox: { 
        backgroundColor: 'white', 
        padding: 10, 
        marginVertical: 5, 
        borderRadius: 8, 
        borderWidth: 1, 
        borderColor: '#ddd' 
    },
    entryTitle: { 
        fontWeight: 'bold', 
        fontSize: 16 
    },
    entryContent: { 
        color: '#555' 
    },
    highlightedText: { 
        backgroundColor: '#ffeb3b', // yellow highliter
        fontWeight: 'bold' }, 
});


