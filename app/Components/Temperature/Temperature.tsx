"use client";

import { use, useState } from "react";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { kelvinToCelsius } from "@/app/utils/Misc";
import {
  rain,
  snow,
  thunderstorm,
  mist,
  drizzleIcon,
  clearSky,
  cloudy,
} from "@/app/utils/Icons";

export default function Temperature() {
  const { forecast } = useGlobalContext();
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  // Проверка наличия данных
  if (!forecast || !forecast.weather) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  const { main, weather, timezone, name } = forecast;

  const temp = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);

  const { main: weatherMain, description, icon } = weather[0];

  const getIcon = () => {
    switch (weatherMain) {
      case "Clouds":
        return cloudy;
      case "Clear":
        return clearSky;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Thunderstorm":
        return thunderstorm;
      case "Drizzle":
        return drizzleIcon;
      case "Mist":
        return mist;
      default:
        return clearSky;
    }
  };

  return (
    <div
      className="pt-6 pb-5 border rounded-lg flex flex-col
  justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <p className="flex justify-between items-center gap-2">
        <span className="text-md">{currentDay}</span>
        <span className="text-md">{localTime}</span>
      </p>
    </div>
  );
}
