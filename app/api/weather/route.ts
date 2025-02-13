import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export async function GET(request: NextRequest) {

  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const lat = 44.34;
    const lon = 10.99;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await axios.get(url);
    return NextResponse.json(response.data);
  } catch (error) {
    console.log("Error fetching forecast data", error);
    return new Response("Error fetching forecast data", { status: 500 });
  }
}
