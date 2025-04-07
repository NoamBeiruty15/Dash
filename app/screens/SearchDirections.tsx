import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SearchExamples from "@/components/SearchExamples";
import SearchFavorites from "@/components/SearchFavorites";
import RecentSearches from "@/components/RecentSearches";
import {
  getFavoriteDestinations,
  getRecentDestinations,
  addFavoriteDestination,
  addRecentDestination,
  clearDestinations,
} from "@/storage/storage";

const SearchDirections = () => {
  const router = useRouter();

  const [favoriteDestinations, setFavoriteDestinations] = useState(null);
  const [recentDestinations, setRecentDestinations] = useState(null);
  const [searchText, setSearchText] = useState(""); // To capture the search input

  const handleBackArrowPress = () => {
    router.push("/");
  };

  const handleSearchDone = async () => {
    if (searchText.trim()) {
      await addRecentDestination(searchText);

      const updatedRecentDestinations = await getRecentDestinations();

      setRecentDestinations(updatedRecentDestinations);

      setSearchText("");
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      const favorites = await getFavoriteDestinations();
      const recents = await getRecentDestinations();

      setFavoriteDestinations(favorites);
      setRecentDestinations(recents);
    };

    fetchData()
  }, []);

  return (
    <View className="bg-[#121212] w-full h-full py-10">
      <View className="flex-row items-center mb-6 bg-secondaryBg">
        <TouchableOpacity className="ml-2 p-2" onPress={handleBackArrowPress}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        <TextInput
          placeholder="Where do you want to go?"
          placeholderTextColor="gray"
          className="flex-1 bg-secondaryBg text-gray-400 p-5 rounded-lg text-xl ml-2 mr-5"
          autoFocus={true}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearchDone}
        />
      </View>

      <View className="px-8">
        <TouchableOpacity className="flex-row items-center border-b border-gray-600 pb-4 mb-4">
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color="white"
            className="mr-3"
          />
          <Text className="text-white text-base">Search for a line</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center border-b border-gray-600 pb-4 mb-8">
          <MaterialCommunityIcons
            name="map-marker"
            size={24}
            color="#ff6200"
            className="mr-3"
          />
          <Text className="text-white text-base">Choose on map</Text>
        </TouchableOpacity>

        <>
          {favoriteDestinations && favoriteDestinations.length > 0 && (
            <>
              <Text className="text-gray-400 text-xl mb-8">
                Favorite destinations
              </Text>
              <SearchFavorites favoriteDestinations={favoriteDestinations} />
            </>
          )}

          {recentDestinations && recentDestinations.length > 0 && (
            <>
              <Text className="text-gray-400 text-xl mb-8">
                Recent destinations
              </Text>
              <RecentSearches recentDestinations={recentDestinations} />
            </>
          )}

          {(!favoriteDestinations || favoriteDestinations.length === 0) &&
            (!recentDestinations || recentDestinations.length === 0) && (
              <>
                <Text className="text-gray-400 text-xl mb-8">
                  Example searches
                </Text>
                <SearchExamples />
              </>
            )}
        </>
      </View>
    </View>
  );
};

export default SearchDirections;
