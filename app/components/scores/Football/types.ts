export interface RawTeam {
  team_id: string;
  event_participant_id: string;
  name: string;
  short_name: string;
  small_image_path: string;
  red_cards: number;
}

export interface RawMatchStatus {
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

export interface RawScores {
  home: number;
  away: number;
}

export interface RawMatch {
  match_id: string;
  match_status: RawMatchStatus;
  timestamp: number;
  home_team: RawTeam;
  away_team: RawTeam;
  scores: RawScores;
}

export interface RawTournament {
  tournament_id: string;
  tournament_url: string;
  name: string;
  country_name: string;
  image_path: string;
  matches: RawMatch[];
}