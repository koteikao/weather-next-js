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
    if (pressure < 1000) return "Очень низкое давление";
    if (pressure >= 1000 && pressure < 1015) return "Низкое давление";
    if (pressure >= 1015 && pressure < 1025) return "Нормальное давление";
    if (pressure >= 1025 && pressure < 1040) return "Высокое давление";
    if (pressure >= 1040) return "Очень высокое давление";
    return "Данные о давлении не доступны";
  };

  return (
    <div
      className="pt-6 px-4 h-[12rem] 
    border rounded-lg flex flex-col gap-8 dark:bg-dark-gray shadow-sm dark:shadow-none"
    >
      <div className="top">
        <h2 className="flex items-center gap-2 font-md">{gauge}Давление</h2>
        <p className="pt-2 text-2xl">{pressure}hPa</p>
      </div>
      <p className="text-sm">{getPressureDescription(pressure)}</p>
    </div>
  );
}
