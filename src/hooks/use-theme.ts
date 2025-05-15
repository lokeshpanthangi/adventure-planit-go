
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

export const useThemeStyles = () => {
  const { theme } = useTheme();
  const [colors, setColors] = useState({
    primary: theme === "dark" ? "#2196F3" : "#1E88E5",
    secondary: theme === "dark" ? "#00ACC1" : "#26C6DA",
    accent: theme === "dark" ? "#FFC107" : "#FFB300",
    success: theme === "dark" ? "#66BB6A" : "#43A047",
    error: theme === "dark" ? "#F44336" : "#E53935",
    background: theme === "dark" ? "#121212" : "#F5F7FA",
    surface: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
    text: theme === "dark" ? "#E0E0E0" : "#333333",
  });

  useEffect(() => {
    setColors({
      primary: theme === "dark" ? "#2196F3" : "#1E88E5",
      secondary: theme === "dark" ? "#00ACC1" : "#26C6DA",
      accent: theme === "dark" ? "#FFC107" : "#FFB300",
      success: theme === "dark" ? "#66BB6A" : "#43A047",
      error: theme === "dark" ? "#F44336" : "#E53935",
      background: theme === "dark" ? "#121212" : "#F5F7FA",
      surface: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
      text: theme === "dark" ? "#E0E0E0" : "#333333",
    });
  }, [theme]);

  return { colors };
};
