import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  StatusBar,
  Pressable,
} from "react-native";
import tw from "twrnc";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

type Props = {};

const ProfileTabScreen = (props: Props) => {
  return (
    <ScrollView
      contentContainerStyle={[
        tw`bg-slate-50 min-h-full items-center content-center justify-center px-4`,
        styles.container,
      ]}
    >
      <View style={tw`relative`}>
        <View style={tw`h-40 w-40 bg-slate-200 rounded-3xl`} />
        <TouchableOpacity
          style={tw`bg-[#183641] h-10 w-10 rounded-xl items-center content-center justify-center absolute -right-2 -bottom-2`}
        >
          <AntDesign size={24} name="plus" color={"white"} />
        </TouchableOpacity>
      </View>
      <Text style={tw`text-3xl pt-8 pb-2 font-semibold text-[#183641]`}>
        Tatenda Samuel Bako
      </Text>
      <Text style={tw`text-sm text-slate-500 pb-8`}>Tap to edit</Text>
      <View
        style={tw`bg-white rounded-3xl overflow-hidden w-full flex flex-col px-1`}
      >
        <LinkItem
          location="logindetails"
          name="Login Details"
          details="Username, Password"
          icon={<FontAwesome name="user-o" size={24} color="black" />}
        />
        <View style={tw`border-b border-slate-50`} />
        <LinkItem
          location="address"
          name="Address & Location"
          details="Home address, Work address"
          icon={<Entypo name="address" size={24} color="black" />}
        />
      </View>
      <TouchableOpacity style={tw`bg-[#183641] w-full my-8 rounded-lg p-4`}>
        <Text style={tw`text-white text-center`}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

interface LinkItemProps {
  name: string;
  details: string;
  icon: any;
  location: any;
}

const LinkItem = ({ name, details, icon, location }: LinkItemProps) => (
  <Link href={location} asChild>
    <Pressable>
    <View style={tw`flex flex-row items-center p-4`}>
        <View>{icon}</View>
        <View style={tw`flex flex-col px-4 flex-1`}>
          <Text style={tw`text-lg font-semibold text-slate-900`}>{name}</Text>
          <Text style={tw`text-slate-400 text-sm`}>{details}</Text>
        </View>
        <View>
          <Entypo name="chevron-small-right" size={24} color="#334155" />
        </View>
      </View>
    </Pressable>
  </Link>
);

export default ProfileTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
