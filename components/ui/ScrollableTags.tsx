import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';


//const tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'];
//const label = 'Tags';

interface ScrollableTagsProps {
    label: string;
    tags: string[];
}

const ScrollableTags: React.FC<ScrollableTagsProps> = ({ label, tags }) => {
    return (
        <View>
            <Text style={styles.label}>{label} </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {tags.map(tag => (
                    <View key={tag} style={styles.bubble}>
                        <Text style={styles.bubbleText}>Tag</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
        color: '#444',
    },
    scrollContainer: {
        flexDirection: 'row',
        gap: 16,
        paddingVertical: 16,
        backgroundColor: '#f3f4f6',
        borderRadius: 16,
        paddingHorizontal: 8,
    },
    bubble: {
        backgroundColor: '#f1f5f9',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 999,
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bubbleText: {
        color: '#22223b',
        fontSize: 16,
        fontWeight: '500',
    },
}
);

export default ScrollableTags;