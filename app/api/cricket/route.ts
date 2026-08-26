import { NextResponse } from "next/server";

const CRICBUZZ_HOST = "cricbuzz-cricket.p.rapidapi.com";

export async function GET() {
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    console.error("RAPIDAPI_KEY is not set");

    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(
      `https://${CRICBUZZ_HOST}/matches/v1/live`,
      {
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": CRICBUZZ_HOST,
          "Content-Type": "application/json",
        },

        next: {
          revalidate: 60,
        },
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        {
          error: "Upstream error",
          status: res.status,
        },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Cricket score fetch failed:", error);

    return NextResponse.json(
      { error: "Failed to fetch cricket scores" },
      { status: 502 },
    );
  }
}