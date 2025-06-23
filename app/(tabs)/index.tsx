import { StyleSheet, ScrollView } from "react-native";
import Header from "@/components/ui/Header";
import SearchBar from "@/components/ui/SearchBar";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <SearchBar />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
});
