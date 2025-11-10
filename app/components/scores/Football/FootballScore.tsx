"use client"
import React, { useState } from 'react';
import ScoreSkeleton from '../../common/ScoreSkeleton';
import Accordion from '../../common/Accordion';

interface Team {
  name: string;
  shortName: string;
  logoUrl: string;
  score: string;
}

interface Match {
  eventId: string;
  startTime: number;
  stage: string;
  gameTime: string;
  round: string;
  homeTeam: Team;
  awayTeam: Team;
}



const FootballScore: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveFootballMatches = async (): Promise<void> => {
    console.log('click')
    const url = 'https://flashlive-sports.p.rapidapi.com/v1/events/live-list?locale=en_INT&sport_id=1&timezone=-4';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEY || '',
        'x-rapidapi-host': 'flashlive-sports.p.rapidapi.com'
      }
    };

    setLoading(true);
    setError(null)

      try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (result.status) {
        setMatches(result.data);
      } else {
        setError("No matches available");
      }
    } catch (err) {
      setError("Error fetching football matches");
    } finally {
      setLoading(false);
    }
  };

  return (
    
   <Accordion title='Football Score' onFetch={fetchLiveFootballMatches}>
      {/* {loading && <p className='text-xs text-gray-300'>Loading...</p>} */}
      {error && <p className='text-xs text-gray-300'>{error}</p>}
       {loading &&
          Array.from({ length: 4 }).map((_, i) => <ScoreSkeleton key={i} />)}
      {!loading &&
          matches.length > 0 && matches.map((match) => (
        <div key={match.eventId} className=" w-full border p-4 mb-4 rounded-xl border-gray-500" >
           
           <p className='text-xs'>Game Time: {match.gameTime}</p>
          <div className="flex items-center mb-2 justify-between">
            <div>
            <img src={match.homeTeam.logoUrl} alt={match.homeTeam.name} className="w-4 h-4 mr-2" />
            <span className='text-xs'>{match.homeTeam.shortName}</span>
            </div>
            <span className=" text-xs mx-2">vs</span>
           <div>
           <img src={match.awayTeam.logoUrl} alt={match.awayTeam.name} className="w-4 h-4 mr-2" />
           <span className='text-xs'>{match.awayTeam.shortName}</span>
           </div>
          </div>
          <div className='w-full flex justify-center '>
           

           <p className='text-xs '>{match.homeTeam.score} - {match.awayTeam.score}</p>
          </div>
          <p className='text-xs'>Stage: {match.stage}</p>
        </div>
      ))}
      
   </Accordion>
  );
};

export default FootballScore;

