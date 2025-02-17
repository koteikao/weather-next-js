"use client";

import { useGlobalContext } from "@/app/context/GlobalContext";
import {
  cloudy,
  rain,
  drizzleIcon,
  clearSky,
  snow,
  thunderstorm,
  mist,
} from "@/app/utils/icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import moment from "moment";
export default function DailyForecast() {
  const { forecast, fiveDayForecast } = useGlobalContext();

  const { weather } = forecast;
  const { city, list } = fiveDayForecast;
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  if (!fiveDayForecast || !city || !list) {
    return (
      <Skeleton className="w-full h-[12rem] col-span-full sm-2:col-span-2 md:col-span-2 md-2:col-span-3" />
    );
  }

  if (!forecast || !weather) {
    return <Skeleton className="w-full h-[12rem]" />;
  }
  const todayForecast = list.filter(
    (forecast: { dt_txt: string; main: { temp: number } }) => {
      return forecast.dt_txt.startsWith(todayString);
    }
  );
  const { main: weatherMain, description, icon } = weather[0];

  const getIcon = (weatherMain: string) => {
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
      className="col-span-full sm-2:col-span-2 md:col-span-2 md-2:col-span-3 pt-6 px-4 h-[12rem] 
    border rounded-lg flex flex-col gap-8 dark:bg-dark-gray shadow-sm dark:shadow-none"
    >
      <div className="h-full flex gap-10 overflow-hidden">
        {todayForecast.length < 1 ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <div className="w-full">
            <Carousel>
              <CarouselContent>
                {todayForecast.map(
                  (forecast: { dt_txt: string; main: { temp: number } }) => (
                    <CarouselItem
                      key={forecast.dt_txt}
                      className="flex flex-col gap-4 cursor-grab basis-[8.5rem]"
                    >
                      <p className="text-gray-300 ">
                        {moment(forecast.dt_txt).format("HH:mm")}
                      </p>
                      <p>{getIcon(weatherMain)}</p>
                      <p className="mt-4 ">
                        {kelvinToCelsius(forecast.main.temp)}°C
                      </p>
                    </CarouselItem>
                  )
                )}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}
