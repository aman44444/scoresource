import Navbar from "./Navbar";
import FetchMatches from "./scores/Cricket/CricketScore";
import FootballLiveMatches from "./scores/Football/FootballScore";
import TennisLiveScores from "./scores/Tennis/TennisScore";
import Trending from "./TrendingFeed/Trending";
import FeedClient from "./FeedClient";


const Layout = () => {
  return (
    <div className="h-screen w-full bg-black">
      <div className="h-16 sm:h-20">
        <Navbar />
      </div>
      <div className="flex h-5/6 w-full justify-around">
        <div className="bg-black h-full rounded-md w-3/12 hidden sm:block no-scrollbar overflow-y-auto sm:mt-3 sm:mr-3 sm:ml-3">
          <div className="flex flex-col items-center">
            <FetchMatches />
            <FootballLiveMatches />
            <TennisLiveScores />
          
          </div>
        </div>
          <FeedClient/>
        <div className="bg-black h-full hidden sm:block w-3/12 rounded-md">
          <Trending />
        </div>
      </div>
    </div>
  );
};

export default Layout;


