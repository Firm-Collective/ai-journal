import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TextInput, View, Button} from 'react-native';

interface EditModalProps {
  visible: boolean;
  initialValue: string;
  onClose: () => void;
  onSave: (newValue: string) => void;
  title: string;
}

const EditModal: React.FC<EditModalProps> = ({
  visible,
  initialValue,
  onClose,
  onSave,
  title,
}) => {
  const [newValue, setNewValue] = useState(initialValue);

  const handleSave = () => {
    onSave(newValue);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{`Edit ${title}`}</Text>
        <TextInput
          style={styles.input}
          value={newValue}
          onChangeText={setNewValue}
          placeholder={`Enter new ${title.toLowerCase()}`}
          multiline
        />
        <View style={styles.modalButtons}>
          <Button title="Cancel" onPress={onClose} />
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
    width: '100%',
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default EditModal;
