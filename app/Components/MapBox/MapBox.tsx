"use client";
import React, { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function MapBox() {
  const { forecast } = useGlobalContext();
  const activeCityCords = forecast?.coord;

  // Если данные не загружены, показываем скелетон
  if (!activeCityCords || !forecast || !forecast.coord) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const zoom = 10;

  maptilersdk.config.apiKey = "x5vrNZuEZuRYtsER280n";

  // Инициализация карты
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [activeCityCords.lon, activeCityCords.lat],
      zoom: zoom,
    });

    // Очистка при размонтировании
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []); // Пустой массив зависимостей, чтобы карта инициализировалась только один раз

  // Обновление центра карты при изменении activeCityCords
  useEffect(() => {
    if (!map.current) return;

    map.current.flyTo({
      center: [activeCityCords.lon, activeCityCords.lat],
      zoom: zoom,
    });
  }, [activeCityCords]); // Зависимость от activeCityCords

  return (
    <div className="flex-1 basis-[50%] border rounded-lg">
      <div
        ref={mapContainer}
        className="map-container"
        style={{ width: "100%", height: "400px" }}
      ></div>
    </div>
  );
}
