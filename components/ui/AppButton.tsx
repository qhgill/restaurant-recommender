import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { useRouter } from "expo-router";

type Props = {
  text: string;
  buttonColor?: string;
  textColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
  linkTo?: string;
};

const AppButton: React.FC<Props> = ({
  text,
  buttonColor = "#FF5959",
  textColor = "#FFFFFF",
  onPress,
  linkTo,
}) => {
  const router = useRouter();

  // onPress overrides navigation
  const handlePress = (event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event);
    } else if (linkTo) {
      console.log("Navigating to:", linkTo);
      router.push(linkTo);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor }]}
      onPress={handlePress}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 8,
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AppButton;
