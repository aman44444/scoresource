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

interface RawEvent {
  EVENT_ID: string;
  START_TIME: number;
  STAGE: string;
  GAME_TIME: string;
  ROUND: string;
  HOME_NAME: string;
  SHORTNAME_HOME: string;
  HOME_IMAGES: string[];
  HOME_SCORE_CURRENT: string;
  AWAY_NAME: string;
  SHORTNAME_AWAY: string;
  AWAY_IMAGES: string[];
  AWAY_SCORE_CURRENT: string;
}

interface RawTournament {
  EVENTS: RawEvent[];
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
      const data = await response.json();

      console.log('RAW RESPONSE:', data);

      if (!data || !Array.isArray(data.DATA)) {
        setError('No live matches available');
        return;
      }

      const parsedMatches: Match[] = data.DATA.flatMap(
        (tournament: RawTournament) =>
          (tournament.EVENTS || []).map((event) => ({
            eventId: event.EVENT_ID,
            startTime: event.START_TIME,
            stage: event.STAGE,
            gameTime: event.GAME_TIME,
            round: event.ROUND,

            homeTeam: {
              name: event.HOME_NAME,
              shortName: event.SHORTNAME_HOME,
              logoUrl: event.HOME_IMAGES?.[0] || '/team-placeholder.svg',
              score: String(event.HOME_SCORE_CURRENT ?? '0'),
            },

            awayTeam: {
              name: event.AWAY_NAME,
              shortName: event.SHORTNAME_AWAY,
              logoUrl: event.AWAY_IMAGES?.[0] || '/team-placeholder.svg',
              score: String(event.AWAY_SCORE_CURRENT ?? '0'),
            },
          }))
      );

      setMatches(parsedMatches);
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
            <img src={match.homeTeam.logoUrl || "/team-placeholder.svg"} alt={match.homeTeam.name} className="w-4 h-4 mr-2" />
            <span className='text-xs'>{match.homeTeam.shortName}</span>
            </div>
            <span className=" text-xs mx-2">vs</span>
           <div>
           <img src={match.awayTeam.logoUrl || "/team-placeholder.svg"} alt={match.awayTeam.name} className="w-4 h-4 mr-2" />
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

