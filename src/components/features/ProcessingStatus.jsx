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
        <div className="bg-white rounded-xl p-8 border border-primary-100 shadow-card">
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
                    className="text-primary-100"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    className="text-primary-500 transition-all duration-300 ease-out"
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
              <div className="text-2xl font-bold text-primary-600">
                {Math.round(progress)}%
              </div>
              <div className="text-sm text-surface-500">Complete</div>
            </div>
          </div>

          {/* Progress bar with enhanced styling */}
          <div className="mb-6">
            <div className="relative h-3 bg-surface-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600 relative transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white to-transparent"></div>
                </div>
                {/* Pulse effect */}
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-primary-300 to-primary-500 opacity-50"></div>
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
                className="w-3 h-3 bg-primary-500 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <span className="text-xs text-surface-500 mt-1">Analyzing</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="w-3 h-3 bg-primary-500 rounded-full animate-bounce"
                style={{ animationDelay: "200ms" }}
              ></div>
              <span className="text-xs text-surface-500 mt-1">Converting</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="w-3 h-3 bg-primary-500 rounded-full animate-bounce"
                style={{ animationDelay: "400ms" }}
              ></div>
              <span className="text-xs text-surface-500 mt-1">Optimizing</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="w-3 h-3 bg-primary-500 rounded-full animate-bounce"
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
        <div className="bg-white rounded-xl p-8 border border-green-100 shadow-card">
          <h3 className="text-xl font-semibold mb-6 flex items-center text-green-600">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <actionIcons.check className="w-5 h-5 text-green-600" />
            </div>
            Processing Complete
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-surface-50 p-4 rounded-lg border border-surface-100">
              <p className="text-surface-500 text-sm mb-1 font-medium">
                Processing Time
              </p>
              <p className="text-xl font-semibold text-surface-800 flex items-center">
                <actionIcons.clock className="w-4 h-4 mr-1 text-primary-500" />
                {processingStats.processingTime}s
              </p>
            </div>
            <div className="bg-surface-50 p-4 rounded-lg border border-surface-100">
              <p className="text-surface-500 text-sm mb-1 font-medium">
                Files Processed
              </p>
              <p className="text-xl font-semibold text-surface-800 flex items-center">
                <svg
                  className="w-4 h-4 mr-1 text-primary-500"
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
            <div className="bg-surface-50 p-4 rounded-lg border border-surface-100">
              <p className="text-surface-500 text-sm mb-1 font-medium">
                Input Size
              </p>
              <p className="text-xl font-semibold text-surface-800 flex items-center">
                <svg
                  className="w-4 h-4 mr-1 text-primary-500"
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
            <div className="bg-surface-50 p-4 rounded-lg border border-surface-100">
              <p className="text-surface-500 text-sm mb-1 font-medium">
                Output Size
              </p>
              <p className="text-xl font-semibold text-surface-800 flex items-center">
                <svg
                  className="w-4 h-4 mr-1 text-primary-500"
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
        <div className="bg-white rounded-xl p-8 border border-red-100 shadow-card">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-red-600">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <svg
                className="w-5 h-5 text-red-600"
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
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessingStatus;
