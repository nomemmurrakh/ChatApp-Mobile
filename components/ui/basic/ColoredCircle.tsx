import { ColorValue, DimensionValue, StyleSheet, View, ViewProps } from "react-native";

type ColoredCircleProps = Omit<ViewProps, "width" | "height"> & {
  size?: DimensionValue | undefined;
  backgroundColor?: ColorValue | undefined;
};

export default function ColoredCircle({
  size = 32,
  backgroundColor,
  style,
  children,
}: ColoredCircleProps) {
  return (
    <View
      style={[
        styles.circle,
        {
          backgroundColor: backgroundColor,
          width: size,
          height: size,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
});
