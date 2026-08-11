import { NextResponse } from "next/server";

const CRICBUZZ_HOST = "cricbuzz-cricket2.p.rapidapi.com";

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
    const res = await fetch(`https://${CRICBUZZ_HOST}/news/v1/index`, {
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": CRICBUZZ_HOST,
      },
      next: { revalidate: 60 * 60 * 4 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Upstream error", status: res.status },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Cricket news fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch cricket news" },
      { status: 502 }
    );
  }
}