import { NextResponse } from "next/server";

const NEWS_API_HOST = "news-api14.p.rapidapi.com";

export async function GET() {
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    console.error("RAPIDAPI_KEY is not set");

    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }
  
  try {
    const date = new Date().toISOString().split("T")[0];

    const res = await fetch(
    `https://${NEWS_API_HOST}/v2/trendings?date=${date}&topic=Sports&language=en&page=1&pageSize=50`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": NEWS_API_HOST,
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 60 * 30,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        {
          error: "Upstream error",
          status: res.status,
        },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Trending news fetch failed:", error);

    return NextResponse.json(
      { error: "Failed to fetch trending news" },
      { status: 502 }
    );
  }
}