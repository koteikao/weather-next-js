"use client";

import { useGlobalContext } from "@/app/context/GlobalContext";
import { droplets } from "@/app/utils/icons";
import { Skeleton } from "@/components/ui/skeleton";
export default function Humidity() {
  const { forecast } = useGlobalContext();
  if (!forecast?.main?.humidity || !forecast || !forecast?.main) {
    return <Skeleton className="w-full h-[12rem]" />;
  }
  const { humidity } = forecast.main;
  const getHumidityText = (humidity: number) => {
    if (humidity > 30) {
      return "Сухая: может вызвать кожные проблемы";
    } else if (humidity >= 30 && humidity < 50) {
      return "Нормальная: комфортно";
    } else if (humidity >= 50 && humidity < 70) {
      return "Умеренная: может вызвать проблемы с дыханием";
    } else if (humidity >= 70) {
      return "Влажно: может вызвать проблемы с дыханием";
    }
    return "Данные о влажности не доступны";
  };
  return (
    <div
      className="pt-6 px-4 h-[12rem] 
    border rounded-lg flex flex-col gap-8 dark:bg-dark-gray shadow-sm dark:shadow-none"
    >
      <div className="top">
        <h2 className="flex items-center gap-2 font-md">{droplets}Влажность</h2>
        <p className="pt-2 text-2xl">{forecast.main.humidity}%</p>
      </div>
      <p className="text-sm">{getHumidityText(humidity)}</p>
    </div>
  );
}
