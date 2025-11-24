"use client"
import Accordion from "../../common/Accordion";
import ScoreSkeleton from "../../common/ScoreSkeleton";
import { fetchCricketMatches} from "./cricket.api";
import { useFetch} from "../../hooks/useFetch";
import { MatchData } from "./types";


const CricketScore = () => {
  const {
    data : matches,
    loading,
    error,
    run,
  }  = useFetch<MatchData[]>(fetchCricketMatches,[])

  return(
       <Accordion title='Cricket Score' onFetch={run}>
      {error && <p className='text-xs text-gray-300'>{error}</p>}
   
      
      {loading &&
          Array.from({ length: 4 }).map((_, i) => <ScoreSkeleton key={i}/>)}
        {matches.length > 0 &&
          matches.map((matchData, index) => (
             
            <div
            key={index} 
            className=" border p-2 mb-4 rounded-xl bg-black bg-opacity-500 text-white border-gray-500" >    
           
            <div className="flex items-center mb-2 justify-between">
               <div className='flex'>
               <img
                src={matchData.team_a_img} 
                alt={`${matchData.team_a} flag`}
                width={20}
                height={20}
                className="mr-2 rounded-full"
              />
              <span className='text-xs'>{matchData.team_a_short}</span>
               </div>
              <span className="text-xs mx-2">vs</span>
                 <div className='flex'> 
                 <img
                src={matchData.team_b_img} 
                alt={`${matchData.team_b} flag`}
                width={20}
                height={20}
                className="mr-2  rounded-full"
                 />
                 <span className='text-xs'> {matchData.team_b_short}</span>
                 </div>
            </div>

            <div className="mt-2 flex justify-between text-xs w-full ">
              <p>
                {matchData.team_a_scores} 
                {matchData.team_a_scores_over?.length ? ` (${matchData.team_a_scores_over[0].over})` : ''}
              </p>
              <p>
                {matchData.team_b_scores} 
                {matchData.team_b_scores_over?.length ? ` (${matchData.team_b_scores_over[0].over})` : ''}
              </p>
            </div>
            <p className='text-xs text-gray-500'> {matchData.toss}</p>
          </div>
         
          ))
         }
  </Accordion>  
  )
}

export default CricketScore;