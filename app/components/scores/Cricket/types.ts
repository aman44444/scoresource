export interface Team {
  name: string;
  shortName: string;
  imageUrl: string; 
}

export interface MatchData {
  venue: string;
  match_status: string;
  series: string;
  toss: string;
  match_id :string;
  match_time: string;
  match_type: string;
  team_a: string; 
  team_b: string; 
  team_a_short: string;
  team_b_short: string;
  team_a_img: string; 
  team_b_img: string; 
  team_a_scores: string; // Team A score
  team_b_scores: string; // Team B score
  team_a_scores_over?: { over: string; score: string }[]; // Team A innings details
  team_b_scores_over?: { over: string; score: string }[]; // Team B innings details
}