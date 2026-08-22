import { NextResponse } from "next/server";
import { RawTennisTournament } from "../../components/scores/Tennis/types";

const FLASHSCORE_HOST = "flashscore4.p.rapidapi.com";

export async function GET() {
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  try {
    const url =
      `https://${FLASHSCORE_HOST}` +
      `/api/flashscore/v2/matches/live` +
      `?sport_id=2&timezone=Europe/Berlin`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": FLASHSCORE_HOST,
      },

      /*
       * Cache the response on the server.
       *
       * This is important because we don't want
       * every browser request to hit RapidAPI.
       */
      next: {
        revalidate: 60 * 60 * 2,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Flashscore API error",
          status: response.status,
        },
        { status: response.status }
      );
    }

    const data: RawTennisTournament[] = await response.json();

    const matches = data.flatMap((tournament) =>
      tournament.matches.map((match) => ({
        matchId: match.match_id,

        timestamp: match.timestamp,

        tournament: tournament.name,

        country: tournament.country_name,

        stage: match.match_status.stage,

        liveTime: match.match_status.live_time,

        homeTeam: {
          name: match.home_team.name,
          shortName: match.home_team.short_name,
          logoUrl: match.home_team.small_image_path,
        },

        awayTeam: {
          name: match.away_team.name,
          shortName: match.away_team.short_name,
          logoUrl: match.away_team.small_image_path,
        },

        homeScore: match.scores.home,

        awayScore: match.scores.away,
      }))
    );

    return NextResponse.json(matches);
  } catch (error) {
    console.error("Tennis API error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch tennis matches",
      },
      { status: 502 }
    );
  }
}