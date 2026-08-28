import { MatchData } from "./types";

interface CricketMatchCardProps {
  match: MatchData;
}

const CricketMatchCard = ({
  match,
}: CricketMatchCardProps) => {
  const teamAInnings = match.teamAScores[0];
  const teamBInnings = match.teamBScores[0];

  return (
    <div className="border p-3 mb-4 rounded-xl bg-black text-white border-gray-500">
      <div className="mb-2">
        <p className="text-xs text-gray-400">
          {match.seriesName}
        </p>

        <p className="text-xs text-gray-500">
          {match.matchDesc} · {match.matchFormat}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs">
            {match.teamAShort}
          </span>

          {teamAInnings && (
            <span className="text-sm font-semibold">
              {teamAInnings.runs}/{teamAInnings.wickets}
              {" "}
              ({teamAInnings.overs})
            </span>
          )}
        </div>

        <span className="text-xs text-gray-500">
          vs
        </span>

        <div className="flex items-center gap-2">
          {teamBInnings && (
            <span className="text-sm font-semibold">
              {teamBInnings.runs}/{teamBInnings.wickets}
              {" "}
              ({teamBInnings.overs})
            </span>
          )}

          <span className="text-xs">
            {match.teamBShort}
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        {match.status}
      </p>

      <p className="text-xs text-gray-600 mt-1">
        {match.venue}, {match.city}
      </p>
    </div>
  );
};

export default CricketMatchCard;