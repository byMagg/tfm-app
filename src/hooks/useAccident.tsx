import { fetchAPI } from "@/utils";
import { useEffect, useState } from "react";

export function useAccident({ id }: { id: string }) {
  const query = `
      query GetAccident {
        getAccident(accidentId: "${id}") {
          _id
          ID
          Source
          Severity
          Start_Time
          End_Time
          Start_Lat
          Start_Lng
          End_Lat
          End_Lng
          Distancemi
          Description
          Street
          City
          County
          State
          Zipcode
          Country
          Timezone
          Airport_Code
          Weather_Timestamp
          TemperatureF
          Wind_ChillF
          Humidity
          Pressurein
          Visibilitymi
          Wind_Direction
          Wind_Speedmph
          Precipitationin
          Weather_Condition
          Amenity
          Bump
          Crossing
          Give_Way
          Junction
          No_Exit
          Railway
          Roundabout
          Station
          Stop
          Traffic_Calming
          Traffic_Signal
          Turning_Loop
          Sunrise_Sunset
          Civil_Twilight
          Nautical_Twilight
          Astronomical_Twilight
        }
      }
  `;

  const [accident, setAccident] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const apiData = await fetchAPI(query);
      const { getAccident } = apiData;
      setAccident(getAccident);
      setLoading(false);
    };
    fetch();
  }, []);

  return { accident, loading };
}
