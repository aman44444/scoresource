const NewsSkeleton = () => {
  return (
    <div className="border border-gray-500 p-4 mb-4 rounded-xl flex animate-pulse">
      <div className="w-1/6">
        <div className="h-20 w-full bg-gray-700/50 rounded-md" />
      </div>

      <div className="w-5/6 ml-4 space-y-3">
        <div className="h-4 bg-gray-700/50 rounded w-3/4" />
        <div className="h-3 bg-gray-700/50 rounded w-full" />
        <div className="h-3 bg-gray-700/50 rounded w-5/6" />
        <div className="h-3 bg-gray-700/50 rounded w-1/4" />
      </div>
    </div>
  );
};

 export default NewsSkeleton;
