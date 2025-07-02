import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AppButton from "@/components/ui/AppButton";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "rgb(255, 255, 255)"]}
        style={styles.gradient}
      />
      <Image
        source={require("@/assets/images/burger.png")}
        style={styles.burgerBackground}
      />
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={() => console.log("Back pressed")}>
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Settings pressed")}>
          <MaterialIcons name="settings" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.topSection}>
        <View style={styles.photoWrapper}>
          <Image
            source={require("@/assets/images/splash-icon.png")}
            style={styles.profilePhoto}
          ></Image>
        </View>
      </View>

      <View style={styles.midSection}>
        {renderLabelInput("Name", { marginTop: 60 })}
        {renderLabelInput("Email")}
        {renderLabelInput("Delivery Address")}
        {renderLabelInput("Password")}

        <View style={styles.bottomSection}>
          <View style={[styles.statSection, { marginTop: -20 }]}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => console.log("Recommendation history pressed")}
            >
              <Text style={styles.iconButtonText}>Recommendation History</Text>
              <MaterialIcons name="chevron-right" size={24} color="#808080" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => console.log("Preferences pressed")}
            >
              <Text style={styles.iconButtonText}>Preferences</Text>
              <MaterialIcons name="chevron-right" size={24} color="#808080" />
            </TouchableOpacity>
          </View>

          <View style={[styles.actionSection, {}]}>
            <View style={{ flex: 1 }}>
              <AppButton
                text="Edit Profile"
                buttonColor="#3C2F2F"
                textColor="white"
                onPress={() => console.log("Cancel pressed")}
              ></AppButton>
            </View>
            <View style={{ flex: 1 }}>
              <AppButton
                text="Log Out"
                buttonColor="white"
                textColor="#EF2A39"
                borderColor="#EF2A39"
                borderWidth={3}
                onPress={() => console.log("Cancel pressed")}
              ></AppButton>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function renderLabelInput(label: string, style = {}) {
  return (
    <View style={[styles.inputWrapper, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} editable={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#EF2A39",
    position: "relative",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 2,
  },
  topSection: {
    alignItems: "center",
    marginTop: 10,
    zIndex: 998,
  },
  photoWrapper: {
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "#EF2A39",
    backgroundColor: "white",

    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    zIndex: 999,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  midSection: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    marginTop: -40,
    borderRadius: 20,
    alignItems: "center",
    zIndex: 3,
  },
  inputWrapper: {
    width: "90%",
    marginBottom: 30,
    position: "relative",
  },
  label: {
    position: "absolute",
    top: -10,
    left: 12,
    backgroundColor: "white",
    paddingHorizontal: 4,
    fontSize: 12,
    fontWeight: "bold",
    color: "#808080",
    zIndex: 1,
  },
  input: {
    height: 50,
    backgroundColor: "white",
    borderColor: "#E1E1E1",
    borderWidth: 3,
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#000",
  },
  bottomSection: {
    width: "100%",
    paddingHorizontal: 24,
  },
  statSection: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  actionSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 64,
  },
  iconButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    width: "100%",
    marginBottom: 12,
  },
  iconButtonText: {
    fontSize: 16,
    color: "#808080",
    fontWeight: "bold",
  },
  burgerBackground: {
    position: "absolute",
    top: "-5%",
    left: "50%",
    width: "100%",
    height: "50%",
    resizeMode: "contain",
    zIndex: 2,
    opacity: 0.5,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
});
