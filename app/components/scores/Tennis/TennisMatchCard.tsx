import { Match } from "./types";
import { TennisPlayer } from "./TennisPlayer";
import { TennisScoreBoard } from "./TennisScoreBoard";

interface TennisMatchCardProps {
  match: Match;
}

export const TennisMatchCard = ({
  match,
}: TennisMatchCardProps) => {
  return (
    <div className="w-full border p-3 mb-4 rounded-xl border-gray-500">
      <div className="mb-3">
        <h2 className="text-sm font-bold">
          {match.tournament}
        </h2>

        <p className="text-xs text-gray-400">
          {match.country || "Unknown"} · {match.stage}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <TennisPlayer player={match.homeTeam} />

        <TennisScoreBoard match={match} />

        <TennisPlayer player={match.awayTeam} />
      </div>
    </div>
  );
};