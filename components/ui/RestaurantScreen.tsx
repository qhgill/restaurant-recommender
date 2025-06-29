import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppButton from "./AppButton";
import ScrollableTags from "./ScrollableTags";
interface RestaurantScreenProps {
  imageUrl: string;
  name: string;
  rating: number;
  price: string;
  distance: number;
  isFavorited?: boolean;
  info: string;
  tags: string[];
}

const RestaurantScreen: React.FC<RestaurantScreenProps> = ({
  imageUrl,
  name,
  rating,
  info,
  isFavorited,
  distance,
  price,
  tags,
}) => {
  const navigation = useNavigation();
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: "#FFFF",
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.exit}>
        <FontAwesome name="arrow-left" size={28} color="black" />
      </TouchableOpacity>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={{ backgroundColor: "#DEDEDE" }}>
        <Text style={styles.header}>{name}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <MaterialIcons
              name="star"
              size={39}
              color="#f1c40f"
              style={{ marginLeft: 20 }}
            />
            <Text style={styles.ratingText}>{rating}</Text>{" "}
          </View>
          <Text style={styles.distanceText}>{distance} miles away</Text>
          <Text style={styles.priceText}>{price}</Text>
        </View>
      </View>
      <Text style={styles.infoText}>{info}</Text>
      <ScrollableTags tags={tags}></ScrollableTags>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "#FFFF",
        }}
      >
        <View style={{ marginRight: 20 }}>
          <AppButton
            text="Location"
            buttonColor="#EF2A39"
            textColor="#FFFFFF"
            /* implement location function*/
          ></AppButton>
        </View>
        <View>
          <AppButton
            text="Add to Favorites"
            buttonColor="#3C2F2F"
            textColor="#FFFFFF"
            /* implement add favorite function*/
          ></AppButton>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  exit: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
  },
  image: {
    width: Dimensions.get("window").width,
    height: 335,
  },
  header: {
    fontSize: 25,
    fontWeight: 600,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 5,
    color: "#333",
  },
  ratingText: {
    fontWeight: 500,
    fontSize: 20,
    color: "#333",
  },
  distanceText: {
    fontSize: 20,
    color: "#070707",
    fontWeight: 500,
  },
  priceText: {
    marginRight: 20,
    fontSize: 20,
    fontWeight: 500,
    color: "#53725A",
  },
  infoText: {
    marginTop: 5,
    marginLeft: 5,
    width: Dimensions.get("window").width,
    height: 100,
    fontSize: 16,
    fontWeight: 400,
    color: "#6A6A6A",
    backgroundColor: "#FFFF",
  },
});

export default RestaurantScreen;
