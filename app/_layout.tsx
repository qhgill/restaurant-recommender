import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import RestaurantCard from "@/components/ui/RestaurantCard";
import ScrollableTags from '@/components/ui/ScrollableTags';

const tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8', 'tag9', 'tag10', 'tag11']

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <RestaurantCard
        imageUrl="https://images.unsplash.com/photo-1528605248644-14dd04022da1"
        name="Spicy Dragon Noodles"
        rating={4.6}
        isFavorited={true}
        onPress={() => console.log('Card pressed')} />
      <ScrollableTags
      label='Tags'
      tags={tags} />

    </ThemeProvider>
  );
}
