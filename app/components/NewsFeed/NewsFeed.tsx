import React from "react";
import NewsSkeleton from "./NewsPostSkeleton";
import { useCricketNews } from "@/hooks/useCricketNews";

interface NewsFeedProps {
  selectedTopic: string;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ selectedTopic }) => {
  // each hook only fetches when its topic is the active one —
  // all three still get called every render (Rules of Hooks),
  // but only the active one does network work
  const cricket = useCricketNews(selectedTopic === "Cricket");

  // TODO: once built —
  // const tennis = useTennisNews(selectedTopic === "Tennis");
  // const soccer = useSoccerNews(selectedTopic === "Soccer");

  const current =
    selectedTopic === "Cricket"
      ? cricket
      : { data: [], isLoading: false, isError: false, error: null };
  // ^ placeholder for Tennis/Soccer until their hooks exist

  const { data: articles = [], isLoading, isError, error } = current;

  if (selectedTopic !== "Cricket") {
    return (
      <div className="container mx-auto p-4 text-center text-gray-500">
        {selectedTopic} news coming soon.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <NewsSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    const status = error instanceof Error && "status" in error
    ? (error as Error & { status: number }).status
    : undefined;
    const message =
      status === 402
        ? "News quota exceeded for today. Please check back later."
        : status === 429
        ? "Too many requests right now. Please try again shortly."
        : "Couldn't load news. Please try again later.";

    return (
      <div className="container mx-auto p-4 text-center text-gray-500">
        {message}
      </div>
    );
  }

  if (articles.length === 0) {
    return <p className="text-center text-gray-500">No articles found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {articles.map((article) => (
        <div
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
            <p className="text-xs sm:text-sm mb-2 ml-2">{article.excerpt}</p>
            <p className="text-xs text-gray-500 ml-2">
              {new Date(article.date).toLocaleDateString()}
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
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;