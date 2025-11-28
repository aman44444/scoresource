import { Match } from "./types";

export const fetchLiveTennisMatches = async ():Promise<Match[]> => {
    const response = await fetch (
        "https://tennisapi1.p.rapidapi.com/api/tennis/events/live",
        { headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY || "",
        "x-rapidapi-host": "tennisapi1.p.rapidapi.com",
        },
    }
    )

      const data= await response.json();
      console.log(DataTransferItem)


      if (!data || !Array.isArray(data.events)) {
        throw new Error("No live matches available");
      }
      return data.events;

  };