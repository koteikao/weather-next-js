"use client";

import { useGlobalContext } from "@/app/context/GlobalContext";
import { gauge } from "@/app/utils/icons";
import { Skeleton } from "@/components/ui/skeleton";

export default function Pressure() {
  const { forecast } = useGlobalContext();
  if (!forecast?.main?.pressure || !forecast || !forecast?.main) {
    return <Skeleton className="w-full h-[12rem]" />;
  }
  const { pressure } = forecast.main;
  const getPressureDescription = (pressure: number) => {
    if (pressure < 1000) return "Very low pressure";
    if (pressure >= 1000 && pressure < 1015)
      return "Low pressure. Expect weather changes.";
    if (pressure >= 1015 && pressure < 1025)
      return "Normal pressure. Expect weather changes.";
    if (pressure >= 1025 && pressure < 1040)
      return "High pressure. Expect weather changes.";
    if (pressure >= 1040) return "Very high pressure. Expect weather changes.";
    return "Unavailable pressure data";
  };

  return (
    <div
      className="pt-6 px-4 h-[12rem] 
    border rounded-lg flex flex-col gap-8 dark:bg-dark-gray shadow-sm dark:shadow-none"
    >
      <div className="top">
        <h2 className="flex items-center gap-2 font-md">{gauge}Pressure</h2>
        <p className="pt-2 text-2xl">{pressure}hPa</p>
      </div>
      <p className="text-sm">{getPressureDescription(pressure)}</p>
    </div>
  );
}
