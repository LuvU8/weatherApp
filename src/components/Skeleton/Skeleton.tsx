import React from "react";

const Skeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 h-20 mb-4 rounded"></div>
      <div className="bg-gray-300 h-6 mb-2 rounded w-3/4"></div>
      <div className="bg-gray-300 h-6 rounded"></div>
    </div>
  );
};

export default Skeleton;
