import { Stack } from "expo-router";

export default function AuthRootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="register-one" />
      <Stack.Screen name="register-two" />
      <Stack.Screen name="register-three" />
      <Stack.Screen name="register-four" />
    </Stack>
  );
}
