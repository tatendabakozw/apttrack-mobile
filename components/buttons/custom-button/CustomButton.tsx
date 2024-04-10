import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";

type Props = {
  text: string;
  onPress: () => void;
  loading?: boolean;
};

const CustomButton = ({ text, onPress, loading }: Props) => {
  return (
    <TouchableOpacity
      onPress={loading ? () => console.log("loadiong ... ") : onPress}
      style={tw`bg-[#183641] px-4 py-3 rounded-lg my-2`}
      activeOpacity={0.7}
    >
      <Text style={tw`text-white text-center text-xs font-medium`}>
        {loading ? "loading..." : text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
