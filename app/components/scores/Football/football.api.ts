import { Match } from '../../types';

export const fetchFootballMatches = async (): Promise<Match[]> => {
  const response = await fetch("/api/football");

  if (!response.ok) {
    throw new Error("Failed to fetch football matches");
  }

  const data = await response.json();

  return data;
};