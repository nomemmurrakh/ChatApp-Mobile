import Icons from "@/assets/svg";
import { useTheme } from "@/theme";
import * as ImagePicker from "expo-image-picker";
import {
  ImageBackground,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import CircularRipple from "./CircularRipple";

type Props = {
  onSelected: (image: string) => void;
  onRemove: () => void;
  image?: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export default function UploadImage({
  onSelected,
  onRemove,
  image,
  style,
  containerStyle,
  disabled,
}: Props) {
  const { colors, typography } = useTheme();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onSelected(result.assets[0].uri);
    }
  };

  if (image && image !== "") {
    return (
      <View style={containerStyle}>
        <ImageBackground
          style={styles.imageBackgroundStyle}
          borderRadius={100}
          source={{ uri: image }}
        >
          <View style={[StyleSheet.absoluteFill, styles.overlayStyle]} />
          <CircularRipple
            android_ripple={{ color: "white" }}
            size={36}
            style={{ backgroundColor: colors.error, alignSelf: "flex-end" }}
            onPress={onRemove}
            disabled={disabled}
          >
            <Icons.Delete color={"white"} />
          </CircularRipple>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={[{ overflow: "hidden" }, containerStyle]}>
      <CircularRipple
        size={132}
        style={[
          styles.containerStyle,
          { backgroundColor: colors.glass, borderColor: colors.secondary },
          style,
        ]}
        onPress={pickImage}
        disabled={disabled}
        android_ripple={{ color: "white" }}
      >
        <Icons.Camera color={"white"} width={34} height={34} />
        <Text
          style={[
            typography.caption,
            {
              color: colors.text,
              marginTop: 2,
              fontSize: 11,
            },
          ]}
        >
          Upload Image
        </Text>
      </CircularRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 2,
    borderRadius: 100,
    borderStyle: "dashed",

    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageBackgroundStyle: {
    width: 132,
    height: 132,
  },
  overlayStyle: {
    backgroundColor: "rgba(0,0,0,0.23)",
    borderRadius: 100,
  },
});
