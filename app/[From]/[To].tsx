"use client";

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

const LocationSelector = () => {
  const router = useRouter();
  const { From, To } = useLocalSearchParams();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromLocation, setFromLocation] = useState(From || "");
  const [toLocation, setToLocation] = useState(To);

  useEffect(() => {
    fetchTransitRoutes(toLocation);
  }, []);

  const fetchTransitRoutes = async (toLocation) => {
    try {
      setLoading(true);

      const fromLocation = "ה באייר";
      const fromCoords = await getCoordinates(fromLocation);
      if (!fromCoords) {
        throw new Error("Unable to find coordinates for 'ה באייר'");
      }

      // Geocode the "to" location (user input)
      const toCoords = await getCoordinates(toLocation);
      console.log(toCoords)
      if (!toCoords) {
        throw new Error("Unable to find coordinates for destination location");
      }

      // Construct the API URL with the lat, lng for fromPlace and toPlace
      const apiUrl = `https://api.busnearby.co.il/directions?fromPlace=%D7%94%27%20%D7%91%D7%90%D7%99%D7%99%D7%A8%2024%2C%20%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%99%D7%91-%D7%99%D7%A4%D7%95%2C%20${fromCoords.lat}%2C${fromCoords.lng}&toPlace=${toLocation}%2C%20${toCoords.lat}%2C${toCoords.lng}&arriveBy=false&locale=he&wheelchair=false&mode=WALK%2CTRANSIT&showIntermediateStops=true&numItineraries=6&maxWalkDistance=1207&optimize=QUICK&ignoreRealtimeUpdates=false`;
      console.log(apiUrl)

      // Fetch data from the transit API
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch transit routes");
      }
      const data = await response.json();

      // Process the response
      const parsedRoutes = getTransitRoutes(data);
      setRoutes(parsedRoutes);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const getCoordinates = async (location) => {
    try {
      // Fetch coordinates for the location using Geoapify API
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          location
        )}&apiKey=b6ec3d66032e4d5fa822dbcdb1172ae1`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch coordinates");
      }
      const data = await response.json();
      const firstResult = data.features[0];
      if (firstResult) {
        return {
          lat: firstResult.geometry.coordinates[1],
          lng: firstResult.geometry.coordinates[0],
        };
      } else {
        throw new Error("Location not found");
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getTransitRoutes = (data) => {
    const itineraries = data.plan.itineraries;
    return itineraries.map((itinerary, index) => ({
      id: index,
      duration: Math.round(itinerary.duration / 60), // Convert seconds to minutes
      arrivalTime: formatTime(new Date(itinerary.endTime)),
      cost: itinerary.fare ? itinerary.fare.fare.regular.cents / 100 : 6.0, // Example cost
      legs: itinerary.legs.map((leg) => ({
        mode: leg.mode,
        from: leg.from.name,
        to: leg.to.name,
        routeName: leg.routeShortName || leg.route,
        departureTime: new Date(leg.startTime),
      })),
    }));
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  };

  const getNextDepartures = (route) => {
    return [4, 22, 38]; // Mock departure times
  };

  return (
    <SafeAreaView className="bg-secondaryBg flex-1">
      <View className="flex-row items-start px-4 pt-4 pb-4 mt-8">
        <TouchableOpacity onPress={() => router.push("/")}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        <View className="flex-1 pl-4">
          <View className="flex-row items-center rounded-md px-3 py-1 mb-3 bg-background">
            <MaterialCommunityIcons
              name="circle-outline"
              size={10}
              color="#999"
              style={{ marginRight: 8 }}
            />
            <TextInput
              className="flex-1 text-white text-lg"
              placeholder="Current location"
              placeholderTextColor="#999"
              value={fromLocation !== "empty" ? fromLocation : ""}
              onChangeText={setFromLocation}
            />
          </View>

          <View className="flex-row items-center rounded-md px-3 py-1 bg-background">
            <MaterialCommunityIcons
              name="map-marker"
              size={16}
              color="#ff6200"
              style={{ marginRight: 10, marginLeft: -2 }}
            />
            <TextInput
              className="flex-1 text-white text-lg"
              placeholder="Choose destination"
              placeholderTextColor="#999"
              value={toLocation} // Using value instead of defaultValue
              onChangeText={setToLocation} // To handle the changes
            />
          </View>
        </View>
      </View>

      <ScrollView className="px-4 flex-1 bg-background pt-5">
        {loading ? (
          <View className="items-center justify-center py-10">
            <ActivityIndicator size="large" color="#ff6200" />
          </View>
        ) : error ? (
          <View className="items-center justify-center py-10">
            <Text className="text-white">
              Could not fetch transit data: {error}
            </Text>
          </View>
        ) : (
          routes.map((route) => (
            <TouchableOpacity
              key={route.id}
              className="mb-4 border-b border-gray-800 pb-4"
              onPress={() => console.log("Selected route:", route.id)}
            >
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center">
                  <Text className="text-white text-lg font-bold">
                    {route.duration} min
                  </Text>
                  <Text className="text-gray-400 text-lg ml-3">|</Text>
                  <Text className="text-gray-400 text-lg ml-3">
                    Arrival time: {route.arrivalTime}
                  </Text>
                </View>
                <View className="bg-[#082f4a] px-3 py-1 rounded-md">
                  <Text className="text-white text-xl">
                    ₪{route.cost.toFixed(2)}
                  </Text>
                </View>
              </View>

              <View className="bg-[#121212] rounded-lg p-4 mb-3">
                <View className="flex-row items-center">
                  {route.legs.map((leg, legIndex) => (
                    <React.Fragment key={legIndex}>
                      {leg.mode === "WALK" ? (
                        <View className="flex-row items-center">
                          <MaterialCommunityIcons
                            name="walk"
                            size={24}
                            color="#aaa"
                          />
                          {legIndex < route.legs.length - 1 && (
                            <Text className="text-gray-500 mx-2">›</Text>
                          )}
                        </View>
                      ) : leg.mode === "BUS" ? (
                        <View className="flex-row items-center">
                          <View className="bg-[#082f4a] px-3 py-1 rounded-md flex-row items-center">
                            <MaterialCommunityIcons
                              name="bus"
                              size={20}
                              color="white"
                            />
                            <Text className="text-white text-xl ml-1">
                              {leg.routeName}
                            </Text>
                          </View>
                          {legIndex < route.legs.length - 1 && (
                            <Text className="text-gray-500 mx-2">›</Text>
                          )}
                        </View>
                      ) : null}
                    </React.Fragment>
                  ))}
                </View>
              </View>

              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Text className="text-gray-400">Leaves in </Text>
                  <MaterialCommunityIcons
                    name="wifi"
                    size={18}
                    color="#2ecc71"
                    className="mr-1"
                  />
                  {getNextDepartures(route).map((time, i) => (
                    <Text key={i} className="text-[#2ecc71] text-lg ml">
                      {time}
                      {i < getNextDepartures(route).length - 1 ? ", " : ""}
                    </Text>
                  ))}
                  <Text className="text-gray-400 ml-1">
                    {" "}
                    min from {route.legs[0].from}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LocationSelector;
