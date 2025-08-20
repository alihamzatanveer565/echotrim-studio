import React from "react";

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
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-primary-100 shadow-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-surface-800">
            <svg
              className="w-5 h-5 mr-2 text-primary-500 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            Processing Audio
          </h3>

          <div className="relative pt-1">
            <div className="h-2 bg-surface-100 rounded-full">
              <div
                className="h-full rounded-full bg-primary-500 relative overflow-hidden transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 opacity-30">
                  <span className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white to-transparent"></span>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-surface-500">Processing...</span>
              <span className="text-sm font-medium text-primary-600">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full border-3 border-t-primary-500 border-primary-100 animate-spin"></div>
            </div>
          </div>
        </div>
      )}

      {!isProcessing && processingStats && (
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-green-100 shadow-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-green-600">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            Processing Complete
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-surface-50 p-4 rounded-lg border border-surface-100">
              <p className="text-surface-500 text-sm mb-1 font-medium">
                Processing Time
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
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
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-red-100 shadow-card">
          <h3 className="text-lg font-semibold mb-3 flex items-center text-red-600">
            <svg
              className="w-5 h-5 mr-2"
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
