"use client";

import { useGlobalContext } from "@/app/context/GlobalContext";
import { Skeleton } from "@/components/ui/skeleton";
export default function Humidity() {
  const { forecast } = useGlobalContext();
  if (!forecast?.main?.humidity || !forecast || !forecast?.main) {
    return <Skeleton className="w-full h-[12rem]" />;
  }
  return (
    <div
      className="col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2 pt-6 px-4 h-[12rem] 
    border rounded-lg flex flex-col gap-8 dark:bg-dark-gray shadow-sm dark:shadow-none"
    ></div>
  );
}
