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
} from "@/storage/storage"; // Assuming these functions exist

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
      // Save the search to recent searches and favorites if needed
      await addRecentDestination(searchText); // Save to recent destinations
      await addFavoriteDestination(searchText); // Save to favorite destinations (or modify logic to check if it's a favorite)

      // Update the recent and favorite destinations
      const updatedRecentDestinations = await getRecentDestinations();
      const updatedFavorites = await getFavoriteDestinations();

      setRecentDestinations(updatedRecentDestinations);
      setFavoriteDestinations(updatedFavorites);

      setSearchText(""); // Clear the input after search is done
      Keyboard.dismiss(); // Hide the keyboard
    }
  };

  useEffect(() => {
    // Fetch favorite and recent destinations from storage when the component mounts
    const fetchData = async () => {
      console.log("fetching data");
      const favorites = await getFavoriteDestinations();
      const recents = await getRecentDestinations();

      setFavoriteDestinations(favorites);
      setRecentDestinations(recents);
    };

    fetchData();
  }, []); // Runs only once when the component mounts

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
          value={searchText} // Controlled input
          onChangeText={setSearchText} // Update the searchText on input change
          onSubmitEditing={handleSearchDone} // When user presses 'Done' or 'Enter'
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

        <Text className="text-gray-400 mb-4 text-xl mb-8">
          {favoriteDestinations &&
          favoriteDestinations.length > 0 &&
          recentDestinations &&
          recentDestinations.length > 0
            ? "Your destinations"
            : favoriteDestinations && favoriteDestinations.length > 0
            ? "Favorite destinations"
            : recentDestinations && recentDestinations.length > 0
            ? "Recent destinations"
            : "Search examples"}
        </Text>

        <View>
          {favoriteDestinations && favoriteDestinations.length > 0 && (
            <SearchFavorites favoriteDestinations={favoriteDestinations} />
          )}
          {recentDestinations && recentDestinations.length > 0 && (
            <RecentSearches recentDestinations={recentDestinations} />
          )}
          {favoriteDestinations &&
            favoriteDestinations.length === 0 &&
            recentDestinations &&
            recentDestinations.length === 0 && <SearchExamples />}
        </View>

        <TouchableOpacity className="items-center mt-6">
          <Text className="text-gray-300">
            Didn't find what you're looking for?
          </Text>
          <TouchableOpacity className="bg-secondary py-4 px-8 rounded-md mt-4">
            <Text className="text-white font-semibold">Find on Map</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchDirections;
