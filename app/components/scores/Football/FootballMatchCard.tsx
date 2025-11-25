import { Match } from "./types";
import { TeamScore } from "./TeamScore";


export const FootballMatchCard: React.FC<{ match: Match }> = ({ match }) => (
  <div className="w-full border p-4 mb-4 rounded-xl border-gray-500">
    <p className="text-xs">Game Time: {match.gameTime}</p>
    <div className="flex items-center justify-between mb-2">
      <TeamScore team={match.homeTeam} />
      <span className="text-xs mx-2">vs</span>
      <TeamScore team={match.awayTeam} />
    </div>
    <div className="w-full flex justify-center">
      <p className="text-xs">
        {match.homeTeam.score} - {match.awayTeam.score}
      </p>
    </div>
    <p className="text-xs">Stage: {match.stage}</p>
  </div>
);