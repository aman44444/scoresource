"use client";

import Accordion from "../../common/Accordion";
import ScoreSkeleton from "../../common/ScoreSkeleton";

import { useFetch } from "../../hooks/useFetch";

import { fetchLiveTennisMatches } from "./tennis.api";
import { Match } from "./types";
import { TennisMatchCard } from "./TennisMatchCard";

const TennisScore: React.FC = () => {
  const {
    loading,
    run,
    data: matches,
    error,
  } = useFetch<Match[]>(fetchLiveTennisMatches, []);

  return (
    <Accordion
      title="Tennis Matches"
      onFetch={run}
    >
      {error && (
        <p className="text-xs text-gray-300">
          {error}
        </p>
      )}

      {loading &&
        Array.from({ length: 4 }).map((_, index) => (
          <ScoreSkeleton key={index} />
        ))}

      {!loading &&
        matches.length > 0 &&
        matches.map((match) => (
          <TennisMatchCard
            key={match.matchId}
            match={match}
          />
        ))}

      {!loading &&
        !error &&
        matches.length === 0 && (
          <p className="text-xs text-gray-400">
            No live tennis matches.
          </p>
        )}
    </Accordion>
  );
};

export default TennisScore;