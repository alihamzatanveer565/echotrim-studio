import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { actionIcons } from "../../utils/iconMapping";

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
            <actionIcons.volume className="w-7 h-7 text-white" />
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
                <actionIcons.loader className="animate-spin h-5 w-5 mr-2" />
                Downloading...
              </>
            ) : downloadComplete ? (
              <>
                <actionIcons.check className="w-5 h-5 mr-2" />
                Completed!
              </>
            ) : (
              <>
                <actionIcons.download className="w-5 h-5 mr-2" />
                Download Cleaned Audio
              </>
            )}
          </div>
        </motion.a>

        {/* File Info */}
        <div className="mt-5 text-center bg-white p-3 rounded-lg border border-surface-300">
          <p className="flex items-center justify-center text-green-600 text-sm font-medium">
            <actionIcons.check className="w-4 h-4 mr-2" />
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
