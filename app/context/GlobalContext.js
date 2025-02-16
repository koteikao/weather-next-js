"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});


  // forecast
  const fetchForecast = async () => {
    try {
      const response = await axios.get("/api/weather");
      setForecast(response.data);
    } catch (error) {
    }
  }

  // air quality
  const fetchAirQuality = async () => {
    try {
      const response = await axios.get("/api/pollution");
      setAirQuality(response.data);
    } catch (error) {
    }
  }

  // five day forecast
  const fetchFiveDayForecast = async () => {
    try {
      const response = await axios.get("/api/fiveday");
      setFiveDayForecast(response.data);
    } catch (error) {
      console.log("Error fetching five day forecast data", error.message);
    }
  }

  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
    fetchFiveDayForecast();
  }, []);

  return (
    <GlobalContext.Provider value={{ forecast, airQuality, fiveDayForecast }}>
      <GlobalContextUpdate.Provider value={setForecast}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext)
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate)
