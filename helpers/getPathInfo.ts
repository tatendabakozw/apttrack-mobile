import { locationItem } from "@/utils/types";
import { getDecodedPolyline } from "./getDecodedPolyline";

const YOUR_GOOGLE_MAPS_API_KEY = "AIzaSyBP4zfpgy3_pOo2fvin4OsT2RfoTih5TP0";

export const getPathInfo = async (
  currentLocation: locationItem,
  destinationLocation: locationItem
) => {
  let pathError;
  let directions;
  try {
    const apiKey = YOUR_GOOGLE_MAPS_API_KEY;
    const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
    const destinationStr = `${destinationLocation.latitude},${destinationLocation.longitude}`;
    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destinationStr}&key=${apiKey}`;

    const response = await fetch(apiUrl);
    const result = await response.json();

    if (result.status === "OK" && result.routes.length > 0) {
      const polyline = result.routes[0].overview_polyline.points;
      const decodedPolyline = getDecodedPolyline(polyline);
      directions = decodedPolyline;
    } else {
      pathError = "No directions found";
    }
  } catch (error) {
    pathError = "Error fetching directions";
  }

  return {pathError, directions}
};
