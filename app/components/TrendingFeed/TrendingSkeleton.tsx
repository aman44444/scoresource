const TrendingSkeleton = () => {
  return (
    <ul className="space-y-2 mr-4 ml-4">
      {[1, 2, 3].map(i => (
        <li key={i} className="flex justify-between items-center">
          <div className="h-3 w-24 bg-gray-700/50 rounded animate-pulse" />
          <div className="h-3 w-3 bg-gray-700/50 rounded-full animate-pulse" />
        </li>
      ))}
    </ul>
  );
};

export default TrendingSkeleton;
