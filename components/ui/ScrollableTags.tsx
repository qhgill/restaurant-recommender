import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

//const tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'];
//const label = 'Tags';

interface ScrollableTagsProps {
  tags: string[];
}

const ScrollableTags: React.FC<ScrollableTagsProps> = ({ tags }) => {
  return (
    <View style={{ backgroundColor: "#DEDEDE" }}>
      <Text style={styles.label}>Tags</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {tags.map((tag, idx) => (
          <View
            key={tag}
            style={[
              styles.bubble,
              idx !== tags.length - 1 && styles.bubbleSpacing,
            ]}
          >
            <Text style={styles.bubbleText}>{tag}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#b3b5b9",
    borderRadius: 16,
    padding: 12,
    margin: 16,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    marginLeft: 10,
    color: "#7C7C7C",
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginLeft: 10,
  },
  bubble: {
    backgroundColor: "#F3F4F6",
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
    marginRight: 15,
  },
  bubbleText: {
    color: "#6A6A6A",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ScrollableTags;
