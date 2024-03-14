import { config } from "@/utils/config";
import axios from 'axios'

export const searchLocationsHandler = async (value:any) =>{
    try {
        const apiKey = config.GOOGLE_MAPS_API_KEY;
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${value}&key=${apiKey}`
        );
  
      } catch (error) {
        console.error("Error searching for places:", error);
      }
}