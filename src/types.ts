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

export interface Match {
  _id: string;
  tourney_name: string;
  surface: string;
  draw_size: string;
  tourney_level: string;
  tourney_date: number;
  match_num: string;
  winner_id: string;
  winner_seed: string;
  winner_entry: string;
  winner_name: string;
  winner_hand: string;
  winner_ht: string;
  winner_ioc: string;
  winner_age: string;
  loser_id: string;
  loser_seed: string;
  loser_entry: string;
  loser_name: string;
  loser_hand: string;
  loser_ht: string;
  loser_ioc: string;
  loser_age: string;
  score: string;
  best_of: string;
  round: string;
  minutes: string;
  w_ace: string;
  w_df: string;
  w_svpt: string;
  w_1stIn: string;
  w_1stWon: string;
  w_2ndWon: string;
  w_SvGms: string;
  w_bpSaved: string;
  w_bpFaced: string;
  l_ace: string;
  l_df: string;
  l_svpt: string;
  l_1stIn: string;
  l_1stWon: string;
  l_2ndWon: string;
  l_SvGms: string;
  l_bpSaved: string;
  l_bpFaced: string;
}

export interface Player {
  _id: string;
  name_first: string;
  name_last: string;
  hand: string;
  player_id: string;
}
