import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

interface RestaurantCardProps {
  imageUrl: string;
  name: string;
  rating: number;
  onPress?: () => void;
  isFavorited?: boolean;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  imageUrl,
  name,
  rating,
  onPress,
  isFavorited = false,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.footer}>
          <View style={styles.rating}>
            <MaterialIcons name="star" size={16} color="#f1c40f" />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
          <FontAwesome
            name={isFavorited ? 'heart' : 'heart-o'}
            size={20}
            color={isFavorited ? 'red' : '#555'}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: 'white',
    elevation: 2,
    width: '50%',
  },
  image: {
    width: '100%',
    height: 120,
  },
  content: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
});

export default RestaurantCard;