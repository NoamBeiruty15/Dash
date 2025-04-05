import { View, Text, FlatList } from "react-native";
import React from "react";

const RecentSearches = ({ recentDestination }) => {
  return (
    <View>
      {recentDestination && recentDestination.length > 0 ? (
        <FlatList
          data={recentDestination}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text className="text-white text-lg">{item}</Text>
          )}
        />
      ) : (
        <Text className="text-white">No recent searches</Text>
      )}
    </View>
  );
};

export default RecentSearches;
