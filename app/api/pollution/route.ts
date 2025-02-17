import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const searchParams = request.nextUrl.searchParams;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=ru`;
    const response = await axios.get(url);
    return NextResponse.json(response.data);
  } catch (error) {
    console.log("Error in getting pollution data", error);
    return new Response("Error fetching pollution data", { status: 500 });
  }
}