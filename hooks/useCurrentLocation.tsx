// useCurrentLocation.js
import { useEffect, useState } from "react";
import * as Location from "expo-location";

const useCurrentLocation = () => {
  const [location, setLocation] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          setIsLoading(false);
          return;
        }

        const locationResult = await Location.getCurrentPositionAsync({});
        setLocation(locationResult.coords);
        setIsLoading(false);
      } catch (e) {
        setError("Error fetching location");
        setIsLoading(false);
      }
    };

    getCurrentLocation();

    // Cleanup function (optional)
    return () => {
      // Any cleanup code, if needed
    };
  }, []);

  return { location, error, isLoading };
};

export default useCurrentLocation;
