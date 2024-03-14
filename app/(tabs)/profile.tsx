import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  StatusBar,
} from "react-native";
import tw from "twrnc";
import { AntDesign, Feather, Entypo, FontAwesome } from "@expo/vector-icons";

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
      <View style={tw`bg-white rounded-3xl overflow-hidden w-full px-1`}>
        <LinkItem
          name="Login Details"
          details="Username, Password"
          icon={<FontAwesome name="user-o" size={24} color="black" />}
        />
        <View style={tw`border-b border-slate-50`} />
        <LinkItem
          name="Help"
          details="FAQs, Helpdesk"
          icon={<Feather name="headphones" size={24} color="black" />}
        />
        <View style={tw`border-b border-slate-50`} />
        <LinkItem
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
}

const LinkItem = ({ name, details, icon }: LinkItemProps) => {
  return (
    <View style={tw`flex flex-row items-center p-4`}>
      {/* @ts-ignore */}
      {icon}
      <View style={tw`flex flex-col px-4 flex-1`}>
        <Text style={tw`text-lg font-semibold text-slate-900`}>{name}</Text>
        <Text style={tw`text-slate-400 text-sm`}>{details}</Text>
      </View>
      <Entypo name="chevron-small-right" size={24} color="#334155" />
    </View>
  );
};

export default ProfileTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
