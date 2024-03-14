import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { AntDesign, Ionicons } from "@expo/vector-icons";

type Props = {
  value: any;
  setValue: any;
  onClick: () => void;
};

const SearchInput = ({ value, setValue, onClick }: Props) => {
  return (
    <View style={tw`flex flex-row items-center`}>
      <View
        style={tw`flex flex-row items-center px-4 rounded-lg bg-slate-100 flex-1`}
      >
        <AntDesign name="search1" size={20} color="#94a3b8" />
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder="Search Location"
          style={tw`px-4 py-3`}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onClick}
        style={tw`bg-[#183641] rounded-full p-2 ml-2`}
      >
        <Ionicons name="search-outline" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({});
