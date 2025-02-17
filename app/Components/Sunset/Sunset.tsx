"use client";

import { useGlobalContext } from "@/app/context/GlobalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { unixTimeToLocalTime } from "@/app/utils/misc";
import { Progress } from "@/components/ui/progress";
import { sunset, sunrise } from "@/app/utils/icons";

export default function Sunset() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
    return <Skeleton className="w-full h-[12rem]" />;
  }

  const times = forecast?.sys?.sunset;
  const timezone = forecast?.timezone;
  const sunsetTime = unixTimeToLocalTime(times, timezone);
  const sunriseTime = unixTimeToLocalTime(forecast?.sys?.sunrise, timezone);
  return (
    <div
      className="py-6 px-4 h-[12rem] 
    border rounded-lg flex flex-col justify-between dark:bg-dark-gray shadow-sm dark:shadow-none"
    >
      <div className="top flex flex-col items-center justify-center">
        <h2 className="flex items-center gap-2 font-md">{sunset}Закат</h2>
        <p className="pt-2 text-2xl">{sunsetTime}</p>
      </div>
      <div className="top flex flex-col items-center justify-center">
        <h2 className="flex items-center gap-2 font-md">{sunrise}Восход</h2>
        <p className="pt-2 text-2xl">{sunriseTime}</p>
      </div>
    </div>
  );
}
