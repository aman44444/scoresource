export interface RawEvent {
  EVENT_ID: string;
  START_TIME: number;
  STAGE: string;
  GAME_TIME: string;
  ROUND: string;
  HOME_NAME: string;
  SHORTNAME_HOME: string;
  HOME_IMAGES: string[];
  HOME_SCORE_CURRENT: string;
  AWAY_NAME: string;
  SHORTNAME_AWAY: string;
  AWAY_IMAGES: string[];
  AWAY_SCORE_CURRENT: string;
}

export interface RawTournament {
  EVENTS: RawEvent[];
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