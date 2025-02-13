import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const lat = 54.7431;
    const lon = 55.9678;
    
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await axios.get(url);
    return NextResponse.json(response.data);
  } catch (error) {
    console.log("Error in getting pollution data", error);
    return new Response("Error fetching pollution data", { status: 500 });
  }
}