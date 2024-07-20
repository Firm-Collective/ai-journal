import {Text, TextProps} from './Themed';

function TextSemiBold(props: TextProps) {
  return (
    <Text
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
    <Text
      {...props}
      style={[
        {fontFamily: 'PoppinsExtraBold', color: 'var(--Black, #272727)'},
        props.style,
      ]}
    />
  );
}
export function MonoText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        {fontFamily: 'Poppins', color: 'var(--Black, #272727)'},
        props.style,
      ]}
    />
  );
}

export {TextSemiBold, TextExtraBold};
