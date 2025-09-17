import React from "react";

const Progress = ({ value = 0 }) => {
  return (
    <div
      className="relative w-full h-4 rounded-full overflow-hidden bg-gray-200" // outer track
    >
      <div
        className="h-full transition-all duration-300 ease-in-out"
        style={{
          width: `${value}%`,
          background: "linear-gradient(90deg, #0560e1, #ef6d09d4)", // gradient fill
        }}
      />
    </div>
  );
};

export default Progress;
