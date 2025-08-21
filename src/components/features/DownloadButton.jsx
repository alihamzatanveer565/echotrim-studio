import React from "react";
import { motion } from "framer-motion";
import { actionIcons } from "../../utils/iconMapping";

const DownloadButton = ({ downloadUrl, fileName = "cleaned_audio.wav" }) => {
  if (!downloadUrl) return null;

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
          className="relative w-full inline-flex items-center justify-center px-6 py-4 rounded-lg font-medium transition-all duration-300 border border-surface-300 bg-white hover:bg-surface-50 text-surface-700 hover:border-surface-400"
        >
          <div className="flex items-center">
            <actionIcons.download className="w-5 h-5 mr-2" />
            Download Cleaned Audio
          </div>
        </motion.a>

        {/* File Info */}
        <div className="mt-5 text-center bg-white p-3 rounded-lg border border-surface-300">
          <p className="flex items-center justify-center text-green-600 text-sm font-medium">
            <actionIcons.check className="w-4 h-4 mr-2" />
            WAV Format – High Quality
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default DownloadButton;
