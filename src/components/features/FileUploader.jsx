import { useState, useRef, useCallback, useEffect } from "react";
import { motion, Reorder } from "framer-motion";
import { getFileIcon, actionIcons, uploadIcons } from "../../utils/iconMapping";

const FileUploader = ({
  onFilesSelected,
  acceptedFileTypes = "audio/mpeg,audio/wav,audio/mp4,audio/ogg",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [isReordering, setIsReordering] = useState(false);
  const [, setDragIndex] = useState(null);
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
        const newFiles = [...files, ...droppedFiles];
        // Sort files by creation date (oldest first)
        const sortedFiles = newFiles.sort((a, b) => {
          const dateA =
            a.lastModified || a.webkitRelativePath
              ? new Date(a.lastModified)
              : new Date();
          const dateB =
            b.lastModified || b.webkitRelativePath
              ? new Date(b.lastModified)
              : new Date();
          return dateA - dateB;
        });
        setFiles(sortedFiles);
        onFilesSelected(sortedFiles);
      }
    },
    [onFilesSelected, files]
  );

  const handleFileInputChange = useCallback(
    (e) => {
      const selectedFiles = Array.from(e.target.files);
      if (selectedFiles.length > 0) {
        const newFiles = [...files, ...selectedFiles];
        // Sort files by creation date (oldest first)
        const sortedFiles = newFiles.sort((a, b) => {
          const dateA =
            a.lastModified || a.webkitRelativePath
              ? new Date(a.lastModified)
              : new Date();
          const dateB =
            b.lastModified || b.webkitRelativePath
              ? new Date(b.lastModified)
              : new Date();
          return dateA - dateB;
        });
        setFiles(sortedFiles);
        onFilesSelected(sortedFiles);
      }
    },
    [onFilesSelected, files]
  );

  const handleBrowseClick = () => {
    fileInputRef.current.click();
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

  const handleReorder = useCallback(
    (newOrder) => {
      setFiles(newOrder);
      onFilesSelected(newOrder);
    },
    [onFilesSelected]
  );

  const toggleReorderMode = () => {
    setIsReordering(!isReordering);
    setDragIndex(null);
  };

  // Exit reorder mode if files are reduced to 1 or fewer
  useEffect(() => {
    if (files.length <= 1 && isReordering) {
      setIsReordering(false);
    }
  }, [files.length, isReordering]);

  // Handle escape key to exit reorder mode
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isReordering) {
        setIsReordering(false);
        setDragIndex(null);
      }
    };

    if (isReordering) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isReordering]);

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-300 cursor-pointer sm:p-8 lg:p-12 ${
          isDragging
            ? "scale-[1.01] border-blue-500 bg-blue-50"
            : "border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50"
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
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-blue-200 bg-blue-100 shadow-sm">
                <uploadIcons.multiple className="h-12 w-12 text-blue-600 animate-pulse" />
              </div>
              <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-xs font-semibold text-white shadow-sm">
                {files.length}
              </span>
            </div>
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-blue-200 bg-blue-100 shadow-sm">
              <uploadIcons.default className="h-10 w-10 text-blue-600" />
            </div>
          )}
        </div>

        {files.length > 0 ? (
          <>
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-surface-800">
              {files.length} file{files.length !== 1 ? "s" : ""} selected
            </h2>
            <p className="text-sm text-slate-600 transition-colors">
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
            <h3 className="text-lg font-semibold text-slate-800">
              Selected Files
            </h3>
            {files.length > 1 && (
              <button
                onClick={toggleReorderMode}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isReordering
                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                    : "border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                }`}
              >
                {isReordering ? (
                  <span className="flex items-center">
                    <actionIcons.check className="w-4 h-4 mr-2" />
                    Done
                  </span>
                ) : (
                  <span className="flex items-center">
                    <actionIcons.reorder className="w-4 h-4 mr-2" />
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
              className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center"
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
                shown below. Press ESC to exit.
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
            >
              {files.map((file, index) => (
                <Reorder.Item
                  key={file.name + file.size + file.lastModified}
                  value={file}
                  className="cursor-grab active:cursor-grabbing"
                  whileDrag={{
                    scale: 1.02,
                    zIndex: 1,
                  }}
                >
                  <div className="w-full bg-white rounded-xl p-4 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-200">
                    <div className="flex items-center space-x-4">
                      {/* Order number */}
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {index + 1}
                      </div>

                      {/* Drag handle indicator */}
                      <div className="flex flex-col space-y-1 p-2">
                        <div className="w-4 h-1 bg-blue-400 rounded-full"></div>
                        <div className="w-4 h-1 bg-blue-400 rounded-full"></div>
                        <div className="w-4 h-1 bg-blue-400 rounded-full"></div>
                      </div>

                      {/* File icon */}
                      <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center">
                        {(() => {
                          const IconComponent = getFileIcon(file.type);
                          return (
                            <IconComponent className="w-5 h-5 text-blue-600" />
                          );
                        })()}
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
                        onTouchStart={(e) => e.stopPropagation()}
                        className="p-2 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <actionIcons.close className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
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
                  className="group relative w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                        {(() => {
                          const IconComponent = getFileIcon(file.type);
                          return (
                            <IconComponent className="h-5 w-5 text-blue-600" />
                          );
                        })()}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {file.type.split("/")[1]?.toUpperCase() || "AUDIO"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-sm font-medium text-slate-700">
                        {formatFileSize(file.size)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                        className="rounded-full p-1.5 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-red-50"
                      >
                        <actionIcons.close className="w-4 h-4 text-red-500" />
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
