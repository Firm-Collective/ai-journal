import {Text, TextProps} from './Themed';

export function MonoText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        {fontFamily: 'Poppins', color: 'var(--Black, #272727)'},
        props.style
      ]}
    />
  );
}
