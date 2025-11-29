import { Match } from "./types";
import { TennisPlayer } from "./TennisPlayer";
import { TennisScoreBoard } from "./TennisScoreBoard";

export const TennisMatchCard: React.FC<{ match: Match }> = ({ match }) => {
  return (
    <div className="w-full border p-2 mb-4 rounded-xl border-gray-500">
      <h2 className="text-sm lg:text-xl font-bold">
        {match.tournament?.name || "Unknown Tournament"}
      </h2>

      <p className="text-xs mb-2">
        {match.tournament?.category?.name || "Unknown Category"} –{" "}
        {match.roundInfo?.name || "Unknown Round"}
      </p>

      <div className="flex justify-between items-center">
         {match.homeTeam && <TennisPlayer player={match.homeTeam} />}
        <TennisScoreBoard match={match} />
         {match.awayTeam && <TennisPlayer player={match.awayTeam} />}
      </div>
    </div>
  );
};
