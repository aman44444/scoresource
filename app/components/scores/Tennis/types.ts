export interface RawTennisTeam {
  team_id: string;
  event_participant_id: string;
  name: string;
  short_name: string;
  small_image_path: string;
}

export interface RawTennisMatchStatus {
  stage: string;
  is_cancelled: boolean;
  is_postponed: boolean;
  is_started: boolean;
  is_in_progress: boolean;
  is_finished: boolean;
  is_finished_after_extra_time: boolean;
  is_finished_after_penalties: boolean;
  live_time: string | null;
  live_minute: number | null;
  winner: string | null;
  final_winner: string | null;
}

export interface RawTennisScores {
  home: number;
  away: number;
}

export interface RawTennisMatch {
  match_id: string;
  match_status: RawTennisMatchStatus;
  timestamp: number;
  home_team: RawTennisTeam;
  away_team: RawTennisTeam;
  scores: RawTennisScores;
}

export interface RawTennisTournament {
  tournament_id: string;
  tournament_url: string;
  name: string;
  country_name: string | null;
  image_path: string;
  matches: RawTennisMatch[];
}

/*
 * Types used by our UI
 */

export interface TennisPlayer {
  name: string;
  shortName: string;
  logoUrl: string;
}

export interface Match {
  matchId: string;
  timestamp: number;

  tournament: string;
  country: string | null;

  stage: string;
  liveTime: string | null;

  homeTeam: TennisPlayer;
  awayTeam: TennisPlayer;

  homeScore: number;
  awayScore: number;
}