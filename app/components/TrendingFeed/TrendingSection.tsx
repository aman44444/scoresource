"use client";

import React from "react";
import PlayerItem from "./PlayerItem";
import { TrendingPlayer } from "../types";

interface TrendingSectionProps {
  topic: string;
  players: TrendingPlayer[];
  color: string;
  textColor: string;
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ topic, players, color, textColor }) => (
  <div className="mb-4 border border-gray-500 rounded-md p-3">
    <div className={`p-2 rounded-md bg-${color}`}>
      <p className={`text-xs sm:text-sm ${textColor}`}>Trending in {topic}</p>
    </div>

    <div className="ml-4 mr-4">
      <ul>
        {players.map(player => (
          <PlayerItem key={player.name} player={player} />
        ))}
      </ul>
    </div>
  </div>
);

export default TrendingSection;
