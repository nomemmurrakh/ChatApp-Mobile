import { ErrorModalProvider } from "@/hooks/ErrorModalProvider";
import useAuthStore from "@/storage/authStorage";
import { ThemeProvider } from "@/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SystemBars } from "react-native-edge-to-edge";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isLoggedIn, _hasHydrated } = useAuthStore();

  useEffect(() => {
    if (_hasHydrated) {

      // adding some delay to avoid flicker.
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 500);
    }
  }, [_hasHydrated]);

  if (!_hasHydrated) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <ThemeProvider>
          <ErrorModalProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Protected guard={isLoggedIn}>
                <Stack.Screen name="(tabs)" />
              </Stack.Protected>

              <Stack.Protected guard={isLoggedIn}>
                <Stack.Screen name="private" />
              </Stack.Protected>

              <Stack.Protected guard={!isLoggedIn}>
                <Stack.Screen name="(auth)" />
              </Stack.Protected>
            </Stack>
            <SystemBars style="auto" />
          </ErrorModalProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </QueryClientProvider>
  );
}
