import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import tw from "twrnc";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import { getDecodedPolyline } from "@/helpers/getDecodedPolyline";
import MapHeader from "@/components/map-components/MapHeader";
import { Store } from "@/context/Store";
import { config } from "@/utils/config";

const google_maps_api_key = config.GOOGLE_MAPS_API_KEY;

type Props = {};

const ExploreTabScreen = (props: Props) => {
  const { location, error, isLoading } = useCurrentLocation();
  const [directions, setDirections] = useState<any>(null);
  const [new_error, serNewError] = useState<any>(null);
  const [estimatedTravelTime, setEstimatedTravelTime] = useState(null);
  const [estimatedLength, setEstimatedLength] = useState(null);
  const [mapRegion, setMapRegion] = useState<any>(null);
  const { state, dispatch } = useContext<any>(Store);
  const { startLocation, destinationLocation, pathInfo } = state;

  // const [destination, setDestination] = useState({
  //   latitude: -17.824858,
  //   longitude: 31.053028,
  // });

  const getDirections = async () => {
    // console.log('start Location is: ', startLocation)
    try {
      const apiKey = google_maps_api_key;
      const origin = startLocation ? `${startLocation.latitude},${startLocation.longitude}` : `${location.latitude},${location.longitude}`;
      const destinationStr = `${destinationLocation.latitude},${destinationLocation.longitude}`;
      const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destinationStr}&key=${apiKey}`;

      const response = await fetch(apiUrl);
      const result = await response.json();

      if (result.status === "OK" && result.routes.length > 0) {
        const polyline = result.routes[0].overview_polyline.points;
        const decodedPolyline = getDecodedPolyline(polyline);
        setDirections(decodedPolyline);
        if (result.routes[0].legs.length > 0) {
          const durationInSeconds = result.routes[0].legs[0].duration.value;
          const lengthInMeters = result.routes[0].legs[0].distance.value;
          setEstimatedTravelTime(durationInSeconds);
          setEstimatedLength(lengthInMeters);
          dispatch({
            type: "SET_PATH_INFO",
            payload: {
              travelTime: estimatedTravelTime,
              travelLength: estimatedLength,
            },
          });

          // console.log("Estimated time is: ", setEstimatedTravelTime);
        }
        // Calculate bounding box for the polyline
        const coordinates = decodedPolyline.map((point) => ({
          latitude: point.latitude,
          longitude: point.longitude,
        }));

        const maxLat = Math.max(...coordinates.map((coord) => coord.latitude));
        const minLat = Math.min(...coordinates.map((coord) => coord.latitude));
        const maxLng = Math.max(...coordinates.map((coord) => coord.longitude));
        const minLng = Math.min(...coordinates.map((coord) => coord.longitude));

        setMapRegion({
          latitude: (maxLat + minLat) / 2,
          longitude: (maxLng + minLng) / 2,
          latitudeDelta: maxLat - minLat + 0.02, // Add a buffer
          longitudeDelta: maxLng - minLng + 0.02,
        });
      } else {
        serNewError("No directions found");
      }
    } catch (error) {
      serNewError("Error fetching directions");
    }
  };

  console.log('my start location: ', location)

  useEffect(() => {
    if (location && destinationLocation && startLocation) {
      getDirections();
    }
  }, [location, destinationLocation, startLocation]);

  useEffect(() => {
    // Use the updated state values here
    if (estimatedTravelTime !== null && estimatedLength !== null) {
      dispatch({
        type: "SET_PATH_INFO",
        payload: {
          travelTime: estimatedTravelTime,
          travelLength: estimatedLength,
        },
      });
    }
  }, [estimatedTravelTime, estimatedLength, dispatch]);

  if (isLoading) {
    return <View style={tw`min-h-full items-center justify-center content-center` }><ActivityIndicator size={'large'}/></View>;
  }

  if (error) {
    return <Text  style={tw`min-h-full items-center justify-center content-center`}>Error: {error}</Text>;
  }

  return (
    <View style={[tw`bg-slate-100 min-h-full relative`, styles.container]}>
      {/*  top area */}
      <View style={tw`w-full px-4 absolute z-50 flex flex-row`}>
        <MapHeader />
      </View>
      {/*  the underlying map item */}
      <MapView
        style={{ flex: 1, zIndex: 0 }}
        initialRegion={{
          latitude: startLocation ? startLocation.latitude : location.latitude, // Replace with your desired latitude
          longitude: startLocation
            ? startLocation.longitude
            : location.longitude, // Replace with your desired longitude
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={mapRegion}
      >
        {startLocation ? (
          <Marker
            coordinate={{
              latitude: startLocation.latitude,
              longitude: startLocation.longitude,
            }}
            title="Journey Start"
          />
        ) : (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="My Location"
          />
        )}
        {destinationLocation && (
          <Marker coordinate={destinationLocation} title="Destination" />
        )}

        {directions && (
          <Polyline
            coordinates={directions}
            strokeColor="#000" // Line color
            strokeWidth={3}
          />
        )}
      </MapView>
      {/* <Text>Estimated Travel Time:</Text>
      <Text>{formatTime(estimatedTravelTime)}</Text> */}
    </View>
  );
};

export default ExploreTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

