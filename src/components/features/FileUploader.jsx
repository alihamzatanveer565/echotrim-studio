import { useState, useRef, useCallback, useEffect } from "react";
import { motion, Reorder } from "framer-motion";

const FileUploader = ({
  onFilesSelected,
  acceptedFileTypes = "audio/mpeg,audio/wav,audio/mp4,audio/ogg",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [isReordering, setIsReordering] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) {
        setIsDragging(true);
      }
    },
    [isDragging]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files).filter((file) => {
        // Filter for audio files
        return file.type.startsWith("audio/");
      });

      if (droppedFiles.length > 0) {
        setFiles(droppedFiles);
        onFilesSelected(droppedFiles);
      }
    },
    [onFilesSelected]
  );

  const handleFileInputChange = useCallback(
    (e) => {
      const selectedFiles = Array.from(e.target.files);
      if (selectedFiles.length > 0) {
        setFiles(selectedFiles);
        onFilesSelected(selectedFiles);
      }
    },
    [onFilesSelected]
  );

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes("mp3")) return "🎵";
    if (fileType.includes("wav")) return "🎼";
    if (fileType.includes("m4a") || fileType.includes("mp4")) return "🎧";
    if (fileType.includes("ogg")) return "🎤";
    return "🎵";
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const removeFile = (indexToRemove) => {
    const newFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(newFiles);
    onFilesSelected(newFiles);

    // Exit reorder mode if only one file remains
    if (newFiles.length <= 1) {
      setIsReordering(false);
    }
  };

  const handleReorder = (newOrder) => {
    setFiles(newOrder);
    onFilesSelected(newOrder);
  };

  const toggleReorderMode = () => {
    setIsReordering(!isReordering);
  };

  // Exit reorder mode if files are reduced to 1 or fewer
  useEffect(() => {
    if (files.length <= 1 && isReordering) {
      setIsReordering(false);
    }
  }, [files.length, isReordering]);

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`border-2 border-dashed rounded-xl p-6 sm:p-8 lg:p-12 text-center transition-all duration-300 cursor-pointer ${
          isDragging
            ? "border-primary-400 bg-primary-50 scale-[1.01]"
            : "border-primary-300 hover:border-primary-400 bg-white hover:bg-surface-50"
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileInputChange}
          multiple
          className="hidden"
        />

        <div className="flex justify-center mb-6">
          {files.length > 0 ? (
            <div className="relative">
              <span className="text-6xl animate-pulse">🎵</span>
              <span className="absolute -top-2 -right-2 bg-primary-500 text-xs text-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                {files.length}
              </span>
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center shadow-sm">
              <span className="text-4xl text-blue-600">📄</span>
            </div>
          )}
        </div>

        {files.length > 0 ? (
          <>
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-surface-800">
              {files.length} file{files.length !== 1 ? "s" : ""} selected
            </h2>
            <p className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
              Click to select different files
            </p>
          </>
        ) : (
          <>
            <h2 className="text-lg sm:text-xl font-semibold mb-3 text-surface-800">
              Drop your audio files here
            </h2>
            <p className="text-surface-600 mb-4">or click to browse</p>
            <div className="inline-block bg-surface-100 rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm text-surface-500 shadow-sm">
              Supports: MP3, WAV, M4A, OGG
            </div>
          </>
        )}
      </motion.div>

      {/* File Cards */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Header with reorder toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
            <h3 className="text-lg font-semibold text-surface-800">
              Selected Files
            </h3>
            {files.length > 1 && (
              <button
                onClick={toggleReorderMode}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm ${
                  isReordering
                    ? "bg-green-500 hover:bg-green-600 text-white shadow-md"
                    : "bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200"
                }`}
              >
                {isReordering ? (
                  <span className="flex items-center">
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
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Done
                  </span>
                ) : (
                  <span className="flex items-center">
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
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      ></path>
                    </svg>
                    Reorder
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Reorder instructions */}
          {isReordering && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center shadow-sm"
            >
              <div className="flex items-center justify-center space-x-2 mb-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
                <span className="text-blue-800 font-medium text-sm">
                  Reorder Mode Active
                </span>
              </div>
              <p className="text-blue-700 text-sm">
                Drag files to reorder them. Files will be merged in the order
                shown below.
              </p>
            </motion.div>
          )}

          {/* Files Grid/List */}
          {isReordering ? (
            <Reorder.Group
              axis="y"
              values={files}
              onReorder={handleReorder}
              className="space-y-3"
              layoutScroll
              dragMomentum={false}
            >
              {files.map((file, index) => (
                <Reorder.Item
                  key={`${file.name}-${index}`}
                  value={file}
                  className="cursor-grab active:cursor-grabbing"
                  dragListener={false}
                >
                  <motion.div
                    layout
                    className="w-full bg-white rounded-xl p-4 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-200"
                    whileDrag={{
                      scale: 1.02,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Order number */}
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {index + 1}
                      </div>

                      {/* Drag handle */}
                      <Reorder.DragHandle className="flex flex-col space-y-1 cursor-grab p-2 hover:bg-blue-50 rounded transition-colors">
                        <div className="w-4 h-1 bg-blue-400 rounded-full"></div>
                        <div className="w-4 h-1 bg-blue-400 rounded-full"></div>
                        <div className="w-4 h-1 bg-blue-400 rounded-full"></div>
                      </Reorder.DragHandle>

                      {/* File icon */}
                      <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">
                          {getFileIcon(file.type)}
                        </span>
                      </div>

                      {/* File info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-surface-800 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-surface-500">
                          {file.type.split("/")[1]?.toUpperCase() || "AUDIO"} •{" "}
                          {formatFileSize(file.size)}
                        </p>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          removeFile(index);
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="p-2 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          ) : (
            <div className="space-y-3">
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full bg-white rounded-lg p-4 border border-surface-200 shadow-sm hover:shadow-md
                       transition-all duration-200 group relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">
                          {getFileIcon(file.type)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-surface-800">
                          {file.name}
                        </p>
                        <p className="text-xs text-surface-500">
                          {file.type.split("/")[1]?.toUpperCase() || "AUDIO"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-surface-600 font-medium">
                        {formatFileSize(file.size)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 
                             hover:bg-red-50 rounded-full"
                      >
                        <svg
                          className="w-4 h-4 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default FileUploader;
