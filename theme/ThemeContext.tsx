import { createContext, ReactNode, useContext, useState } from "react";
import { Colors } from "./Colors";
import { Typography } from "./Typography";

type ThemeOptions = "light" | "dark";
type ThemeContextType = {
  theme: ThemeOptions;
  colors: typeof Colors.dark;
  typography: typeof Typography;
  setTheme: (theme: ThemeOptions) => void;
  isDark: boolean;
  getGradient: (gradientName: keyof typeof Colors.dark) => string[];
  getGlassStyle: (variant?: "primary" | "secondary") => object;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeOptions>("dark");

  const colors = Colors[theme];
  const isDark = theme === "dark";

  const getGradient = (gradientName: keyof typeof Colors.dark): string[] => {
    return colors[gradientName] as string[];
  };

  const getGlassStyle = (variant: "primary" | "secondary" = "primary") => {
    return {
      backgroundColor:
        variant === "primary" ? colors.glass : colors.glassSecondary,
      borderWidth: 1,
      borderColor: colors.glassBorder,
    };
  };

  const value: ThemeContextType = {
    theme,
    colors,
    typography: Typography,
    setTheme,
    isDark,
    getGradient,
    getGlassStyle,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
