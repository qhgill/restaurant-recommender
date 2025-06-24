import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import RestaurantCard, { RestaurantCardProps } from "./RestaurantCard";
import { FaSearch } from "react-icons/fa";

const testArr: RestaurantCardProps[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
    name: "The best restaurant",
    rating: 5,
    onPress: () => console.log("Card pressed"),
    isFavorited: false,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
    name: "the worst restaurant",
    rating: 0,
    onPress: () => console.log("Card pressed"),
    isFavorited: false,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
    name: "an ok restaurant",
    rating: 3,
    onPress: () => console.log("Card pressed"),
    isFavorited: false,
  },
];

const SearchBar = () => {
  const [search, setSearch] = useState("");
  function filterList(list: RestaurantCardProps[]) {
    return list.filter((listItem: RestaurantCardProps) =>
      listItem.name.toLowerCase().includes(search.toLowerCase()),
    );
  }
  return (
    <View style={styles.fullView}>
      <View style={styles.barView}>
        <FaSearch style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={"#777777"}
          onChangeText={(text) => setSearch(text)}
          style={styles.bar}
        />
      </View>

      {filterList(testArr).map((item, index) => (
        <RestaurantCard
          key={index}
          imageUrl={item.imageUrl}
          name={item.name}
          rating={item.rating}
          onPress={item.onPress}
          isFavorited={item.isFavorited}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    width: "100%",
    paddingLeft: 4,
  },
  barView: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000",
    paddingVertical: 3,
    paddingHorizontal: 9,
    margin: 10,
    borderRadius: 20,
  },
  searchIcon: {
    color: "#777777",
    width: 15,
  },
  fullView: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default SearchBar;
