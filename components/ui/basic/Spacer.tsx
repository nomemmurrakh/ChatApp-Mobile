import { View, ViewProps } from "react-native";

type SpacerProps = ViewProps & {
  width?: number;
  height?: number;
};

const Spacer = ({ width, height, ...rest }: SpacerProps) => {
  return <View style={{ width, height }} {...rest} />;
};

export default Spacer;