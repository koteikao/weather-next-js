import moment from "moment";

// Kelvin to Celsius
export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

// Air Quality Value Text
export const airQualityValueText = [
  {
    rating: 20,
    text: "good",
  },
  {
    rating: 40,
    text: "fair",
  },
  {
    rating: 60,
    text: "moderate",
  },
  {
    rating: 80,
    text: "poor",
  },
  {
    rating: 100,
    text: "very poor",
  },
];

// Unix Time to Local Time
export const unixTimeToLocalTime = (unixTime: number, timezone: number) => {
  return moment
    .unix(unixTime)
    .utcOffset(timezone / 60)
    .format("HH:mm");
};
