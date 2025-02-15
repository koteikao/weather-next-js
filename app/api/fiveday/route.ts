import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const lat = 54.7431;
  const lon = 55.9678;
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await fetch(url, {
      next: {
        revalidate: 3600,
      },
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error in getting five day forecast data", error);
    return new Response("Error fetching five day forecast data", { status: 500 });
  }
}
