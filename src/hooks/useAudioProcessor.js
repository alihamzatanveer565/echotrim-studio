import { useState, useCallback, useRef } from "react";
import { processAudioFiles } from "../services/ffmpeg/ffmpegService";

/**
 * Custom hook for processing audio files with FFmpeg
 * @returns {Object} - Audio processing methods and state
 */
export const useAudioProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [processedAudio, setProcessedAudio] = useState(null);
  const [processingStats, setProcessingStats] = useState(null);

  // Use refs for tracking processing time
  const processingTimerRef = useRef(null);
  const startTimeRef = useRef(null);

  /**
   * Process audio files by concatenating and trimming silence
   * @param {File[]} files - Array of audio files to process
   * @param {Object} options - Processing options
   * @param {number} options.threshold - Silence threshold in dB
   * @param {number} options.duration - Minimum silence duration in seconds
   */
  const processFiles = useCallback(async (files, options) => {
    if (!files || files.length === 0) {
      setError("No files selected");
      return;
    }

    // Check if we have too many files
    if (files.length > 8) {
      setError("Maximum 8 files can be processed at once");
      return;
    }

    // Calculate total size
    const totalSizeMB =
      files.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024);

    // Check if total size exceeds limit
    if (totalSizeMB > 20) {
      setError("Total file size exceeds 20MB limit");
      return;
    }

    try {
      setIsProcessing(true);
      setProgress(0);
      setError(null);
      setProcessedAudio(null);
      setProcessingStats(null);

      // Record start time
      startTimeRef.current = Date.now();

      // Use files in the order provided by the user (respecting reorder)
      const filesToProcess = [...files];

      console.log(
        "Files to process in user-defined order:",
        filesToProcess.map((f) => f.name)
      );

      // Progress simulation with more accurate timing for expected file sizes
      const progressInterval = 300; // ms between updates
      processingTimerRef.current = setInterval(() => {
        setProgress((prev) => {
          // More conservative progress estimation for larger files
          const increment = totalSizeMB > 10 ? 5 : 10;
          const newProgress = prev + (100 - prev) * (increment / 100);
          return newProgress > 95 ? 95 : newProgress;
        });
      }, progressInterval);

      // Process the files
      console.log("Starting audio processing...");
      const result = await processAudioFiles(filesToProcess, options);
      console.log("Audio processing complete, result size:", result.audioData.length);

      // Calculate processing time
      const processingTime = (Date.now() - startTimeRef.current) / 1000;

      // Calculate input and output sizes
      const inputSize = totalSizeMB.toFixed(2);
      const outputSize = (result.audioData.length / (1024 * 1024)).toFixed(2);

      // Format durations for display
      const formatDuration = (seconds) => {
        if (!seconds || isNaN(seconds) || seconds <= 0) {
          return "0:00";
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
      };

      // Ensure we have valid duration values
      const beforeDuration = result.beforeDuration || 60;
      const afterDuration = result.afterDuration || 60;
      const timeSaved = Math.max(0, beforeDuration - afterDuration);

      setProcessingStats({
        processingTime: processingTime.toFixed(1),
        inputSize,
        outputSize,
        fileCount: files.length,
        beforeDuration,
        afterDuration,
        beforeDurationFormatted: formatDuration(beforeDuration),
        afterDurationFormatted: formatDuration(afterDuration),
        timeSaved: timeSaved.toFixed(1),
        timeSavedFormatted: formatDuration(timeSaved),
      });

      clearInterval(processingTimerRef.current);
      setProgress(100);
      setProcessedAudio(result.audioData);
      console.log("Processing complete, stats:", {
        processingTime: processingTime.toFixed(1),
        inputSize,
        outputSize,
        fileCount: files.length,
        beforeDuration: beforeDuration.toFixed(1),
        afterDuration: afterDuration.toFixed(1),
        timeSaved: timeSaved.toFixed(1),
      });
    } catch (err) {
      console.error("Audio processing error:", err);
      setError(err.message || "Error processing audio files");
    } finally {
      if (processingTimerRef.current) {
        clearInterval(processingTimerRef.current);
      }
      setIsProcessing(false);
    }
  }, []);

  /**
   * Create a download link for the processed audio
   * @returns {string|null} - URL for the processed audio or null if not available
   */
  const getDownloadUrl = useCallback(() => {
    if (!processedAudio) return null;

    console.log("Creating download URL for processed audio");
    const blob = new Blob([processedAudio], { type: "audio/wav" });
    return URL.createObjectURL(blob);
  }, [processedAudio]);

  /**
   * Reset the processor state
   */
  const reset = useCallback(() => {
    console.log("Resetting audio processor state");
    setProcessedAudio(null);
    setProgress(0);
    setError(null);
    setProcessingStats(null);

    if (processingTimerRef.current) {
      clearInterval(processingTimerRef.current);
    }
  }, []);

  return {
    isProcessing,
    progress,
    error,
    processingStats,
    hasProcessedAudio: !!processedAudio,
    processFiles,
    getDownloadUrl,
    reset,
  };
};

export default useAudioProcessor;
