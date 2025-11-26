import { RawEvent,RawTournament } from "./types";
export const fetchFootballMatches = async () => {
  const url =
    "https://flashlive-sports.p.rapidapi.com/v1/events/live-list?locale=en_INT&sport_id=1&timezone=-4";

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY || "",
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  if (!data || !Array.isArray(data.DATA)) {
    throw new Error("No live matches available");
  }

  const parsedMatches = data.DATA.flatMap((tournament: RawTournament) =>
    (tournament.EVENTS || []).map((event: RawEvent) => ({
      eventId: event.EVENT_ID,
      startTime: event.START_TIME,
      stage: event.STAGE,
      gameTime: event.GAME_TIME,
      round: event.ROUND,
      homeTeam: {
        name: event.HOME_NAME,
        shortName: event.SHORTNAME_HOME,
        logoUrl: event.HOME_IMAGES?.[0] || "/team-placeholder.svg",
        score: String(event.HOME_SCORE_CURRENT ?? "0"),
      },
      awayTeam: {
        name: event.AWAY_NAME,
        shortName: event.SHORTNAME_AWAY,
        logoUrl: event.AWAY_IMAGES?.[0] || "/team-placeholder.svg",
        score: String(event.AWAY_SCORE_CURRENT ?? "0"),
      },
    }))
  );

  return parsedMatches;
};
