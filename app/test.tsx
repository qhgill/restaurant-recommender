import { View, Text, StyleSheet } from "react-native";
import AppButton from "@/components/ui/AppButton";

export default function testScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Text style={styles.text}>test test test test test</Text>
      <AppButton
        text="Recommend"
        onPress={() => console.log("Recommend pressed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
