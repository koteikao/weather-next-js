"use client";

import Navbar from "./Components/Navbar";
import Temperature from "./Components/Temperature/Temperature";
import FiveDayForecast from "./Components/FiveDayForecast/FiveDayForecast";
import AirPollution from "./Components/AirPollution/AirPollution";
import Sunset from "./Components/Sunset/Sunset";
import Wind from "./Components/Wind/Wind";
import DailyForecast from "./Components/DailyForecast/DailyForecast";
import FeelsLike from "./Components/FeelsLike/FeelsLike";
import Humidity from "./Components/Humidity/Humidity";
import Visibility from "./Components/Visibility/Visibility";
import Pressure from "./Components/Pressure/Pressure";
import MapBox from "./Components/MapBox/MapBox";
import DefaultCities from "./utils/defaultCities";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "./context/GlobalContext";

export default function Home() {
  const { setActiveCityCoords, setGeoCodedList } = useGlobalContextUpdate();

  const updateGeoCodedListActiveCity = (
    index: number,
    city: { local_names: { ru: string }; lat: number; lon: number }
  ) => {
    setGeoCodedList([
      {
        id: index,
        local_names: {
          ru: city.local_names.ru,
        },
      },
    ]);
    setActiveCityCoords([city.lat, city.lon]);
  };
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className="flex flex-col w-full gap-16">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 md-2:grid-cols-4 ">
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="mapbox-con mt-4 flex gap-4">
            <MapBox />
            <div className="states flex flex-col gap-3 flex-1">
              <h2 className="flex items-center gap-2 font-medium">
                Популярные города
              </h2>
              <div className="flex flex-col gap-4">
                {DefaultCities.map((city, index) => {
                  return (
                    <div
                      key={index}
                      className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none"
                      onClick={() => {
                        updateGeoCodedListActiveCity(index, city);
                      }}
                    >
                      <p className="px-6 py-4">{city.local_names.ru}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
