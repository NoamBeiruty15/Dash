import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#191919", // Dark background for the tab bar
          borderTopWidth: 0, // Remove the top border
          height: 55, // Set the height of the tab bar
        },
        tabBarInactiveTintColor: "#cdcdcd", // Lighter gray for inactive icons and text
        tabBarActiveTintColor: "#ff6200", // Orange color for active icon
        headerShown: false, // Hide header for all screens
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Directions",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="stations"
        options={{
          title: "Stations",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map-marker"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="lines"
        options={{
          title: "Lines",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="train" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="tickets"
        options={{
          title: "Tickets",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="ticket" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
