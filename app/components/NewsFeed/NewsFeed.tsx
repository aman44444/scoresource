import React, { useEffect } from "react";
import NewsSkeleton from "./NewsPostSkeleton";

import { useCricketNews } from "@/hooks/useCricketNews";
import { useTennisNews } from "@/hooks/useTennisNews";
import { useFootballNews } from "@/hooks/useFootballNews";

interface NewsFeedProps {
  selectedTopic: string;
  onLoadingChange: (loading: boolean) => void;
}

const formatNewsDate = (date: string) => {
  if (!date) return "";

  const match = date.match(
    /^(\d{2})-(\d{2})-(\d{4})(?:\s+(\d{2}):(\d{2}):(\d{2}))?$/,
  );

  if (match) {
    const [, day, month, year, hours = "0", minutes = "0", seconds = "0"] =
      match;

    const parsedDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hours),
      Number(minutes),
      Number(seconds),
    );

    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const NewsFeed: React.FC<NewsFeedProps> = ({
  selectedTopic,
  onLoadingChange,
}) => {
  // Soccer is the default topic
  const activeTopic = selectedTopic?.toLowerCase() || "soccer";

  console.log("NewsFeed topic:", {
    selectedTopic,
    activeTopic,
  });

  const cricket = useCricketNews(activeTopic === "cricket");

  const tennis = useTennisNews(activeTopic === "tennis");

  const football = useFootballNews(activeTopic === "soccer");

  console.log("Football query:", {
    enabled: activeTopic === "soccer",
    data: football.data,
    isLoading: football.isLoading,
    isFetching: football.isFetching,
    isError: football.isError,
    error: football.error,
  });

  let current;

  switch (activeTopic) {
    case "cricket":
      current = cricket;
      break;

    case "tennis":
      current = tennis;
      break;

    case "soccer":
      current = football;
      break;

    default:
      current = {
        data: [],
        isLoading: false,
        isError: false,
        error: null,
      };
  }

  const { data: articles = [], isLoading, isError, error } = current;

  useEffect(() => {
    onLoadingChange(isLoading);
  }, [isLoading, onLoadingChange]);

  // Loading
  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <NewsSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Error
  if (isError) {
    const status =
      error instanceof Error && "status" in error
        ? (error as Error & { status: number }).status
        : undefined;

    const message =
      status === 401
        ? "Unauthorized request. Please check the API configuration."
        : status === 402
          ? "News quota exceeded. Please check back later."
          : status === 429
            ? "Too many requests right now. Please try again shortly."
            : "Couldn't load news. Please try again later.";

    return (
      <div className="container mx-auto p-4 text-center text-gray-500">
        {message}
      </div>
    );
  }

  // No articles
  if (articles.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-500">
        No {activeTopic} articles found.
      </div>
    );
  }

  // Articles
  return (
    <div className="container mx-auto p-4">
      {articles.map((article) => (
        <article
          key={article.id}
          className="border border-gray-500 p-4 mb-4 rounded-xl flex"
        >
          <div className="w-1/6 h-auto">
            {article.thumbnail && (
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-auto mt-2 rounded-md"
              />
            )}
          </div>
        
          <div className="w-5/6 h-auto">
            <h3 className="text-sm sm:text-xl font-bold ml-2 mb-2 mt-1">
              {article.title}
            </h3>

            {article.excerpt && (
              <p className="text-xs sm:text-sm mb-2 ml-2">{article.excerpt}</p>
            )}

            <p className="text-xs text-gray-500 ml-2">
              {formatNewsDate(article.date)}
            </p>

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 ml-2"
            >
              Read more
            </a>
          </div>
        </article>
      ))}
    </div>
  );
};

export default NewsFeed;
