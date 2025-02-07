import React, { useMemo } from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
} from 'react-native';
import Colors from '../modules/Color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GRAY,
    overflow: 'hidden',
  },
});

interface ProfileProps {
  size?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  imageUrl?: string;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
}

const Profile = ({
  size = 48,
  style: containerStyleProps,
  onPress,
  imageUrl,
  text,
  textStyle,
}: ProfileProps) => {
  const containerStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return [
      styles.container,
      { width: size, height: size, borderRadius: size / 2 },
      containerStyleProps,
    ];
  }, [containerStyleProps, size]);

  const imageStyle = useMemo<StyleProp<ImageStyle>>(
    () => ({ width: size, height: size }),
    [size],
  );

  return (
    <TouchableOpacity disabled={onPress == null} onPress={onPress}>
      <View style={containerStyle}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={imageStyle} />
        ) : text ? (
          <Text style={textStyle}>{text}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default Profile;
