import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ScrollableFiltersProps {
  filters: string[];
}

const ScrollableFilters: React.FC<ScrollableFiltersProps> = ({ filters }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((selectedTags) =>
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag],
    );
  };
  
  const orderedTags = [
    ...selectedTags,
    ...filters.filter((tag) => !selectedTags.includes(tag)),
  ];

  return (
    <View style={styles.row}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {orderedTags.map((tag, idx) => (
          <TouchableOpacity
            key={tag}
            onPress={() => toggleTag(tag)}
            style={[
              styles.bubble,
              idx !== orderedTags.length - 1 && styles.bubbleSpacing,
              selectedTags.includes(tag) && styles.activeBubble,
            ]}
          >
            <Text
              style={[
                styles.bubbleText,
                selectedTags.includes(tag) && styles.activeBubbleText,
              ]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fffff",
    borderRadius: 16,
    padding: 12,
    margin: 16,
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  bubble: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  bubbleSpacing: {
    marginRight: 20,
  },
  bubbleText: {
    color: "#22223b",
    fontSize: 16,
    fontWeight: "500",
  },
  activeBubble: {
    backgroundColor: "#6366f1",
  },
  activeBubbleText: {
    color: "#fff",
  },
});

export default ScrollableFilters;
