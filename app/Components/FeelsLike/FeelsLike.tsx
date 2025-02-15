"use client";

import { useGlobalContext } from "@/app/context/GlobalContext";
import { thermo } from "@/app/utils/icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeelsLike() {
  const { forecast } = useGlobalContext();
  if (!forecast?.main?.feels_like || !forecast || !forecast?.main) {
    return <Skeleton className="w-full h-[12rem]" />;
  }
  const { feels_like, temp_min, temp_max } = forecast.main;
  const feelsLikeText = (
    feels_like: number,
    minTemp: number,
    maxTemp: number
  ) => {
    const avgTemp = (minTemp + maxTemp) / 2;
    if (feels_like > avgTemp && feels_like <= avgTemp + 5) {
      return "Feels close to the actual temperature";
    } else if (feels_like > avgTemp + 5) {
      return "Feels warmer than the actual temperature";
    } else if (feels_like < avgTemp - 5) {
      return "Feels cooler than the actual temperature";
    } else {
      return "Feels exactly the same as the actual temperature";
    }
  };
  return (
    <div
      className="col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2 pt-6 px-4 h-[12rem] 
    border rounded-lg flex flex-col gap-8 dark:bg-dark-gray shadow-sm dark:shadow-none"
    >
      <div className="top">
        <h2 className="flex items-center gap-2 font-md">{thermo}Feels Like</h2>
        <p className="pt-2 text-2xl">{kelvinToCelsius(feels_like)}°C</p>
      </div>
      <p className="text-sm">{feelsLikeText(feels_like, temp_min, temp_max)}</p>
    </div>
  );
}
