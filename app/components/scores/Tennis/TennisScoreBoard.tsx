import { Match } from "./types";

interface TennisScoreBoardProps {
  match: Match;
}

export const TennisScoreBoard = ({
  match,
}: TennisScoreBoardProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="font-bold text-sm">
        {match.homeScore} - {match.awayScore}
      </p>

      <p className="text-xs text-gray-400">
        {match.liveTime || match.stage}
      </p>
    </div>
  );
};