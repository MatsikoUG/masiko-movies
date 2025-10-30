const LoadingSkeleton = ({ className = "" }) => {
  return (
    <div className={`bg-gray-800 rounded-md animate-pulse ${className}`}>
      <div className="aspect-[2/3] bg-gray-700 rounded-t-md"></div>
      <div className="p-3">
        <div className="h-4 bg-gray-700 rounded mb-2"></div>
        <div className="h-3 bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;