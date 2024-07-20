import {ListItem} from '@rneui/themed';
import {useState} from 'react';
import {StyleSheet, View, Text, ViewStyle} from 'react-native';

interface AccountInfoAccordionPropType {
  userProperty: string;
  userPropertyValue: string;
  externalStyles: ViewStyle;
}

export default function AccountInfoAccordion({
  userProperty,
  userPropertyValue,
  externalStyles = {},
}: AccountInfoAccordionPropType) {
  const [expanded, setExpanded] = useState(false);
  const handleChangeProperty = () => {
    // function to handle the property change logic
  };

  return (
    <ListItem.Accordion
      content={
        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            },
          ]}
        >
          <Text>{userProperty}</Text>
          <Text>{userPropertyValue}</Text>
        </View>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
      containerStyle={[styles.container, externalStyles]}
    >
      <ListItem onPress={handleChangeProperty} bottomDivider>
        <ListItem.Content>
          <ListItem.Subtitle>Change {userProperty}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </ListItem.Accordion>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#E4E4E4',
    borderBottomWidth: 1,
  },
});
