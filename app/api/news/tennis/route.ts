import { NextResponse } from "next/server";

const ALLSCORES_HOST = "allscores.p.rapidapi.com";

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
    const res = await fetch(
      "https://allscores.p.rapidapi.com/api/allscores/news?sport=3&timezone=America%2FChicago&langId=1",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": ALLSCORES_HOST,
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 60 * 60 * 4,
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
    console.error("Tennis news fetch failed:", error);

    return NextResponse.json(
      { error: "Failed to fetch tennis news" },
      { status: 502 }
    );
  }
}