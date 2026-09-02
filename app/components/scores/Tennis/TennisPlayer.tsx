import { TennisPlayer as TennisPlayerType } from "./types";

interface TennisPlayerProps {
  player: TennisPlayerType;
}

export const TennisPlayer = ({ player }: TennisPlayerProps) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={player.logoUrl || "/team-placeholder.svg"}
        alt=""
        width={32}
        height={32}
        className="w-6 h-6 mb-1"
      />

      <p className="text-xs text-center">
        {player.name}
      </p>

      <p className="text-xs text-gray-400">
        {player.shortName}
      </p>
    </div>
  );
};