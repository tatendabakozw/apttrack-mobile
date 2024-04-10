import React from "react";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName: any;

          if (route.name === "index") {
            iconName = focused ? "home-sharp" : "home-outline";
          } else if (route.name === "explore") {
            iconName = focused ? "compass" : "compass-outline";
          } else if (route.name === "activity") {
            iconName = focused ? "play-circle-sharp" : "play-circle-outline";
          } else if (route.name === "profile") {
            iconName = focused ? "person" : "person-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: route.name === "index" ? "#cbc5e9" : "#2f4a55",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarVisible: route.name == 'address',
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarStyle: {
          height: 70,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          borderRadius: 20,
          backgroundColor: route.name === "index" ? "#2f4a55" : "#fff",
          elevation: 0,
          borderTopWidth: 0,
          borderColor: route.name === "name" ? "white" : "black",
        },
        tabBarShowLabel: false,
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Tab One" }} />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="activity" />
      <Tabs.Screen name="profile" />

      {/* // items not appearing on navbar */}
      <Tabs.Screen
        name="logindetails"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="address"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
