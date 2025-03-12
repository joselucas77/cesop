// export default function Loading() {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
//       <div className="flex items-center space-x-2">
//         {[0, 1, 2, 3, 4].map((index) => (
//           <div
//             key={index}
//             className="w-5 h-5 rounded-full bg-primary animate-bounce"
//             style={{
//               animationDelay: `${index * 0.1}s`,
//               animationDuration: "0.8s",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

export default function LoadingAnimation() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 overflow-hidden">
      {/* Border animation */}
      <div className="absolute inset-0 border-wrapper"></div>

      {/* Bouncing dots */}
      <div className="flex items-center space-x-2 z-10">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="w-5 h-5 rounded-full bg-zinc-50 animate-bounce"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationDuration: "0.8s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
