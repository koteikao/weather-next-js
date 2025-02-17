"use client";

import { useGlobalContext } from "@/app/context/GlobalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { wind } from "@/app/utils/icons";
import Image from "next/image";
export default function Wind() {
  const { forecast } = useGlobalContext();
  const windSpeed = forecast?.wind?.speed;
  const windDirection = forecast?.wind?.deg;

  if (!windSpeed || !windDirection) {
    return <Skeleton className="w-full h-[12rem]" />;
  }
  return (
    <div
      className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex 
      flex-col gap-3 dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <h2 className="flex items-center gap-2 font-medium">{wind} Ветер</h2>

      <div className="compass relative flex items-center justify-center">
        <div className="image relative grid place-items-center">
          {" "}
          {/* Добавляем grid и place-items-center */}
          <Image
            src="/compass_body.svg"
            alt="compass"
            width={110}
            height={110}
          />
          <Image
            src="/compass_arrow.svg"
            alt="compass"
            className="transition-all duration-500 ease-in-out dark:invert"
            style={{
              transform: `rotate(${windDirection}deg)`, // Убираем translateX
              height: "100%",
              position: "absolute", // Возвращаем absolute
            }}
            width={11}
            height={11}
          />
        </div>
        <p
          className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-xs
              dark:text-white font-medium"
        >
          {Math.round(windSpeed)} m/s
        </p>
      </div>
    </div>
  );
}
