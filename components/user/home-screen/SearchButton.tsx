import React, {useState} from 'react'; //Display changes based on state updates
import {View, TextInput, TouchableOpacity, Text, Image, StyleSheet, Pressable, ViewStyle, TextStyle} from 'react-native';
import {BlurView} from '@react-native-community/blur';
//import { Pressable } from 'react-native';
//TouchableOpacity: touchable area responding to user interaction
//View: basic building block for UI elements
//TextInput: Allowes users to enter text
//[<getter>, <setter>] = useState(<initialValue>)

export default function SearchButton(){
    const [isSearching, setIsSearching] = useState(false);
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    if (!isSearching) {
        return (
            <TouchableOpacity
                onPress = {() => setIsSearching(true)}
                style={styles.searchButton}
            >
                <Image
                    source = {require('@/assets/images/home-screen/Search.png')}
                    style = {styles.searchIcon}
                    resizeMode = "contain"
                />
            </TouchableOpacity>
        );
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.searchBarContainer}>
                <View style = {styles.inputWrapper}>
                    <TextInput
                        placeholder="Search notes.."
                        style = {styles.input}
                        autoFocus
                    />
                    <TouchableOpacity 
                        onPress={() => setIsSearching(false)}
                        style = {styles.cancelButton}
                    >
                        <Text style = {styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style = {styles.buttonContainer}>
                <TouchableOpacity 
                    style = {[
                    styles.filterButton,
                    activeFilter === 'Tags' && styles.activeFilterButton
                    ]}
                    onPress={() => setActiveFilter('Tags')}
                >
                    <Text style={activeFilter === 'Tags' && styles.activeFilterText}>Tags ⌄</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {[
                    styles.filterButton,
                    activeFilter === 'Date' && styles.activeFilterButton
                    ]}
                    onPress={() => setActiveFilter('Date')}
                >
                    <Text style={activeFilter === 'Date' && styles.activeFilterText}>Date ⌄</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {[
                    styles.filterButton,
                    activeFilter === 'Media' && styles.activeFilterButton
                    ]}
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
    }
});

