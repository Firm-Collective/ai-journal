import {StyleSheet, Text, View} from 'react-native';

interface attributePropType {
  attributes: string[];
}

function ContainedUserAttribute({attributes}: attributePropType) {
  return (
    <View style={[styles.itemCont]}>
      {attributes.map((userAttribute, key) => {
        return (
          <Text style={styles.textCont} key={key}>
            {userAttribute}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  itemCont: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    gap: 10,
  },
  textCont: {
    borderColor: '#171A1F',
    borderWidth: 0.8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    padding: 5,
  },
});

export {ContainedUserAttribute};
