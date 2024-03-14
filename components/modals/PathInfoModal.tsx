import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import Modal from "react-native-modal";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";
import { Store } from "@/context/Store";
import { formatTime } from "@/helpers/timeMethods";

const MODAL_INITIAL_HEIGHT = "60%";

type BottomDrawerProps = {
  isVisible: boolean;
  onClose: () => void;
  heading: string;
  children: any;
};

const PathInfoModal: React.FC<BottomDrawerProps> = ({
  isVisible,
  onClose,
  heading,
  children,
}: BottomDrawerProps) => {
  const [modalHeight, setModalHeight] = useState(MODAL_INITIAL_HEIGHT);
  const { state } = useContext<any>(Store);
  const { pathInfo } = state;

  useEffect(() => {
    // Set initial height when the modal is opened
    if (isVisible) {
      setModalHeight(MODAL_INITIAL_HEIGHT);
    }
  }, [isVisible]);

  const handleTakeMeToStation = () => {
    console.log("take me to startion");
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      swipeDirection={["down"]}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View
        //   @ts-ignore
        style={[
          tw`rounded-t-2xl`,
          { backgroundColor: "white", padding: 16, height: modalHeight },
        ]}
      >
        <View style={tw`flex flex-row items-center justify-between pb-4`}>
          <Text style={tw`text-2xl font-semibold text-[#183641]`}>
            {heading}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            style={tw`bg-slate-100 p-2 rounded-full`}
          >
            <Feather name="x" size={20} color="#334155" />
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1 }}>
          <View style={tw`bg-slate-100 rounded-lg p-2 flex-col mb-4`}>
            <View style={tw`flex flex-row items-center justify-between pb-2`}>
              <Text style={tw`text-slate-900 text-2xl font-bold`}>
                {(pathInfo?.travelLength / 1000).toFixed(2)}km
              </Text>
              <Text style={tw`text-[#183641] text-2xl font-bold`}>
                {formatTime(pathInfo?.travelTime)}
              </Text>
            </View>
            <View style={tw`flex flex-row items-center pb-8`}>
              <Text style={tw`text-slate-400`}>Nearby station: </Text>
              <Text style={tw`font-medium text-slate-700`}>Chinhoyi Rank</Text>
            </View>
            <View style={tw`flex flex-row justify-between items-center`}>
              <TouchableOpacity
                onPress={handleTakeMeToStation}
                activeOpacity={0.7}
                style={tw`px-4 py-1 rounded-full bg-[#183641]`}
              >
                <Text style={tw`text-sm text-white`}>Take me to station</Text>
              </TouchableOpacity>
              <Text style={tw`text-slate-700`}>3.53kms/10mins</Text>
            </View>
          </View>

          <Text
            style={tw`mb-4 text-center capitalize text-slate-700 font-medium`}
          >
            Choose a bus from below
          </Text>

          <View style={tw`bg-slate-50 rounded-lg p-1`}>
            <BusItem />
            <BusItem />
            <BusItem />

          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const BusItem = () => {
  return (
    <View style={tw`flex flex-col bg-white p-2 mb-1`}>
      <View style={tw`flex flex-row justify-between items-center`}>
        <Image
          style={tw`h-8 w-16`}
          source={require("../../assets/images/bus.png")}
        />

        <Text style={tw`text-slate-400 text-sm font-medium`}>
          chinhoyi-harare
        </Text>
        {/* <Text>90%</Text> */}
      </View>
      <View style={tw`flex flex-row items-center justify-between`}>
        <View style={tw``}>
          <Text style={tw`text-lg font-medium text-slate-900`}>Tatenda</Text>
          <Text style={tw`text-slate-400 text-sm font-medium`}>Driver</Text>
        </View>
        <Text style={tw`text-slate-400 text-sm font-medium`}>8.7km left</Text>
        <View style={tw`flex flex-col`}>
          <Text style={tw`text-slate-800 font-medium text-lg`}>FDT546</Text>
          <Text style={tw` font-medium text-lg text-xs text-slate-400`}>
            passengers
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PathInfoModal;
