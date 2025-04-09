import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  addFavoriteDestination,
  removeFavoriteDestination,
} from "@/storage/storage";
import { useRouter } from "expo-router";

const RecentSearches = ({ recentDestinations }) => {
  const router = useRouter();

  const [favoritedItems, setFavoritedItems] = useState([]);

  const handleFavoritePress = (item) => {
    if (favoritedItems.includes(item)) {
      // If the item is already favorited, remove it
      setFavoritedItems((prev) => prev.filter((favorite) => favorite !== item));
      removeFavoriteDestination(item); // Remove from storage
    } else {
      // If the item is not favorited, add it
      setFavoritedItems((prev) => [...prev, item]);
      addFavoriteDestination(item); // Add to storage
    }
  };

  return (
    <View>
      {recentDestinations && recentDestinations.length > 0 ? (
        recentDestinations.map((item, index) => {
          const isFavorited = favoritedItems.includes(item);

          return (
            <TouchableOpacity
              key={index}
              className={`flex-row justify-between items-center border-b border-gray-600 pb-4 ${
                index === recentDestinations.length - 1 ? "mb-6" : "mb-4"
              }`}
              onPress={() => router.push(`/empty/${item}`)}
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
                  <Text className="text-gray-400 text-sm">Recent search</Text>
                </View>
              </View>

              <TouchableOpacity
                style={{ marginLeft: "auto" }}
                onPress={() => handleFavoritePress(item)}
              >
                <MaterialCommunityIcons
                  name="star"
                  size={24}
                  color={isFavorited ? "#FFD700" : "gray"} // Toggle color based on whether it's favorited
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text className="text-white">No recent searches</Text>
      )}
    </View>
  );
};

export default RecentSearches;
