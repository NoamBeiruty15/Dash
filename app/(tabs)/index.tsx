import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const handleSearchPress = () => {
    router.push("/screens/SearchDirections");
  };

  return (
    <View className="flex-1 bg-background px-4 py-20">
      <Text className="text-white text-2xl font-bold mb-4 ml-1">
        Where do you want to go?
      </Text>

      <TouchableOpacity
        className="flex-row items-center bg-white rounded-md overflow-hidden"
        onPress={handleSearchPress}
        activeOpacity={0.7}
      >
        <View className="flex-1 p-3 text-black text-lg justify-center">
          <Text className="text-gray-500">Search destination...</Text>
        </View>

        <View className="bg-secondary p-4 flex items-center justify-center">
          <MaterialCommunityIcons name="magnify" size={24} color="white" />
        </View>
      </TouchableOpacity>

    </View>
  );
}
