export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

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
