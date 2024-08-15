import {Text as DefaultText, TextProps} from './Themed';
import {TextInput as DefaultTextInput, TextInputProps} from 'react-native';

function TextSemiBold(props: TextProps) {
  return (
    <DefaultText
      {...props}
      style={[
        {fontFamily: 'PoppinsSemiBold', color: 'var(--Black, #272727)'},
        props.style,
      ]}
    />
  );
}

function TextExtraBold(props: TextProps) {
  return (
    <DefaultText
      {...props}
      style={[
        {fontFamily: 'PoppinsExtraBold', color: 'var(--Black, #272727)'},
        props.style,
      ]}
    />
  );
}

function TextInput(props: TextInputProps) {
  return (
    <DefaultTextInput
      {...props}
      style={[
        {fontFamily: 'Poppins', color: 'var(--Black, #272727)'},
        props.style,
      ]}
    />
  );
}

function TextInputSemiBold(props: TextInputProps) {
  return (
    <DefaultTextInput
      {...props}
      style={[
        {fontFamily: 'PoppinsSemiBold', color: 'var(--Black, #272727)'},
        props.style,
      ]}
    />
  );
}

export function Text(props: TextProps) {
  return (
    <DefaultText
      {...props}
      style={[
        {fontFamily: 'Poppins', color: 'var(--Black, #272727)'},
        props.style,
      ]}
    />
  );
}

export {TextSemiBold, TextExtraBold, TextInput, TextInputSemiBold};
