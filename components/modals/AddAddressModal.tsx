import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import LabeledInput from "../inputs/LabeledInput";
import CustomButton from "../buttons/custom-button/CustomButton";
import { saveDataToStorage } from "@/helpers/secureStorageMethods";
import { config } from "@/utils/config";
import axios from "axios";

const MODAL_INITIAL_HEIGHT = "80%";

type BottomDrawerProps = {
  isVisible: boolean;
  onClose: () => void;
  heading: string;
  type: string;
};

const AddAddressModal = ({
  isVisible,
  onClose,
  heading,
  type,
}: BottomDrawerProps) => {
  const [modalHeight, setModalHeight] = useState(MODAL_INITIAL_HEIGHT);
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [house_number, setHouseNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set initial height when the modal is opened
    if (isVisible) {
      setModalHeight(MODAL_INITIAL_HEIGHT);
    }
  }, [isVisible]);

  const saveAddressInfo = async () => {
    setLoading(true);
    try {
      setAddress(`${street}`);
      const apiKey = config.GOOGLE_MAPS_API_KEY;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${address}&key=${apiKey}`
      );
      // console.log("info from search query:  ", response.data.results);
      const default_address = {
        address: response.data.results[0].formatted_address,
        coords: response.data.results[0].geometry.location,
        type: type,
      };
      saveDataToStorage(`${type}_address`, default_address);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error on saving address: ', error);
    }
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
          { backgroundColor: "white", height: modalHeight },
        ]}
      >
        <View
          style={tw`flex flex-row items-center justify-between pb-4 border-b border-slate-100 p-4`}
        >
          <View style={tw`flex flex-col`}>
            <Text style={tw`text-2xl font-semibold text-[#183641]`}>
              {heading}
            </Text>
            <Text style={tw`text-xs text-slate-400 `}>
              Complete address would assist better us in serving you
            </Text>
          </View>
          <TouchableOpacity
            onPress={onClose}
            style={tw`bg-slate-100 p-2 rounded-full`}
          >
            <Feather name="x" size={20} color="#334155" />
          </TouchableOpacity>
        </View>
        <View style={tw`p-4 flex flex-col`}>
          <LabeledInput
            value={country}
            setValue={setCountry}
            label="Country"
            placeholder="Enter your country name"
          />
          <LabeledInput
            value={city}
            setValue={setCity}
            label="City"
            placeholder="Enter city of residence"
          />
          <LabeledInput
            value={street}
            setValue={setStreet}
            label="Street (optional)"
            placeholder="Enter street name (optional)"
          />
          <LabeledInput
            value={house_number}
            setValue={setHouseNumber}
            label="House number"
            placeholder="Enter house number"
          />
          <CustomButton loading={loading} onPress={saveAddressInfo} text="Save Address" />
        </View>
      </View>
    </Modal>
  );
};

export default AddAddressModal;

const styles = StyleSheet.create({});
