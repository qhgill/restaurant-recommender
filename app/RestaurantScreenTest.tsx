import RestaurantScreen from "@/components/ui/RestaurantScreen";

export default function RestaurantScreenTest() {
  return (
    <RestaurantScreen
      imageUrl="https://images.unsplash.com/photo-1528605248644-14dd04022da1"
      name="Spicy Dragon Noodles"
      rating={4.6}
      isFavorited={true}
      price="$$"
      distance={22}
      info="This the best Restaurant"
      tags={["Taiwanese", "Asian", "Noodles", "Sit-down"]}
    />
  );
}
