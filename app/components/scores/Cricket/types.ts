export interface CricketTeam {
  teamId: number;
  teamName: string;
  teamSName: string;
  imageId: number;
}

export interface CricketInnings {
  inningsId: number;
  runs: number;
  wickets: number;
  overs: number;
  isDeclared?: boolean;
  isFollowOn?: boolean;
}

export interface CricketTeamScore {
  [key: string]: CricketInnings | undefined;
}

export interface CricketMatchScore {
  team1Score?: CricketTeamScore;
  team2Score?: CricketTeamScore;
}

export interface CricketVenue {
  id: number;
  ground: string;
  city: string;
  timezone: string;
  latitude: string;
  longitude: string;
}

export interface CricketMatchInfo {
  matchId: number;
  seriesId: number;
  seriesName: string;
  matchDesc: string;
  matchFormat: string;
  startDate: string;
  endDate: string;
  state: string;
  status: string;

  team1: CricketTeam;
  team2: CricketTeam;

  venueInfo: CricketVenue;

  currBatTeamId: number;

  seriesStartDt: string;
  seriesEndDt: string;

  isTimeAnnounced: boolean;
  stateTitle: string;
  isFantasyEnabled?: boolean;
}

export interface CricketRawMatch {
  matchInfo: CricketMatchInfo;
  matchScore?: CricketMatchScore;
}

export interface CricketRawSeries {
  seriesId: number;
  seriesName: string;
  matches: CricketRawMatch[];
}

export interface CricketRawTypeMatch {
  matchType: string;
  seriesMatches: {
    seriesAdWrapper?: CricketRawSeries;
  }[];
}

export interface CricketRawResponse {
  typeMatches: CricketRawTypeMatch[];
}

export interface MatchData {
  id: number;

  seriesName: string;
  matchDesc: string;
  matchFormat: string;

  state: string;
  status: string;

  teamA: string;
  teamAShort: string;
  teamAImageId: number;

  teamB: string;
  teamBShort: string;
  teamBImageId: number;

  teamAScores: CricketInnings[];
  teamBScores: CricketInnings[];

  venue: string;
  city: string;
}