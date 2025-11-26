import React from "react";
import Accordion from "../../common/Accordion";
import ScoreSkeleton from "../../common/ScoreSkeleton";
import { FootballMatchCard } from "./FootballMatchCard";
import {  Match} from "./types";
import { useFetch } from "../../hooks/useFetch";
import { fetchFootballMatches } from "./football.api";

const FootballScore: React.FC = () => {
  const { data: matches, loading, error, run } = useFetch<Match[]>(fetchFootballMatches, []);

  return (
    <Accordion title="Football Score" onFetch={run}>
      {error && <p className="text-xs text-gray-300">{error}</p>}
      {loading && Array.from({ length: 4 }).map((_, i) => <ScoreSkeleton key={i} />)}
      {!loading && matches.length > 0 && matches.map((match) => (
        <FootballMatchCard key={match.eventId} match={match} />
      ))}
    </Accordion>
  );
};

export default FootballScore;