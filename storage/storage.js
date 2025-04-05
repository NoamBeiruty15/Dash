import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITE_DESTINATIONS_KEY = "FAVORITE_DESTINATIONS";
const RECENT_DESTINATIONS_KEY = "RECENT_DESTINATIONS";

// Save a new favorite destination
export const addFavoriteDestination = async (destination) => {
  try {
    const existing = await AsyncStorage.getItem(FAVORITE_DESTINATIONS_KEY);
    let favoriteDestinations = existing ? JSON.parse(existing) : [];

    // Avoid duplicates
    if (!favoriteDestinations.includes(destination)) {
      favoriteDestinations.push(destination);
    }

    await AsyncStorage.setItem(
      FAVORITE_DESTINATIONS_KEY,
      JSON.stringify(favoriteDestinations)
    );
  } catch (error) {
    console.error("Error adding favorite destination:", error);
  }
};

// Remove a favorite destination
export const removeFavoriteDestination = async (destination) => {
  try {
    const existing = await AsyncStorage.getItem(FAVORITE_DESTINATIONS_KEY);
    let favoriteDestinations = existing ? JSON.parse(existing) : [];

    // Remove destination from list
    favoriteDestinations = favoriteDestinations.filter(
      (item) => item !== destination
    );

    await AsyncStorage.setItem(
      FAVORITE_DESTINATIONS_KEY,
      JSON.stringify(favoriteDestinations)
    );
  } catch (error) {
    console.error("Error removing favorite destination:", error);
  }
};

// Get all favorite destinations
export const getFavoriteDestinations = async () => {
  try {
    const result = await AsyncStorage.getItem(FAVORITE_DESTINATIONS_KEY);
    return result ? JSON.parse(result) : [];
  } catch (error) {
    console.error("Error fetching favorite destinations:", error);
    return [];
  }
};

// Save a new recent destination
export const addRecentDestination = async (destination) => {
  try {
    const existing = await AsyncStorage.getItem(RECENT_DESTINATIONS_KEY);
    let recentDestinations = existing ? JSON.parse(existing) : [];

    // Avoid duplicates
    if (!recentDestinations.includes(destination)) {
      recentDestinations.unshift(destination); // Add to the start of the list
    }

    // Limit the list to the last 10 recent destinations
    if (recentDestinations.length > 10) {
      recentDestinations = recentDestinations.slice(0, 10);
    }

    await AsyncStorage.setItem(
      RECENT_DESTINATIONS_KEY,
      JSON.stringify(recentDestinations)
    );
  } catch (error) {
    console.error("Error adding recent destination:", error);
  }
};

// Get all recent destinations
export const getRecentDestinations = async () => {
  try {
    const result = await AsyncStorage.getItem(RECENT_DESTINATIONS_KEY);
    return result ? JSON.parse(result) : [];
  } catch (error) {
    console.error("Error fetching recent destinations:", error);
    return [];
  }
};

// Remove a recent destination (optional, if needed)
export const removeRecentDestination = async (destination) => {
  try {
    const existing = await AsyncStorage.getItem(RECENT_DESTINATIONS_KEY);
    let recentDestinations = existing ? JSON.parse(existing) : [];

    // Remove destination from list
    recentDestinations = recentDestinations.filter(
      (item) => item !== destination
    );

    await AsyncStorage.setItem(
      RECENT_DESTINATIONS_KEY,
      JSON.stringify(recentDestinations)
    );
  } catch (error) {
    console.error("Error removing recent destination:", error);
  }
};

// Remove all

export const clearDestinations = async () => {
  try {
    await AsyncStorage.removeItem(RECENT_DESTINATIONS_KEY);
    console.log("Recent destinations cleared");

    await AsyncStorage.removeItem(FAVORITE_DESTINATIONS_KEY);
    console.log("Favorite destinations cleared");
  } catch (error) {
    console.error("Error clearing destinations:", error);
  }
};
