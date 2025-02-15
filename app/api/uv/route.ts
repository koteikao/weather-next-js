import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const lat = 54.7431;
    const lon = 55.9678;
  } catch (error) {
    console.log("Error in getting uv data", error);
    return new Response("Error fetching uv data", { status: 500 });
  }
}
