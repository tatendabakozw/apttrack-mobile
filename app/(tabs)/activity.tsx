import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import React from "react";
import tw from "twrnc";

type Props = {};

const AvivityTabScreen = (props: Props) => {
  return (
    <View style={[tw`bg-slate-50 min-h-full`, styles.container]}>
      <Text>ProfileTabScreen</Text>
    </View>
  );
};

export default AvivityTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
