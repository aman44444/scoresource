import {
  CricketRawResponse,
  MatchData,
  CricketInnings,
} from "./types";

function isCricketInnings(
  value: CricketInnings | undefined,
): value is CricketInnings {
  return value !== undefined;
}

export function adaptCricketMatches(
  raw: CricketRawResponse,
): MatchData[] {
  const matches: MatchData[] = [];

  for (const typeMatch of raw.typeMatches ?? []) {
    for (const seriesMatch of typeMatch.seriesMatches ?? []) {
      const series = seriesMatch.seriesAdWrapper;

      if (!series) continue;

      for (const match of series.matches ?? []) {
        const info = match.matchInfo;

        const teamAScores = Object.values(
          match.matchScore?.team1Score ?? {},
        ).filter(isCricketInnings);

        const teamBScores = Object.values(
          match.matchScore?.team2Score ?? {},
        ).filter(isCricketInnings);

        matches.push({
          id: info.matchId,

          seriesName: info.seriesName,
          matchDesc: info.matchDesc,
          matchFormat: info.matchFormat,

          state: info.state,
          status: info.status,

          teamA: info.team1.teamName,
          teamAShort: info.team1.teamSName,
          teamAImageId: info.team1.imageId,

          teamB: info.team2.teamName,
          teamBShort: info.team2.teamSName,
          teamBImageId: info.team2.imageId,

          teamAScores,
          teamBScores,

          venue: info.venueInfo.ground,
          city: info.venueInfo.city,
        });
      }
    }
  }

  return matches;
}