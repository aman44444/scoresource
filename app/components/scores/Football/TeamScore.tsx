import { Team } from "./types";

export const TeamScore: React.FC<{ team: Team }> = ({ team }) => (
  <div className="flex items-center">
    <img
      src={team.logoUrl || "/team-placeholder.svg"}
      alt={team.name}
      className="w-4 h-4 mr-2"
    />
    <span className="text-xs">{team.shortName}</span>
  </div>
);
