export interface Player {
  name: string;
  shortName: string;
  ranking: number;
  country: { name: string; alpha2?: string };
  currentScore?: number;
  point?: string;
}

export interface Match {
  tournament?: { name?: string; category?: { name?: string } };
  roundInfo?: { round?: number; name?: string };
  homeTeam?: Player;
  awayTeam?: Player;
  homeScore?: { display: string; point: string };
  awayScore?: { display: string; point: string };
  status?: { description?: string };
  id: number;
  eventId: number;
}

