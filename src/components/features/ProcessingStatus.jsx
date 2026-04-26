import React from "react";
import { actionIcons } from "../../utils/iconMapping";

const ProcessingStatus = ({
  isProcessing,
  progress,
  error,
  processingStats,
}) => {
  if (!isProcessing && !error && !processingStats) return null;

  return (
    <div className="mt-6 space-y-6">
      {isProcessing && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
          {/* Header with animated icon */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-surface-800 flex items-center">
              <div className="relative mr-3">
                {/* Circular progress indicator */}
                <svg
                  className="w-8 h-8 transform -rotate-90"
                  viewBox="0 0 32 32"
                >
                  {/* Background circle */}
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    className="text-slate-200"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    className="text-blue-600 transition-all duration-300 ease-out"
                    strokeDasharray={`${2 * Math.PI * 14}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 14 * (1 - progress / 100)
                    }`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              Processing Audio
            </h3>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(progress)}%
              </div>
              <div className="text-sm text-surface-500">Complete</div>
            </div>
          </div>

          {/* Progress bar with enhanced styling */}
          <div className="mb-6">
            <div className="relative h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="relative h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white to-transparent"></div>
                </div>
                {/* Pulse effect */}
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-300 to-cyan-400 opacity-50"></div>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-surface-600 font-medium">
                Processing your audio files...
              </span>
            </div>
          </div>

          {/* Animated processing indicators */}
          <div className="flex justify-center space-x-4">
            <div className="flex flex-col items-center">
              <div
                className="h-3 w-3 animate-bounce rounded-full bg-blue-600"
                style={{ animationDelay: "0ms" }}
              ></div>
              <span className="text-xs text-surface-500 mt-1">Analyzing</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="h-3 w-3 animate-bounce rounded-full bg-blue-600"
                style={{ animationDelay: "200ms" }}
              ></div>
              <span className="text-xs text-surface-500 mt-1">Converting</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="h-3 w-3 animate-bounce rounded-full bg-blue-600"
                style={{ animationDelay: "400ms" }}
              ></div>
              <span className="text-xs text-surface-500 mt-1">Optimizing</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="h-3 w-3 animate-bounce rounded-full bg-blue-600"
                style={{ animationDelay: "600ms" }}
              ></div>
              <span className="text-xs text-surface-500 mt-1">Finalizing</span>
            </div>
          </div>

          {/* Status message */}
          <div className="mt-6 text-center">
            <p className="text-sm text-surface-600">
              Please wait while we process your audio files. This may take a few
              moments...
            </p>
          </div>
        </div>
      )}

      {!isProcessing && processingStats && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
          <h3 className="mb-6 flex items-center text-xl font-semibold text-emerald-600">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
              <actionIcons.check className="h-5 w-5 text-emerald-600" />
            </div>
            Processing Complete
          </h3>

          {/* Duration comparison section */}
          <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
            <h4 className="mb-4 text-center text-lg font-semibold text-blue-900">
              Duration Comparison
            </h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="mb-1 text-sm font-medium text-blue-700">
                  Before Processing
                </p>
                <p className="text-3xl font-bold text-blue-900">
                  {processingStats.beforeDurationFormatted || "0:00"}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="mb-1 text-sm font-medium text-emerald-600">
                  After Processing
                </p>
                <p className="text-3xl font-bold text-emerald-700">
                  {processingStats.afterDurationFormatted || "0:00"}
                </p>
              </div>
            </div>
            {processingStats.timeSavedFormatted && (
              <div className="mt-3 text-center">
                <p className="text-sm text-blue-700">
                  <span className="font-semibold text-emerald-600">
                    Time Saved: {processingStats.timeSavedFormatted}
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-1 text-sm font-medium text-slate-500">
                Processing Time
              </p>
              <p className="flex items-center text-xl font-semibold text-slate-800">
                <actionIcons.clock className="mr-2 h-4 w-4 text-blue-600" />
                {processingStats.processingTime}s
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-1 text-sm font-medium text-slate-500">
                Files Processed
              </p>
              <p className="flex items-center text-xl font-semibold text-slate-800">
                <svg
                  className="mr-2 h-4 w-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                {processingStats.fileCount}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-1 text-sm font-medium text-slate-500">
                Input Size
              </p>
              <p className="flex items-center text-xl font-semibold text-slate-800">
                <svg
                  className="mr-2 h-4 w-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  ></path>
                </svg>
                {processingStats.inputSize} MB
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-1 text-sm font-medium text-slate-500">
                Output Size
              </p>
              <p className="flex items-center text-xl font-semibold text-slate-800">
                <svg
                  className="mr-2 h-4 w-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  ></path>
                </svg>
                {processingStats.outputSize} MB
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-100 bg-white p-8 shadow-card">
          <h3 className="mb-4 flex items-center text-xl font-semibold text-red-600">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-5 w-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            Error
          </h3>
          <div className="rounded-lg border border-red-100 bg-red-50 p-4">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessingStatus;
