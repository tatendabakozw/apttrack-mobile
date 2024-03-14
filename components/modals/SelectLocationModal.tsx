import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";
import SearchInput from "../inputs/SearchInput";
import LocationSmallButton from "../buttons/location-buttons/LocationSmallButton";
import axios from "axios";
import { config } from "@/utils/config";
import { Store } from "@/context/Store";

const MODAL_INITIAL_HEIGHT = "60%";

type BottomDrawerProps = {
  isVisible: boolean;
  onClose: () => void;
  heading: string;
  children: any;
  value: string;
  setValue: any;
  type: string;
};

const SelectLocationModal: React.FC<BottomDrawerProps> = ({
  isVisible,
  onClose,
  heading,
  children,
  value,
  setValue,
  type,
}: BottomDrawerProps) => {
  const [modalHeight, setModalHeight] = useState(MODAL_INITIAL_HEIGHT);
  const { dispatch } = useContext<any>(Store);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set initial height when the modal is opened
    if (isVisible) {
      setModalHeight(MODAL_INITIAL_HEIGHT);
    }
  }, [isVisible]);

  const [places, setPlaces] = useState([]);

  const handleSearch = async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const apiKey = config.GOOGLE_MAPS_API_KEY;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${value}&key=${apiKey}`
      );
      setValue("");
      setPlaces(response.data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error searching for places:", error);
    }
  };

  const handleOnResultPress = (item: any) => {
    const payload = {
      longitude: item.geometry.location.lng,
      latitude: item.geometry.location.lat,
      name: item.name,
      address: item.formatted_address,
    };

    if (type === "destination") {
      dispatch({
        type: "SET_DESTINATION_LOCATION",
        payload: payload,
      });
    } else {
      dispatch({
        type: "SET_CURRENT_LOCATION",
        payload: payload,
      });
    }
    onClose();
  };

  const clearSearch = () => {
    setPlaces([]);
    setValue("");
  };

  // console.log("found places is", places);

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
        <View style={tw`flex flex-col pb-2`}>
          <SearchInput
            onClick={handleSearch}
            value={value}
            setValue={setValue}
          />

          {places?.length < 1 && (
            <View
              style={tw`bg-slate-100 rounded-lg p-2 mt-2 flex flex-row justify-between`}
            >
              <LocationSmallButton heading="work" icon_name="briefcase" />
              <View style={tw`pl-2`} />
              <LocationSmallButton heading="home" icon_name="home" />
              <View style={tw`pl-2`} />
              <LocationSmallButton heading="locate" icon_name="map-pin" />
            </View>
          )}

{/* loading indocator */}
          {loading && (
            <View style={tw`py-4`}>
              <ActivityIndicator size={"large"} />
            </View>
          )}
          {places?.length >= 1 && (
            <View style={tw`w-full flex-col`}>
              <TouchableOpacity onPress={clearSearch} style={tw`self-end py-2`}>
                <Text style={tw`font-bold text-slate-900`}>clear</Text>
              </TouchableOpacity>
              {places.map((item: any) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleOnResultPress(item)}
                  key={item.place_id}
                  style={tw`bg-white border border-slate-100 rounded-lg p-2 mt-2 flex flex-row`}
                >
                  <Image
                    style={tw`h-10 w-10 rounded-lg`}
                    source={{ uri: item.icon }}
                    resizeMode="cover" // Adjust the resizeMode based on your design
                  />
                  <View style={tw`flex flex-col flex-1 px-4`}>
                    <Text style={tw`text-slate-900 text-lg font-semibold`}>
                      {item.name}
                    </Text>
                    <Text style={tw`text-slate-500`}>
                      {item.formatted_address}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {children}
      </View>
    </Modal>
  );
};

export default SelectLocationModal;
