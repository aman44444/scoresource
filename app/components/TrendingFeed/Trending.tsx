"use client";

import React, { useState, useEffect } from "react";
import TrendingSection from "./TrendingSection";
import { soccerPlayers, cricketPlayers, tennisPlayers } from "../../utils/player";
import { TrendingPlayer, Article } from "../types";

const SPORTS_TOPICS = [
  { name: "Football", players: soccerPlayers, color: "blue-400/20", textColor: "text-blue-300" },
  { name: "Cricket", players: cricketPlayers, color: "green-400/20", textColor: "text-green-300" },
  { name: "Tennis", players: tennisPlayers, color: "red-400/20", textColor: "text-red-300" },
];

const extractTrending = (articles: Article[], playerList: string[]): TrendingPlayer[] => {
  const playerMap: Record<string, string[]> = {};

  articles.forEach(article => {
    playerList.forEach(player => {
      const regex = new RegExp(`\\b${player}\\b`, "i");
      if (regex.test(article.title)) {
        if (!playerMap[player]) playerMap[player] = [];
        playerMap[player].push(article.title);
      }
    });
  });

  return Object.entries(playerMap)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 3)
    .map(([name, titles]) => ({ name, reason: titles[0] }));
};

const getCurrentDate = () => new Date().toISOString().split("T")[0];

const TrendingFeed: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [trendingData, setTrendingData] = useState<Record<string, TrendingPlayer[]>>({});

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const url = `https://news-api14.p.rapidapi.com/v2/trendings?date=${getCurrentDate()}&topic=Sports&language=en&limit=50`;
        const response = await fetch(url, {
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY || "",
            "x-rapidapi-host": "news-api14.p.rapidapi.com",
          },
        });

        const data = await response.json();
        const articles: Article[] = data.data.map((item: Article) => ({ title: item.title, excerpt: item.excerpt }));

        const trending: Record<string, TrendingPlayer[]> = {};
        SPORTS_TOPICS.forEach(topic => {
          trending[topic.name] = extractTrending(articles, topic.players);
        });

        setTrendingData(trending);
      } catch (err) {
        console.error("News fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto p-2 pl-3 rounded-md h-full">
      <p className="text-base text-center text-gray-500 border-b border-gray-500 mb-4 p-4">Trending</p>

      {SPORTS_TOPICS.map(topic => (
        <TrendingSection
          key={topic.name}
          topic={topic.name}
          players={trendingData[topic.name] || []}
          color={topic.color}
          textColor={topic.textColor}
        />
      ))}
    </div>
  );
};

export default TrendingFeed;
