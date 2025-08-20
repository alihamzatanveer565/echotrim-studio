import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DownloadButton = ({ downloadUrl, fileName = "cleaned_audio.wav" }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  useEffect(() => {
    setIsDownloading(false);
    setDownloadComplete(false);
    setDownloadError(null);
  }, [downloadUrl]);

  if (!downloadUrl) return null;

  const handleDownloadClick = async () => {
    try {
      setIsDownloading(true);
      setDownloadError(null);

      await new Promise((resolve) => setTimeout(resolve, 600));
      setDownloadComplete(true);

      setTimeout(() => {
        setIsDownloading(false);
        setDownloadComplete(false);
      }, 3000);
    } catch (error) {
      console.error("Download error:", error);
      setDownloadError("⚠️ Failed to download. Please try again.");
      setIsDownloading(false);
    }
  };

  return (
    <div className="mt-10 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-8 shadow-sm border border-surface-300 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto bg-green-500 rounded-lg flex items-center justify-center shadow-sm">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 
                   2s-3-.895-3-2 1.343-2 3-2 3 .895 
                   3 2zm12-3c0 1.105-1.343 2-3 
                   2s-3-.895-3-2 1.343-2 3-2 
                   3 .895 3 2zM9 10l12-3"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-surface-800 mt-3">
            Cleaned Audio Ready
          </h3>
          <p className="text-sm text-surface-600">Download your file below</p>
        </div>

        {/* Download button */}
        <motion.a
          whileTap={{ scale: 0.97 }}
          href={downloadUrl}
          download={fileName}
          onClick={handleDownloadClick}
          className={`relative w-full inline-flex items-center justify-center px-6 py-4 rounded-lg font-medium transition-all duration-300 border border-surface-300 overflow-hidden ${
            isDownloading
              ? "bg-surface-100 cursor-not-allowed text-surface-500"
              : downloadComplete
              ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
              : "bg-white hover:bg-surface-50 text-surface-700 hover:border-surface-400"
          }`}
        >
          <div className="flex items-center">
            {isDownloading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 
                      0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Downloading...
              </>
            ) : downloadComplete ? (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Completed!
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 
                       3h10a3 3 0 003-3v-1m-4-4l-4 
                       4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Cleaned Audio
              </>
            )}
          </div>
        </motion.a>

        {/* File Info */}
        <div className="mt-5 text-center bg-white p-3 rounded-lg border border-surface-300">
          <p className="flex items-center justify-center text-green-600 text-sm font-medium">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 
                   2a9 9 0 11-18 0 9 9 0 0118 
                   0z"
              ></path>
            </svg>
            WAV Format – High Quality
          </p>
        </div>

        {/* Error */}
        {downloadError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 bg-red-50 border border-red-100 rounded-lg p-3 text-center"
          >
            <p className="text-red-600 text-sm flex items-center justify-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 
                     12a9 9 0 11-18 0 9 9 0 
                     0118 0z"
                ></path>
              </svg>
              {downloadError}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DownloadButton;
