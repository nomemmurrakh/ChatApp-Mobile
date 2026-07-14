import GradientButton from "@/components/ui/basic/GradientButton";
import { useTheme } from "@/theme";
import { createContext, ReactNode, useContext, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

type ErrorContextType = {
  showError: (message: string) => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useErrorModal = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useErrorModal must be used within ErrorModalProvider");
  }
  return context;
};

export const ErrorModalProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { getGradient, typography } = useTheme();

  const showError = (message: string) => {
    setError(message);
    setIsVisible(true);
  };

  const hideError = () => {
    setIsVisible(false);
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={hideError}
        statusBarTranslucent
        navigationBarTranslucent
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={[typography.h3, styles.title]}>Error</Text>
            <Text style={[typography.body, styles.message]}>{error}</Text>
            <GradientButton
              title="Try Again"
              onPress={hideError}
              loading={false}
              colors={getGradient("gradientTab")}
              buttonStyle={{
                minHeight: 44,
              }}
              textStyle={{
                fontSize: 12,
              }}
            />
          </View>
        </View>
      </Modal>
    </ErrorContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    minWidth: "70%",
    maxWidth: "80%",
    backgroundColor: "white",
    margin: 20,
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    paddingVertical: 12,
  },
});
