import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { Checkbox } from "react-native-paper";
import AppButton from "@/components/ui/AppButton";

export default function RecommendScreen() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Recommendation Questions:</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Cuisines</ThemedText>
        <Checkbox.Item
          label="I like Italian cuisine"
          status={checked1 ? "checked" : "unchecked"}
          style={{ paddingVertical: 0, marginVertical: 0 }}
          onPress={() => setChecked1(!checked1)}
        />
        <Checkbox.Item
          label="I prefer Asian cuisines"
          status={checked2 ? "checked" : "unchecked"}
          style={{ paddingVertical: 0, marginVertical: 0 }}
          onPress={() => setChecked2(!checked2)}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Foods</ThemedText>
        <Checkbox.Item
          label="I like spicy food"
          status={checked3 ? "checked" : "unchecked"}
          style={{ paddingVertical: 0, marginVertical: 0 }}
          onPress={() => setChecked3(!checked3)}
        />
        <Checkbox.Item
          label="I prefer vegetarian options"
          status={checked4 ? "checked" : "unchecked"}
          style={{ paddingVertical: 0, marginVertical: 0 }}
          onPress={() => setChecked4(!checked4)}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Pricing/Allergies</ThemedText>
        <Checkbox.Item
          label="I am willing to spend more for quality"
          status={checked5 ? "checked" : "unchecked"}
          style={{ paddingVertical: 0, marginVertical: 0 }}
          onPress={() => setChecked5(!checked5)}
        />
        <Checkbox.Item
          label="I am allergic to nuts"
          status={checked6 ? "checked" : "unchecked"}
          style={{ paddingVertical: 0, marginVertical: 0 }}
          onPress={() => setChecked6(!checked6)}
        />
      </ThemedView>
      <AppButton text="Gemerate Recommendation" linkTo="test" />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
