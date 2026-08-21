// types.ts

export interface Article {
  title: string;
  excerpt: string;
}

export interface TrendingPlayer {
  name: string;
  reason: string;
}

export interface Team {
  name: string;
  shortName: string;
  logoUrl: string;
  score: string;
}

export interface Match {
  eventId: string;
  startTime: number;
  stage: string;
  gameTime: string;
  round: string;
  homeTeam: Team;
  awayTeam: Team;
}