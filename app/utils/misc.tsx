import moment from "moment";

// Kelvin to Celsius
export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

// Unix to Time
export const unixToTime = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format("HH:mm");
};

// Unix to Day
export const unixToDay = (unix: number) => {
  return moment.unix(unix).format("ddd");
};

// Air Quality Value Text
export const airQualityValueText = [
  {
    rating: 20,
    text: "хорошее",
  },
  {
    rating: 40,
    text: "удовлетворительное",
  },
  {
    rating: 60,
    text: "среднее",
  },
  {
    rating: 80,
    text: "плохое",
  },
  {
    rating: 100,
    text: "очень плохое",
  },
];

// Unix Time to Local Time
export const unixTimeToLocalTime = (unixTime: number, timezone: number) => {
  return moment
    .unix(unixTime)
    .utcOffset(timezone / 60)
    .format("HH:mm");
};
