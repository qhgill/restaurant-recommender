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
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const orderedfilters = activeTag
    ? [activeTag, ...filters.filter((tag) => tag !== activeTag)]
    : filters;

  return (
    <View style={styles.row}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {orderedfilters.map((tag, idx) => (
          <TouchableOpacity
            key={tag}
            onPress={() => setActiveTag(tag)}
            style={[
              styles.bubble,
              idx !== orderedfilters.length - 1 && styles.bubbleSpacing,
              tag === activeTag && styles.activeBubble,
            ]}
          >
            <Text
              style={[
                styles.bubbleText,
                tag === activeTag && styles.activeBubbleText,
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
    backgroundColor: "#b3b5b9",
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
    backgroundColor: "#fff",
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
