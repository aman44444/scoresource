import { Player } from "./types";

export const TennisPlayer: React.FC<{ player: Player }> = ({ player }) => {
   if (!player) {
    return (
      <div>
        <p className="text-xs text-gray-400">Unknown Player</p>
      </div>
    );
  }
  
    const flagUrl = player?.country?.alpha2
    ? `https://flagcdn.com/${player.country.alpha2.toLowerCase()}.svg`
    : "https://via.placeholder.com/32";

  return (
    <div>
      <img
        src={flagUrl}
        alt={`${player?.country?.name || "Unknown"} flag`}
        width={20}
        height={20}
        className="mr-2"
      />
      <p className="text-xs">{player?.name || "Unknown Player"}</p>
      <p className="text-xs">Rank: {player?.ranking || "N/A"}</p>
    </div>
  );
};
