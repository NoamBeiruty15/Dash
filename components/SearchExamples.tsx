import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SearchExamples = () => {
  const stations = [
    { name: "Tel Aviv Savidor Central Railway", type: "Station" },
    { name: "Azrieli Center/Menachem Begin", type: "Station" },
    { name: "Central Station, Jerusalem", type: "Station" },
    { name: "Be'er Sheva Central Station", type: "Station" },
  ];

  return (
    <View className="">
      {stations.map((station, index) => (
        <TouchableOpacity
          key={index}
          className={`flex-row items-center border-b border-gray-600 pb-4 ${
            index === stations.length - 1 ? "mb-6" : "mb-4"
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
              <Text className="text-white text-base">{station.name}</Text>
              <Text className="text-gray-400 text-sm">{station.type}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SearchExamples;
