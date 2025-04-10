import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
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
import "react-native-get-random-values";

const SearchDirections = () => {
  const router = useRouter();
  const API_KEY = "AIzaSyDhCuIXONxDV46tSCgitDIpRCUy7QkiQnk";

  const [favoriteDestinations, setFavoriteDestinations] = useState(null);
  const [recentDestinations, setRecentDestinations] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleBackArrowPress = () => {
    router.push("/");
  };

  const handlePlaceSelect = async (data, details = null) => {
    const description = details?.description || data?.description;
    const { lat, lng } = details?.geometry?.location;


    const destination = {description, lat, lng} 
    console.log(destination)

    if (destination) {
      await addRecentDestination(destination);
      Keyboard.dismiss();
      router.push(`/${lat}/${lng}/empty/${description}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const favorites = await getFavoriteDestinations();
      const recents = await getRecentDestinations();
      setFavoriteDestinations(favorites);
      setRecentDestinations(recents);
    };

    fetchData()
  }, []);

  return (
    <View className="bg-background w-full h-full py-10">
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className="flex-row items-center mb-6 bg-secondaryBg px-2">
          <TouchableOpacity
            className="p-2 absolute top-2"
            onPress={handleBackArrowPress}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
          </TouchableOpacity>

          <View className="flex-1 ml-2 pl-5 p-2">
            <GooglePlacesAutocomplete
              placeholder="Where do you want to go?"
              fetchDetails={true}
              onPress={handlePlaceSelect}
              query={{
                key: API_KEY,
                language: "en",
              }}
              styles={{
                textInput: {
                  backgroundColor: "transparent",
                  color: "white",
                  fontSize: 18,
                  borderBottomWidth: 1,
                  borderColor: "transparent",
                  padding: 10,
                },
                container: {
                  flex: 1,
                  backgroundColor: "#1e1e1e",
                },
                listView: {
                  backgroundColor: "#1c1c1e",
                  borderRadius: 8,
                  marginTop: 4,
                },
                row: {
                  backgroundColor: "#1e1e1e", // <- important!
                  padding: 13,
                  height: 44,
                  flexDirection: "row",
                },
                description: {
                  color: "white", // text color in suggestions
                },
                separator: {
                  height: 0.5,
                  backgroundColor: "#444",
                },
              }}
              textInputProps={{
                placeholderTextColor: "gray",
                onFocus: () => setIsFocused(true),
                onBlur: () => setIsFocused(false),
              }}
              enablePoweredByContainer={false}
            />
          </View>
        </View>

        {isFocused ? (
          ""
        ) : (
          <>
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
                    <SearchFavorites
                      favoriteDestinations={favoriteDestinations}
                    />
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

            <View className="items-center mt-5">
              <Text className="text-gray-300 text-center">
                Didn't find what you're looking for?
              </Text>
              <TouchableOpacity className="mt-5 py-4 px-8 bg-secondary rounded-md">
                <Text className="text-white font-semibold">Find on Map</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchDirections;
