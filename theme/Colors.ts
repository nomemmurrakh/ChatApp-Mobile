/**
 * Color system for the Chat App
 * Based on the modern dark gradient design with glass morphism effects
 */

const tintColorLight = "#00d4ff";
const tintColorDark = "#00d4ff";

export const Colors = {
  light: {
    // Core UI Colors
    text: "#1a1d29",
    textSecondary: "#6c757d",
    background: "#ffffff",
    backgroundGradient: ["#f8fafc", "#f1f5f9"], // Very light blue-gray
    surface: "rgba(248, 250, 252, 0.8)", // Light glass effect
    surfaceSecondary: "rgba(241, 245, 249, 0.6)", // Subtle cards
    border: "rgba(148, 163, 184, 0.2)", // Light border

    // Brand Colors (slightly adjusted for light theme)
    primary: "#0ea5e9", // Slightly darker cyan for better contrast
    secondary: "#8b5cf6", // Adjusted purple for readability
    accent: "#14b8a6", // Darker teal for contrast

    // Interactive States
    success: "#10b981", // Darker green for readability
    warning: "#f59e0b", // Adjusted orange
    error: "#ef4444", // Standard red

    // Chat-Specific Colors
    messageSent: "#0ea5e9", // Your brand cyan (adjusted)
    messageReceived: "#f1f5f9", // Light gray bubbles
    messageText: "#ffffff", // White text in sent messages
    messageTextReceived: "#1e293b", // Dark text in received messages
    typing: "#14b8a6", // Teal typing indicator
    online: "#10b981", // Green online status

    // Glass Morphism (inverted for light theme)
    glass: "rgba(248, 250, 252, 0.8)", // Light glass with more opacity
    glassSecondary: "rgba(241, 245, 249, 0.6)", // Subtle glass
    glassBorder: "rgba(148, 163, 184, 0.2)", // Light borders
    glassHighlight: "rgba(226, 232, 240, 0.8)", // Pressed states

    // Gradient Combinations (adjusted for light theme)
    gradientPrimary: ["#0ea5e9", "#8b5cf6"], // Sky blue to purple
    gradientSecondary: ["#8b5cf6", "#c084fc"], // Purple to light purple
    gradientAccent: ["#14b8a6", "#06b6d4"], // Teal to cyan
    gradientWarning: ["#f59e0b", "#fbbf24"], // Orange gradient
    gradientSuccess: ["#10b981", "#059669"], // Green gradient
    gradientTab: ["#412f76", "#8578ad"],
    gradientMessage: ["#5B13CE", "#7E47F0"],

    // Navigation
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },

  dark: {
    // Core UI Colors
    text: "#ffffff",
    textSecondary: "#a8a8a8",
    background: "#1a1d29", // Dark navy base
    backgroundGradient: ["#1a1d29", "#2d1b69"], // Gradient start
    surface: "rgba(255, 255, 255, 0.1)", // Glass morphism cards
    surfaceSecondary: "rgba(255, 255, 255, 0.04)", // Subtle cards
    border: "rgba(255, 255, 255, 0.15)",

    // Brand Colors
    primary: "#00d4ff", // Cyan - main brand color
    secondary: "#9d4edd", // Purple - secondary brand color
    accent: "#4ecdc4", // Teal - highlights and active states

    // Interactive States
    success: "#00ff88", // Green - online status, success states
    warning: "#ffb700", // Orange - warnings, notifications
    error: "#ff4757", // Red - errors, destructive actions

    // Chat-Specific Colors
    messageSent: "#00d4ff", // Sent message bubbles (cyan)
    messageReceived: "rgba(255, 255, 255, 0.1)", // Received message bubbles
    messageText: "#ffffff", // Text in sent messages
    messageTextReceived: "#ffffff", // Text in received messages
    typing: "#4ecdc4", // Typing indicators
    online: "#00ff88", // Online status indicator

    // Glass Morphism Effects
    glass: "rgba(255, 255, 255, 0.08)", // Primary glass effect
    glassSecondary: "rgba(255, 255, 255, 0.04)", // Subtle glass effect
    glassBorder: "rgba(255, 255, 255, 0.15)", // Glass borders
    glassHighlight: "rgba(255, 255, 255, 0.12)", // Pressed/hover states

    // Gradient Combinations (for buttons, etc.)
    gradientPrimary: ["#2dd4bf", "#9d4edd"], // Cyan to purple
    gradientSecondary: ["#9d4edd", "#e0aaff"], // Purple to pink
    gradientAccent: ["#4ecdc4", "#20b2aa"], // Teal gradient
    gradientWarning: ["#ff8500", "#ffb700"], // Orange gradient
    gradientSuccess: ["#00ff88", "#00d4aa"], // Green gradient
    gradientTab: ["#412f76", "#6448b8"],
    gradientMessage: ["#5B13CE", "#7E47F0"],

    // Navigation
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

/**
 * Helper function to get gradient string for React Native
 * Usage: getGradient('gradientPrimary') returns ['#00d4ff', '#9d4edd']
 */
export const getGradient = (
  gradientName: keyof typeof Colors.dark,
  theme: "light" | "dark" = "dark"
) => {
  return Colors[theme][gradientName] as string[];
};

/**
 * Helper function to create glass morphism style object
 * Usage: getGlassStyle('primary') or getGlassStyle('secondary')
 */
export const getGlassStyle = (
  variant: "primary" | "secondary" = "primary",
  theme: "light" | "dark" = "dark"
) => {
  const colors = Colors[theme];
  return {
    backgroundColor:
      variant === "primary" ? colors.glass : colors.glassSecondary,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    backdropFilter: "blur(25px)", // Note: This works on web, for RN use react-native-blur
  };
};

export type ColorScheme = keyof typeof Colors;
