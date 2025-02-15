"use client";

import { useGlobalContext } from "@/app/context/GlobalContext";
import { eye } from "@/app/utils/icons";
import { Skeleton } from "@/components/ui/skeleton";

export default function Visibility() {
  const { forecast } = useGlobalContext();
  if (!forecast?.visibility || !forecast) {
    return <Skeleton className="w-full h-[12rem]" />;
  }
  const { visibility } = forecast;

  const getVisibilityDescription = (visibility: number) => {
    const visibilityInKm = Math.round(visibility / 1000);
    if (visibilityInKm > 10) {
      return "Good visibility";
    } else if (visibilityInKm > 5) {
      return "Moderate visibility";
    } else if (visibilityInKm > 2) {
      return "Low visibility";
    } else if (visibilityInKm <= 2) {
      return "Very low visibility";
    } else {
      return "Visibility data not available";
    }
  };
  return (
    <div
      className="col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2 pt-6 px-4 h-[12rem] 
    border rounded-lg flex flex-col gap-8 dark:bg-dark-gray shadow-sm dark:shadow-none"
    >
      <div className="top">
        <h2 className="flex items-center gap-2 font-md">{eye}Visibility</h2>
        <p className="pt-2 text-2xl">{Math.round(visibility / 1000)}km</p>
      </div>
      <p className="text-sm">{getVisibilityDescription(visibility)}</p>
    </div>
  );
}
