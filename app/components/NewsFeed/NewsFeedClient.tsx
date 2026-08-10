"use client";
import { useState } from "react";
import NewsFeed from "./NewsFeed";

const Sports = ["Soccer", "Cricket", "Tennis"];

const FeedClient = () => {
  const [selectedTopic, setSelectedTopic] = useState("Soccer");
  const [loading, setLoading] = useState(false);

  const handleTopicChange = (topic: string) => {
    if (loading) return;
    if (topic === selectedTopic) return;
    setSelectedTopic(topic);
  };

  return (
    <>
      <div className="bg-black h-full border no-scrollbar overflow-y-auto border-gray-600 w-full sm:w-6/12 rounded-xl">
        <div className="flex items-center justify-around w-full backdrop-blur-lg bg-transparent h-10 sm:h-16 sticky top-0 text-gray-500 border-b border-gray-500">
          {/* {Sports.map((topic) => (
             <button
            key={topic}
            type="button"
            onClick={() => handleTopicChange(topic)}
            className={`
              relative
              overflow-hidden
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-white
              focus-visible:ring-offset-2
              focus-visible:ring-offset-black
              ${
                selectedTopic === topic
                  ? "text-white"
                  : "text-gray-500 hover:text-white"
              }
              ${loading ? "cursor-not-allowed" : ""}
            `}
          >
            <span className={loading ? "opacity-60" : ""}>
              {topic}
            </span>

            {selectedTopic === topic && loading && (
              <span
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  -translate-x-full
                  animate-[shimmer_1.5s_infinite]
                  bg-gradient-to-r
                  from-transparent
                  via-white/60
                  to-transparent
                "
              />
            )}
          </button>
          ))} */}
          {Sports.map((topic) => {
            const isSelected = selectedTopic === topic;
            const isLoading = isSelected && loading;

            return (
              <button
                key={topic}
                type="button"
                onClick={() => handleTopicChange(topic)}
                className="
                    focus:outline-none
                    focus-visible:ring-2
                  focus-visible:ring-white
                    focus-visible:ring-offset-2
                  focus-visible:ring-offset-black
                  "
              >
                {isLoading ? (
                  <span
                    className="
                           bg-gradient-to-r
                         from-white/50
                         via-white
                         to-white/50
                           bg-[length:200%_100%]
                           bg-clip-text
                           text-transparent
                           [-webkit-background-clip:text]
                           animate-[textShimmer_2s_linear_infinite]
                           "
                  >
                    {topic}
                  </span>
                ) : (
                  <span
                    className={
                      isSelected
                        ? "text-white"
                        : "text-gray-500 hover:text-white"
                    }
                  >
                    {topic}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <NewsFeed selectedTopic={selectedTopic} onLoadingChange={setLoading} />
      </div>
    </>
  );
};

export default FeedClient;
