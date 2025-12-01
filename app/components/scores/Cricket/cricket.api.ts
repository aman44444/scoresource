export const fetchCricketMatches = async () => {
    const result = await fetch(
         'https://cricket-live-line1.p.rapidapi.com/liveMatches',

    
         {
            headers: {
                 'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEY || '',
                 'x-rapidapi-host': 'cricket-live-line1.p.rapidapi.com',
            },
         }
    );

    const json = await result.json();
    console.log(json);

    if (!json.status) {
        throw new Error("No cricket matches");
    }

    return json.data;
}