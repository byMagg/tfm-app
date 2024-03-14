export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export type TrafficCrash = {
  CRASH_RECORD_ID: string;
  CRASH_DATE: string;
  WEATHER_CONDITION: string;
  ROAD_DEFECT: string;
  LOCATION: string;
  STREET_NAME: string;
};
