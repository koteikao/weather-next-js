"use client";

import { use, useEffect, useMemo, useState } from "react";
import moment from "moment";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { kelvinToCelsius } from "@/app/utils/misc";
import {
  rain,
  snow,
  thunderstorm,
  mist,
  drizzleIcon,
  clearSky,
  cloudy,
  navigation,
} from "@/app/utils/icons";
import { Skeleton } from "@/components/ui/skeleton";
import "moment/locale/ru";

moment.locale("ru");
export default function Temperature() {
  const { forecast, geoCodedList } = useGlobalContext();
  const cityName = geoCodedList?.[0]?.local_names.ru;
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  // life time update
  useEffect(() => {
    // update time every minute
    const interval = setInterval(() => {
      if (forecast?.timezone) {
        const localMoment = moment().utcOffset(forecast.timezone / 60);
        // custom format: 24 hour format
        const formattedTime = localMoment.format("HH:mm");
        // day of the week
        const day = localMoment.format("dddd");

        setLocalTime(formattedTime);
        setCurrentDay(day.charAt(0).toUpperCase() + day.slice(1));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [forecast?.timezone]);

  // Проверка наличия данных
  if (!forecast || !forecast.weather || !forecast.timezone) {
    return <Skeleton className="w-full h-[25rem]" />;
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
      className="pt-8 pb-5 px-4 border rounded-lg flex flex-col 
        justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <p className="flex justify-between items-center gap-2">
        <span className="text-md">{currentDay}</span>
        <span className="text-md">{localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{cityName}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}°C</p>

      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize leading-none text-lg font-md">
            {description}
          </p>
        </div>
        <p className="flex items-center gap-2">
          <span>Мин: {minTemp}°C</span>
          <span>Макс: {maxTemp}°C</span>
        </p>
      </div>
    </div>
  );
}
