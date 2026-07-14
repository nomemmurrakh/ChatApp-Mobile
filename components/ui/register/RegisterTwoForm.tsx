import GradientButton from "@/components/ui/basic/GradientButton";
import { getGradient, useTheme } from "@/theme";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import Card from "../basic/Card";
import Spacer from "../basic/Spacer";
import SingleFieldOTPBox from "./SingleFieldOTPBox";

type RegisterTwoFormProps = {
  loading: boolean;
  onSubmit: (otp: string) => void;
};

export default function RegisterTwoForm({
  loading,
  onSubmit,
}: RegisterTwoFormProps) {
  const { typography, colors } = useTheme();
  const [value, setValue] = useState("");

  return (
    <Card cardStyle={styles.card} containerStyle={{ width: "100%" }} disabled>
      <Text style={[typography.bodySmall, { color: "#ffffffFF" }]}>
        Please enter the OTP sent to this number.
      </Text>
      <Spacer height={16} />
      <Text
        style={[
          typography.caption,
          {
            marginBottom: 8,
            color: colors.textSecondary,
          },
        ]}
      >
        OTP (4 Digits)
      </Text>
      <SingleFieldOTPBox
        readonly={loading}
        onChange={(it) => setValue(it)}
        value={value}
        onComplete={onSubmit}
      />
      <Spacer height={24} />
      <GradientButton
        disabled={value.length < 4}
        title="Verify"
        onPress={() => onSubmit(value)}
        loading={loading}
        colors={getGradient("gradientSecondary")}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
  },
});
