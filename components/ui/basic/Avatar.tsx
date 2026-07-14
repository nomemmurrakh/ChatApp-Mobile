import React from "react";
import {
  View,
  Image,
  Text,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";

// Avatar Component Props
interface AvatarProps {
  source?: { uri: string } | number;
  size?: number;
  fallback?: string;
  backgroundColor?: string;
  textColor?: string;
  textStyle?: TextStyle;
  style?: ViewStyle;
  borderWidth?: number;
  borderColor?: string;
}

// Avatar Component
export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 50,
  fallback,
  backgroundColor = "#E5E7EB",
  textColor = "#374151",
  textStyle,
  style,
  borderWidth = 2,
  borderColor = "#FFFFFF",
}) => {
  const containerStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor,
    justifyContent: "center",
    alignItems: "center",
    borderWidth,
    borderColor,
    overflow: "hidden",
  };

  const imageStyle: ImageStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  const defaultTextStyle: TextStyle = {
    fontSize: size * 0.4,
    fontWeight: "600",
    color: textColor,
  };

  return (
    <View style={[containerStyle, style]}>
      {source ? (
        <Image
          source={source}
          style={imageStyle}
        />
      ) : (
        <Text style={[defaultTextStyle, textStyle]}>{fallback || ""}</Text>
      )}
    </View>
  );
};

// AvatarGroup Component Props
export interface AvatarData {
  id: string;
  source?: { uri: string } | number;
  fallback?: string;
}

interface AvatarGroupProps {
  avatars: AvatarData[];
  size?: number;
  showRemainingCount?: boolean;
  remainingCount?: number;
  overlapOffset?: number;
  backgroundColor?: string;
  textColor?: string;
  borderWidth?: number;
  borderColor?: string;
  remainingBackgroundColor?: string;
  remainingTextColor?: string;
  remainingTextStyle?: TextStyle;
  containerStyle?: ViewStyle;
  avatarStyle?: ViewStyle;
}

// AvatarGroup Component
export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  size = 50,
  showRemainingCount = false,
  remainingCount = 0,
  overlapOffset = 15,
  backgroundColor = "#E5E7EB",
  textColor = "#374151",
  borderWidth = 2,
  borderColor = "#FFFFFF",
  remainingBackgroundColor = "#6B7280",
  remainingTextColor = "#FFFFFF",
  remainingTextStyle,
  containerStyle,
  avatarStyle,
}) => {
  const totalWidth =
    avatars.length > 0
      ? size + (avatars.length - 1) * (size - overlapOffset)
      : 0;

  const totalWidthWithRemaining =
    showRemainingCount && remainingCount > 0
      ? totalWidth + (size - overlapOffset)
      : totalWidth;

  const groupContainerStyle: ViewStyle = {
    flexDirection: "row",
    width: totalWidthWithRemaining,
    height: size,
    ...containerStyle,
  };

  const getAvatarPosition = (index: number): ViewStyle => ({
    position: index === 0 ? "relative" : "absolute",
    left: index === 0 ? 0 : index * (size - overlapOffset),
    zIndex: avatars.length - index,
  });

  const remainingCircleStyle: ViewStyle = {
    position: "absolute",
    left: avatars.length * (size - overlapOffset),
    zIndex: 0,
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: remainingBackgroundColor,
    borderWidth,
    borderColor,
    justifyContent: "center",
    alignItems: "center",
  };

  const remainingTextStyleDefault: TextStyle = {
    fontSize: size * 0.28,
    fontWeight: "600",
    color: remainingTextColor,
  };

  return (
    <View style={groupContainerStyle}>
      {avatars.map((avatar, index) => (
        <View key={avatar.id} style={getAvatarPosition(index)}>
          <Avatar
            source={avatar.source}
            fallback={avatar.fallback}
            size={size}
            backgroundColor={backgroundColor}
            textColor={textColor}
            borderWidth={borderWidth}
            borderColor={borderColor}
            style={avatarStyle}
          />
        </View>
      ))}

      {showRemainingCount && remainingCount > 0 && (
        <View style={remainingCircleStyle}>
          <Text style={[remainingTextStyleDefault, remainingTextStyle]}>
            +{remainingCount}
          </Text>
        </View>
      )}
    </View>
  );
};
