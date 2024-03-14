import React, { useContext, useState } from "react";
import tw from "twrnc";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SelectLocationModal from "@/components/modals/SelectLocationModal";
import { Store } from "@/context/Store";

type Props = {};

const DestinationLocationButton = (props: Props) => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [current_location, setCurrentLocation] = useState("");
  const { state } = useContext<any>(Store);
  const { destinationLocation } = state;

  const openDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };
  const RenderModalItems = () => {
    return (
      <View style={tw`flex flex-col pb-2`}>{/* aothe stuff goes here */}</View>
    );
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={openDrawer}
      style={tw`bg-[#2f4a55] relative p-4 rounded-xl flex flex-col w-full`}
    >
      <View style={tw`flex flex-row pb-4`}>
        <View style={tw`p-2 rounded-full bg-[#465e68] rounded-full`}>
          <Ionicons name="bus" size={20} color="#cbc5e9" />
        </View>
      </View>
      <Text style={tw`text-slate-400 pb-2`}>To</Text>
      <Text style={tw`text-white text-lg`}>
        {destinationLocation ? destinationLocation.name : "Click to search"}
      </Text>
      <SelectLocationModal
        type="destination"
        value={current_location}
        setValue={setCurrentLocation}
        heading="Destination ?"
        isVisible={isDrawerVisible}
        onClose={closeDrawer}
      >
        <RenderModalItems />
      </SelectLocationModal>
    </TouchableOpacity>
  );
};

export default DestinationLocationButton;

const styles = StyleSheet.create({});
