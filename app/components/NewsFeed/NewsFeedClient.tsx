"use client"
import { useState } from "react";
import NewsFeed from "./NewsFeed";

const Sports = ["Soccer", "Cricket" , "Tennis"];

const FeedClient = () => {
    const [selectedTopic, setSelectedTopic] = useState("Soccer")
    return (
        <>
          <div className="bg-black h-full border no-scrollbar overflow-y-auto border-gray-600 w-full sm:w-6/12 rounded-xl">
            <div className="flex items-center justify-around w-full backdrop-blur-lg bg-transparent h-10 sm:h-16 sticky top-0 text-gray-500 border-b border-gray-500">
             {Sports.map((topic) => (
                <button 
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                 className={`
              ${
                selectedTopic === topic
                  ? " text-white"
                  : "hover:text-white"
              }`}>
                     {topic}
                </button>
             ))}

          </div>
            <NewsFeed selectedTopic={selectedTopic}/>
        </div>
        </>
    )
}

export default FeedClient;