"use client" 

import Accordion from "../../common/Accordion";
import ScoreSkeleton from "../../common/ScoreSkeleton";
import { fetchLiveTennisMatches} from "./tennis.api";
import { useFetch} from "../../hooks/useFetch";
import { Match } from "./types";
import { TennisMatchCard } from "./TennisMatchCard";

const TennisScore : React.FC = () => {
  const {loading, run ,data: matches,error} = useFetch<Match[]>(fetchLiveTennisMatches,[])
  return (
     <Accordion  title="Tennis Matches" onFetch={run}>
         
       {error && <p className='text-xs text-gray-300'>{error}</p>}

        {loading &&
         Array.from({ length: 4 }).map((_, i) => <ScoreSkeleton key={i} />)}
         {!loading &&
        matches.map((match) => (
          <TennisMatchCard key={match.id ?? match.eventId} match={match} />
        ))}

     </Accordion>
  )
}

export default TennisScore;