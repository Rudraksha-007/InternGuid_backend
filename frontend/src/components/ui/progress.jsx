// import React from "react";

// const Progress = ({ value = 0 }) => {
//   return (
//     <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
//       <div
//         className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
//         style={{ width: `${value}%` }}
//       />
//     </div>
//   );
// };

// export default Progress;


import React from "react";

const Progress = ({ value = 0 }) => {
  return (
    <div
      className="relative w-full h-4 rounded-full overflow-hidden"
      style={{ backgroundColor: "hsl(26 90% 58%)" }} // unfilled track
    >
      <div
        className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default Progress;
