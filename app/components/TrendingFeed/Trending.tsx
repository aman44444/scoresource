"use client";

import React, { useEffect, useState } from "react";
import TrendingSection from "./TrendingSection";
import {
  soccerPlayers,
  cricketPlayers,
  tennisPlayers,
} from "../../utils/player";
import { TrendingPlayer, Article } from "../types";
import { extractTrending } from "@/utils/trending";


const SPORTS_TOPICS = [
  {
    name: "Football",
    players: soccerPlayers,
    color: "blue-400/20",
    textColor: "text-blue-300",
  },
  {
    name: "Cricket",
    players: cricketPlayers,
    color: "green-400/20",
    textColor: "text-green-300",
  },
  {
    name: "Tennis",
    players: tennisPlayers,
    color: "red-400/20",
    textColor: "text-red-300",
  },
];


const TrendingFeed: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [trendingData, setTrendingData] = useState<
    Record<string, TrendingPlayer[]>
  >({});

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);

      try {
        const response = await fetch("/api/trending");

        if (!response.ok) {
          throw new Error(`Trending request failed: ${response.status}`);
        }

        const data = await response.json();

        console.log("Trending API response:", data);

        const articles: Article[] = (data.data ?? []).map(
          (item: {
            title: string;
            excerpt?: string;
          }) => ({
            title: item.title,
            excerpt: item.excerpt ?? "",
          })
        );

        console.log("Trending articles:", articles);

        const trending: Record<string, TrendingPlayer[]> = {};

        SPORTS_TOPICS.forEach((topic) => {
          trending[topic.name] = extractTrending(
            articles,
            topic.players
          );
        });

        console.log("Trending players:", trending);

        setTrendingData(trending);
      } catch (error) {
        console.error("Trending fetch failed:", error);
        setTrendingData({});
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="container mx-auto p-2 pl-3 rounded-md h-full">
      <p className="text-base text-center text-gray-500 border-b border-gray-500 mb-4 p-4">
        Trending
      </p>

      {SPORTS_TOPICS.map((topic) => (
        <TrendingSection
          key={topic.name}
          topic={topic.name}
          players={trendingData[topic.name] || []}
          color={topic.color}
          textColor={topic.textColor}
          loading={loading}
        />
      ))}
    </div>
  );
};

export default TrendingFeed;