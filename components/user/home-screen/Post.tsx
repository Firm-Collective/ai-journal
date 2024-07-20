import React from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Card} from '@rneui/themed';
import {MonoText} from '@/components/StyledText';
import Tag from './Tag';

type PostProps = {
  date: string; //TODO: or date object?
  title: string;
  imagePath?: string; // TODO: double check what supabase store image under
  content: string;
  tags: string[];
};

export default function Post({title}: PostProps) {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.cardTop}>
        <MonoText style={styles.date}>Date</MonoText>
        <TouchableOpacity>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/more-icon.png')}
          />
        </TouchableOpacity>
      </View>
      <MonoText style={styles.title}>{title}</MonoText>
      <View style={styles.contentContainer}>
        <MonoText>Post content</MonoText>
      </View>
      <View style={styles.tagsContainer}>
        <Tag name="tag" />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginBottom: 15,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    //ios
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    //android
    elevation: 10,
  },
  cardTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  date: {
    color: 'rgba(151, 146, 155, 1)',
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 10,
  },
  contentContainer: {
    marginBottom: 20,
  },
  tagsContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
  },
});
