import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Link, router } from "expo-router";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import AddAddressModal from "@/components/modals/AddAddressModal";

const Address = () => {
  const handleBackPress = () => {
    router.back();
  };

  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [drawer_type, setDrawerType] = useState({
    type: "",
    name: "",
  });

  const openDrawer = (name: string, type: string) => {
    setDrawerVisible(true);
    setDrawerType({
      name,
      type,
    });
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <View style={[tw`px-4 h-full pb-22 `, styles.container]}>
      <View style={tw`flex flex-col h-full`}>
        <View style={tw`flex flex-row`}>
          <Link
            href={"/profile"}
            onPress={handleBackPress}
            style={tw`bg-slate-100 rounded-full p-2`}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </Link>
        </View>
        <Text style={tw`text-center py-4 text-slate-700 font-semibold text-lg`}>
          Configure Address
        </Text>
        {/* Home address */}
        <View
          style={tw`flex flex-col p-2 border border-slate-100 rounded-lg my-4`}
        >
          <View style={tw`flex flex-row items-center`}>
            <Entypo name="home" size={24} color="#183641" />
            <Text style={tw`pl-2 font-semibold text-slate-700`}>Home</Text>
          </View>
          <Text style={tw`py-2 text-sm text-slate-500`}>
            15002 Zengeza 3 Extension, Chitungwiza, Harare, Zimbabwe
          </Text>
          <View style={tw`flex flex-row items-center`}>
            <Text style={tw`text-xs text-cyan-500 flex-1`}>View on map</Text>
            <TouchableOpacity
              style={tw`bg-slate-100 rounded-full p-2`}
              onPress={() => openDrawer("Home Address", "home")}
            >
              <AntDesign name="ellipsis1" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Work address */}
        <View
          style={tw`flex flex-col p-2 border border-slate-100 rounded-lg my-4`}
        >
          <View style={tw`flex flex-row items-center`}>
            <Entypo name="briefcase" size={24} color="#183641" />
            <Text style={tw`pl-2 font-semibold text-slate-700`}>Work</Text>
          </View>
          <Text style={tw`py-2 text-sm text-slate-500`}>
            15002 Zengeza 3 Extension, Chitungwiza, Harare, Zimbabwe
          </Text>
          <View style={tw`flex flex-row items-center`}>
            <Text style={tw`text-xs text-cyan-500 flex-1`}>View on map</Text>
            <TouchableOpacity
              style={tw`bg-slate-100 rounded-full p-2`}
              onPress={() => openDrawer("Work Address", "work")}
            >
              <AntDesign name="ellipsis1" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <AddAddressModal
        type={drawer_type.type}
        heading={drawer_type.name}
        isVisible={isDrawerVisible}
        onClose={closeDrawer}
      />
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
