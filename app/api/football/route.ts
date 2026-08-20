import { NextResponse } from "next/server";
import { RawTournament } from "../../components/scores/Football/types";
import { Match } from "@/components/types";

const FLASHSCORE_URL =
  "https://flashscore4.p.rapidapi.com/api/flashscore/v2/matches/live?sport_id=1&timezone=Europe%2FBerlin";

const CACHE_TIME = 60 * 60 * 6; // 6 hours

export async function GET() {
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(FLASHSCORE_URL, {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "flashscore4.p.rapidapi.com",
      },
      next: {
        revalidate: CACHE_TIME,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Football API request failed",
          status: response.status,
        },
        { status: response.status }
      );
    }

    const data: RawTournament[] = await response.json();

    const matches: Match[] = data.flatMap((tournament) =>
      (tournament.matches ?? []).map((event) => ({
        eventId: event.match_id,
        startTime: event.timestamp,
        stage: event.match_status.stage,
        gameTime: event.match_status.live_time ?? "",
        round: "",
        homeTeam: {
          name: event.home_team.name,
          shortName: event.home_team.short_name,
          logoUrl:
            event.home_team.small_image_path || "/team-placeholder.svg",
          score: String(event.scores?.home ?? 0),
        },
        awayTeam: {
          name: event.away_team.name,
          shortName: event.away_team.short_name,
          logoUrl:
            event.away_team.small_image_path || "/team-placeholder.svg",
          score: String(event.scores?.away ?? 0),
        },
      }))
    );

    return NextResponse.json(matches);
  } catch (error) {
    console.error("Football API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch football matches" },
      { status: 502 }
    );
  }
}