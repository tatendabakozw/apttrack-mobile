import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import tw from "twrnc";

type Props = {
  heading: string;
  icon_name: string;
};

const LocationSmallButton = ({ heading, icon_name }: Props) => {
  return (
    <View
      style={tw`bg-white p-2 rounded-lg flex-1 justify-center items-center h-15`}
    >
      {/* @ts-ignore */}
      <Feather name={`${icon_name}`} size={24} color="black" />
      <Text style={tw`pt-2 capitalize text-slate-700 font-medium`}>{heading}</Text>
    </View>
  );
};

export default LocationSmallButton;

const styles = StyleSheet.create({});
