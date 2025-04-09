import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { removeFavoriteDestination } from "@/storage/storage";

const SearchFavorites = ({ favoriteDestinations }) => {
  const [favoritedItems, setFavoritedItems] = useState(favoriteDestinations);

  const handleFavoritePress = (item) => {
    if (favoritedItems.includes(item)) {
      setFavoritedItems(favoritedItems.filter((favorite) => favorite !== item));
      removeFavoriteDestination(item);
    } else {
      setFavoritedItems([...favoritedItems, item]);
    }
  };

  return (
    <View>
      {favoriteDestinations && favoriteDestinations.length > 0 ? (
        favoriteDestinations.map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`flex-row justify-between items-center border-b border-gray-600 pb-4 ${
              index === favoriteDestinations.length - 1 ? "mb-6" : "mb-4"
            }`}
          >
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="map-marker"
                size={24}
                color="#ff6200"
                className="mr-3"
              />
              <View>
                <Text className="text-white text-base">{item}</Text>
                <Text className="text-gray-400 text-sm">Favorite</Text>
              </View>
            </View>

            <TouchableOpacity
              style={{ marginLeft: "auto" }}
              onPress={() => handleFavoritePress(item)}
            >
              <MaterialCommunityIcons
                name="star"
                size={24}
                color={favoritedItems.includes(item) ? "#ffdd21" : "gray"}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      ) : (
        <Text className="text-white">No favorite destinations</Text>
      )}
    </View>
  );
};

export default SearchFavorites;
