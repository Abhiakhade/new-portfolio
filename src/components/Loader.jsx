import React from "react";


export function Loader({ size = 48, className = "" }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-blue-500"
      >
        {/* Base tray line */}
        <path
          d="M6 40 H58"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="opacity-90"
        />

        {/* Center cradle */}
        <path
          d="M27 40 v2 a5 5 0 0 0 10 0 v-2"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Center ray (longest, straight up) */}
        <line
          x1="32"
          y1="8"
          x2="32"
          y2="34"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="origin-[32px_40px] animate-[raySpin_1.1s_ease-in-out_infinite]"
        />

        {/* Left ray */}
        <line
          x1="12"
          y1="16"
          x2="26"
          y2="34"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="origin-[32px_40px] animate-[raySpin_1.1s_ease-in-out_infinite_0.12s]"
        />

        {/* Right ray */}
        <line
          x1="52"
          y1="16"
          x2="38"
          y2="34"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="origin-[32px_40px] animate-[raySpin_1.1s_ease-in-out_infinite_0.24s]"
        />
      </svg>

      <span className="sr-only">Loading...</span>

      {/* Keyframes for the subtle "flare" motion on each ray */}
      <style>{`
        @keyframes raySpin {
          0%, 100% { transform: scaleY(1); opacity: 1; }
          50% { transform: scaleY(0.55); opacity: 0.45; }
        }
      `}</style>
    </div>
  );
}

export default function PageLoader({
  message = "Loading...",
  fullScreen = true,
  size = 56,
}) {
  return (
    <div
      className={`${
        fullScreen ? "fixed inset-0" : "absolute inset-0"
      } flex flex-col items-center justify-center gap-4 bg-white/80 backdrop-blur-sm z-50 animate-[fadeIn_0.4s_ease-out]`}
    >
      <Loader size={size} />
      {message && (
        <p className="text-sm font-medium text-blue-600 tracking-wide animate-[fadeIn_0.6s_ease-out]">
          {message}
        </p>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
