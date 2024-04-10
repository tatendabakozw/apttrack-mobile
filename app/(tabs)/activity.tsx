import { StyleSheet, Text, View, Platform, StatusBar, ScrollView } from "react-native";
import React from "react";
import tw from "twrnc";

type Props = {};

const AvivityTabScreen = (props: Props) => {
  return (
    <View style={[tw`bg-slate-50`, styles.container]}>
      <Text style={tw`text-slate-900 text-center font-semibold text-lg py-4`}>
        Notifications
      </Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={tw`text-slate-900 font-semibold py-4 `}>Today</Text>
          <NotificationItem isRead={false} />
          <NotificationItem isRead={false} />
          <NotificationItem isRead={false} />
          <Text style={tw`text-slate-900 font-semibold py-4 `}>Earlier</Text>
          <NotificationItem isRead={true} />
          <NotificationItem isRead={true} />
          <NotificationItem isRead={false} />
          <NotificationItem isRead={false} />
          <NotificationItem isRead={false} />
          <NotificationItem isRead={false} />
          <NotificationItem isRead={false} />
          <NotificationItem isRead={false} />
          <NotificationItem isRead={false} />
          <NotificationItem isRead={false} />
        </View>
      </ScrollView>
    </View>
  );
};

interface NotificationItemProps {
  isRead: boolean;
}

const NotificationItem = ({ isRead }: NotificationItemProps) => {
  return (
    <View
      style={tw`${
        isRead ? `bg-white ` : `bg-[#a3afb3] `
      } flex-row items-start  p-4 mb-[2px]`}
    >
      <View
        style={tw`${
          isRead ? `bg-white ` : `bg-[#183641] `
        } h-2 w-2 rounded-full mt-2`}
      />
      <View style={tw`flex flex-col px-4`}>
        <Text style={tw`pb-2`}>
          Your bus is 10mins away from your nearest station. You better start
          walking
        </Text>
        <Text style={tw`text-xs text-[#183641] font-semibold`}>Just Now</Text>
      </View>
    </View>
  );
};

export default AvivityTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});
