"use client";

import Accordion from "../../common/Accordion";
import ScoreSkeleton from "../../common/ScoreSkeleton";
import CricketMatchCard from "./CricketMatchCard";
import { useCricketScore } from "@/hooks/useCricketScore";

const CricketScore = () => {
  const {
    data: matches = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useCricketScore(false);

  return (
    <Accordion
      title="Cricket Score"
      onFetch={() => refetch()}
    >
      {isError && (
        <p className="text-xs text-gray-300">
          {error instanceof Error
            ? error.message
            : "Failed to load cricket scores"}
        </p>
      )}

      {isLoading &&
        Array.from({ length: 4 }).map((_, index) => (
          <ScoreSkeleton key={index} />
        ))}

      {!isLoading && matches.length === 0 && (
        <p className="text-xs text-gray-500">
          No live cricket matches.
        </p>
      )}

      {!isLoading &&
        matches.map((match) => (
          <CricketMatchCard
            key={match.id}
            match={match}
          />
        ))}

      {isFetching && !isLoading && (
        <p className="text-xs text-gray-500">
          Updating scores...
        </p>
      )}
    </Accordion>
  );
};

export default CricketScore;