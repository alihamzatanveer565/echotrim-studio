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
        className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"
      >
        <div className="mx-auto w-full max-w-xl">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md">
              <actionIcons.volume className="h-7 w-7 text-white" />
            </div>
            <h3 className="mt-3 text-lg font-semibold text-slate-800">
              Cleaned Audio Ready
            </h3>
            <p className="text-sm text-slate-600">Download your file below</p>
          </div>

          {/* Download button */}
          <motion.a
            whileTap={{ scale: 0.97 }}
            href={downloadUrl}
            download={fileName}
            className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-700/20 transition-all duration-300 hover:from-blue-500 hover:to-cyan-500"
          >
            <div className="flex items-center">
              <actionIcons.download className="mr-2 h-5 w-5" />
              Download Cleaned Audio
            </div>
          </motion.a>

          {/* File Info */}
          <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center">
            <p className="flex items-center justify-center text-sm font-medium text-emerald-700">
              <actionIcons.check className="mr-2 h-4 w-4" />
              WAV Format – High Quality
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DownloadButton;
