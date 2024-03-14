import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import PathInfoModal from "../modals/PathInfoModal";
import { Store } from "@/context/Store";

type Props = {};

const MapHeader = (props: Props) => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const { state } = useContext<any>(Store);
  const { startLocation, destinationLocation } = state;

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
    <View
      style={[
        tw`p-2 rounded-xl bg-white shadow absolute flex-row items-center w-full  mx-4`,
        { top: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
      ]}
    >
      <View style={tw`h-10 w-10 rounded-full bg-slate-100`} />
      <View style={tw`flex flex-col flex-1 px-2`}>
        <Text style={tw`text-slate-700 font-semibold`}>{startLocation ? startLocation.name : "Current Location"}</Text>
        <Text style={tw`text-slate-400 text-sm`}>Destination: {destinationLocation?.name ? destinationLocation.name : 'No destination'}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={openDrawer}
        style={tw`bg-[#183641] rounded-full`}
      >
        <Text style={tw`text-white font-semibold py-2 px-4`}>Info</Text>
      </TouchableOpacity>
      <PathInfoModal
        heading="Path Information"
        isVisible={isDrawerVisible}
        onClose={closeDrawer}
      >
        <RenderModalItems />
      </PathInfoModal>
    </View>
  );
};

export default MapHeader;

const styles = StyleSheet.create({});
