import { Match } from "./types";

export const fetchLiveTennisMatches = async (): Promise<Match[]> => {
  const response = await fetch("/api/tennis");

  if (!response.ok) {
    throw new Error("Failed to fetch tennis matches");
  }

  const data: Match[] = await response.json();

  return data;
};