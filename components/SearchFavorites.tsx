import { View, Text, FlatList } from 'react-native'
import React from 'react'

const SearchFavorites = ({ favoriteDestinations }) => {
  return (
    <View>
      {favoriteDestinations && favoriteDestinations.length > 0 ? (
        <FlatList
          data={favoriteDestinations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text className="text-white text-lg">{item}</Text>
          )}
        />
      ) : (
        <Text className="text-white">No favorite destinations</Text>
      )}
    </View>
  );
}

export default SearchFavorites
