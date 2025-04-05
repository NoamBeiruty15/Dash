import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "./globals.css";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
