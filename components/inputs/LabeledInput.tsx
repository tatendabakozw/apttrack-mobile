import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import tw from "twrnc";

type Props = {
  value: any;
  setValue: any;
  label: string;
  placeholder: string;
};

const LabeledInput = ({
  value,
  setValue,
  label,
  placeholder,
}: Props) => {
  return (
    <View style={tw`flex flex-col pb-4`}>
      <Text style={tw`p-1 text-slate-700`}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={tw`px-3 py-2 border border-slate-100 rounded-lg`}
      />
    </View>
  );
};

export default LabeledInput;

const styles = StyleSheet.create({});
