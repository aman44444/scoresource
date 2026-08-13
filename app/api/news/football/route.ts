import { NextResponse } from "next/server";

const FOOTBALL_NEWS_HOST = "football-news11.p.rapidapi.com";

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
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
    }).format(new Date());

    const url =
      `https://${FOOTBALL_NEWS_HOST}/api/news-by-date?date=${today}&lang=en&page=1`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": FOOTBALL_NEWS_HOST,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60 * 60 * 4,
      },
    });

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
    console.error("Football news fetch failed:", error);

    return NextResponse.json(
      { error: "Failed to fetch football news" },
      { status: 502 }
    );
  }
}