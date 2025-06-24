import { View } from "react-native";
import AppButton from "@/components/ui/AppButton";

export default function buttonTest() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <AppButton text="Go to Test" linkTo="test" />
    </View>
  );
}
