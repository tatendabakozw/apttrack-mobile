import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { Text } from "@/components/Themed";
import tw from "twrnc";
import CurrentLocationButton from "@/components/buttons/location-buttons/CurrentLocationButton";
import DestinationLocationButton from "@/components/buttons/location-buttons/DestinationLocationButton";
import { Link } from "expo-router";

export default function HomeTabScreen() {
 
  return (
    <ScrollView style={[tw`px-4`, styles.container]}>
      <Text style={tw`text-6xl w-3/4 pt-16 pb-8`}>
        Where do you want to go?
      </Text>
      <View style={tw`relative items-center content-center justify-center`}>
        <CurrentLocationButton />
        <View style={tw`p-2`} />

        <DestinationLocationButton />
        <Link href="/explore" asChild>
          <Pressable style={tw`bg-[#cbc5e9] w-full p-2 rounded-lg mt-4`}>
            <Text style={tw`text-center font-semibold text-2xl text-[#183641]`}>
              Go
            </Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#183641",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
