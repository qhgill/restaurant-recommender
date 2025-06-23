import {
  Lobster_400Regular,
  useFonts as useLobsterFont,
} from "@expo-google-fonts/lobster";
import {
  Poppins_400Regular,
  useFonts as usePoppinsFonts,
} from "@expo-google-fonts/poppins";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = () => {
  const [poppinsLoaded] = usePoppinsFonts({
    Poppins_400Regular,
  });
  const [lobsterLoaded] = useLobsterFont({
    Lobster_400Regular,
  });

  if (!(poppinsLoaded && lobsterLoaded)) {
    return null;
  }

  return (
    <View>
      <Text style={styles.appname}>Good Soup</Text>
      <Text style={styles.subtitle}>Find what you are craving!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  appname: {
    fontFamily: "Lobster_400Regular",
    fontSize: 40,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
  },
});

export default Header;
