export type TrafficCrash = {
  CRASH_RECORD_ID: string;
  CRASH_DATE: string;
  WEATHER_CONDITION: string;
  ROAD_DEFECT: string;
  LOCATION: string;
  STREET_NAME: string;
};

export interface Accident {
  _id: string;
  ID: string;
  Source: string;
  Severity: string;
  Start_Time: string;
  End_Time: string;
  Start_Lat: string;
  Start_Lng: string;
  End_Lat: string;
  End_Lng: string;
  Distance: string;
  Description: string;
  Street: string;
  City: string;
  County: string;
  State: string;
  Zipcode: string;
  Country: string;
  Timezone: string;
  Airport_Code: string;
  Weather_Timestamp: string;
  Temperature: string;
  Wind_Chill: string;
  Humidity: string;
  Pressure: string;
  Visibility: string;
  Wind_Direction: string;
  Wind_Speed: string;
  Precipitation: string;
  Weather_Condition: string;
  Amenity: string;
  Bump: string;
  Crossing: string;
  Give_Way: string;
  Junction: string;
  No_Exit: string;
  Railway: string;
  Roundabout: string;
  Station: string;
  Stop: string;
  Traffic_Calming: string;
  Traffic_Signal: string;
  Turning_Loop: string;
  Sunrise_Sunset: string;
  Civil_Twilight: string;
  Nautical_Twilight: string;
  Astronomical_Twilight: string;
}

export const Severity = {
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Very High",
};
