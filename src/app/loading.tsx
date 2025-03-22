"use client";

import { useState, useEffect } from "react";

export default function LoadingAnimation() {
  const [floatingElements, setFloatingElements] = useState<
    Array<{
      width: number;
      height: number;
      top: number;
      left: number;
      duration: number;
      delay: number;
      floatDuration: number;
    }>
  >([]);

  // Generate random elements only on the client after hydration
  useEffect(() => {
    const elements = Array.from({ length: 15 }, () => ({
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      floatDuration: Math.random() * 10 + 10,
    }));

    setFloatingElements(elements);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-zinc-900/95 backdrop-blur-sm z-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${element.width}px`,
              height: `${element.height}px`,
              top: `${element.top}%`,
              left: `${element.left}%`,
              animationDuration: `${element.duration}s`,
              animationDelay: `${element.delay}s`,
              animation: `float ${element.floatDuration}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Spinner animation */}
      <div className="z-10 relative">
        <div className="spinner-outer"></div>
        <div className="spinner-inner"></div>
        <div className="spinner-center"></div>
      </div>

      {/* Loading text */}
      <div className="z-10 mt-8 loading-text">CARREGANDO</div>

      {/* CSS for the animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-20px) scale(1.05);
            opacity: 0.8;
          }
        }

        .spinner-outer {
          width: 80px;
          height: 80px;
          border: 2px solid transparent;
          border-top-color: white;
          border-right-color: white;
          border-radius: 50%;
          animation: spin 1.5s linear infinite;
        }

        .spinner-inner {
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          bottom: 10px;
          border: 2px solid transparent;
          border-top-color: rgba(255, 255, 255, 0.7);
          border-left-color: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          animation: spin 1s linear infinite reverse;
        }

        .spinner-center {
          position: absolute;
          top: 25px;
          left: 25px;
          right: 25px;
          bottom: 25px;
          background-color: white;
          border-radius: 50%;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .loading-text {
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          letter-spacing: 0.2em;
          font-size: 1.2rem;
          color: white;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          animation: textPulse 2s ease-in-out infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(0.5);
            opacity: 0.5;
          }
          50% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes textPulse {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(0.98);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
