import { adaptCricketMatches } from "./cricket.adapter";
import { MatchData, CricketRawResponse } from "./types";

export async function fetchCricketMatches(): Promise<MatchData[]> {
  const res = await fetch("/api/cricket");

  if (!res.ok) {
    const body = await res
      .json()
      .catch(() => ({} as { error?: string }));

    throw new Error(
      body?.error ?? `Request failed: ${res.status}`,
    );
  }

  const raw: CricketRawResponse = await res.json();

  return adaptCricketMatches(raw);
}