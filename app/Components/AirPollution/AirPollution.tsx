"use client";

import { useGlobalContext } from "@/app/context/GlobalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { thermo } from "@/app/utils/icons";
import { Progress } from "@/components/ui/progress";
import { airQualityValueText } from "@/app/utils/misc";

export default function AirPollution() {
  const { airQuality } = useGlobalContext();

  if (
    !airQuality ||
    !airQuality.list ||
    !airQuality.list[0] ||
    !airQuality.list[0].main
  ) {
    return (
      <Skeleton className="w-full h-[12rem] col-span-2 md:col-span-full" />
    );
  }

  const airQualityValue = airQuality.list[0].main.aqi * 20;
  const filteredValue = airQualityValueText.find((item) => {
    return item.rating === airQualityValue;
  });
  console.log(airQualityValue);
  console.log(filteredValue);

  return (
    <div
      className="air-pollution col-span-full sm-2:col-span-2 pt-6 px-4 h-[12rem] 
    border rounded-lg flex flex-col gap-8 dark:bg-dark-gray shadow-sm dark:shadow-none"
    >
      <h2 className="flex items-center gap-2 font-md">{thermo}Air Pollution</h2>
      <Progress value={airQualityValue} max={100} className="progress" />
      <p>Air Quality is {filteredValue?.text}</p>
    </div>
  );
}
