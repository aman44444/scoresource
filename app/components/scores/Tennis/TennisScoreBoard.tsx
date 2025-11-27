import { Match } from "./types";

export const TennisScoreBoard: React.FC<{ match: Match }> = ({ match }) => {
  const homeScore = match.homeScore?.display || "0";
  const awayScore = match.awayScore?.display || "0";
  const homePoint = match.homeScore?.point || "0";
  const awayPoint = match.awayScore?.point || "0";

  return (
    <div className="flex flex-col text-center">
      <p className="font-bold text-xs">
        {homeScore} - {awayScore}
      </p>
      <p className="text-xs">
        Points: {homePoint} - {awayPoint}
      </p>
      <p className="text-xs">
        Status: {match.status?.description || "Unknown"}
      </p>
    </div>
  );
};
