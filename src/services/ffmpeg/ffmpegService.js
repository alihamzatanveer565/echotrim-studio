import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

// Create FFmpeg instance
const ffmpeg = new FFmpeg();

// Load FFmpeg
let ffmpegLoadingPromise = null;

/**
 * Ensures FFmpeg is loaded
 * @returns {Promise<void>}
 */
const ensureFFmpegLoaded = async () => {
  try {
    // Check for SharedArrayBuffer support (required for audio processing)
    if (typeof SharedArrayBuffer === "undefined") {
      throw new Error(
        "SharedArrayBuffer is not supported in this browser. This is required for audio processing to work."
      );
    }

    // Check for WebAssembly support
    if (typeof WebAssembly === "undefined") {
      throw new Error(
        "WebAssembly is not supported in this browser. This is required for audio processing to work."
      );
    }

    // Check if already loaded
    if (ffmpeg.loaded) {
      console.log("Audio processor already loaded");
      return Promise.resolve();
    }

    if (!ffmpegLoadingPromise) {
      console.log("Loading audio processor...");

      try {
        // Use local files instead of CDN URLs
        console.log("Loading audio processor from local files");

        // Set up event listeners like in the working example
        ffmpeg.on("log", ({ message }) => {
          console.log("FFmpeg log:", message);
        });

        ffmpeg.on("progress", (ratio) => {
          console.log("FFmpeg progress:", ratio);
        });

        // Use local files with toBlobURL to avoid Vite import issues
        await ffmpeg.load({
          coreURL: await toBlobURL(
            "/ffmpeg-core-mt/ffmpeg-core.js",
            "text/javascript"
          ),
          wasmURL: await toBlobURL(
            "/ffmpeg-core-mt/ffmpeg-core.wasm",
            "application/wasm"
          ),
          workerURL: await toBlobURL(
            "/ffmpeg-core-mt/ffmpeg-core.worker.js",
            "text/javascript"
          ),
        });

        console.log("Audio processor loaded successfully from local files");
        ffmpegLoadingPromise = Promise.resolve();
      } catch (error) {
        console.error("Failed to load audio processor:", error);
        throw error;
      }
    }

    await ffmpegLoadingPromise;
    return ffmpegLoadingPromise;
  } catch (error) {
    console.error("Error loading audio processor:", error);
    throw new Error(
      "Failed to load audio processor: " + (error.message || "Unknown error")
    );
  }
};

/**
 * Concatenates multiple audio files
 * @param {File[]} audioFiles - Array of audio files to concatenate (sorted by creation time)
 * @returns {Promise<Uint8Array>} - Concatenated audio as Uint8Array
 */
export const concatenateAudioFiles = async (audioFiles) => {
  try {
    console.log("Starting concatenation of", audioFiles.length, "files");
    await ensureFFmpegLoaded();

    // Write files to memory
    for (let i = 0; i < audioFiles.length; i++) {
      const file = audioFiles[i];
      const fileName = `input_${i}.mp3`;
      console.log(`Writing file ${fileName} to FFmpeg memory`);
      await ffmpeg.writeFile(fileName, await fetchFile(file));
    }

    // Create concat file
    const concatContent = audioFiles
      .map((_, i) => `file 'input_${i}.mp3'`)
      .join("\n");

    console.log("Creating concat list file");
    await ffmpeg.writeFile("concat_list.txt", concatContent);

    // Run concatenation command
    console.log("Running FFmpeg concatenation command");
    await ffmpeg.exec([
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      "concat_list.txt",
      "-c",
      "copy",
      "output_concat.mp3",
    ]);

    // Read the result
    console.log("Reading concatenated output");
    const outputData = await ffmpeg.readFile("output_concat.mp3");

    // Clean up files
    console.log("Cleaning up temporary files");
    try {
      await ffmpeg.deleteFile("output_concat.mp3");
      await ffmpeg.deleteFile("concat_list.txt");

      for (let i = 0; i < audioFiles.length; i++) {
        await ffmpeg.deleteFile(`input_${i}.mp3`);
      }
    } catch (cleanupError) {
      console.warn("Error during cleanup:", cleanupError);
      // Continue execution even if cleanup fails
    }

    console.log("Concatenation complete, output size:", outputData.length);
    return outputData;
  } catch (error) {
    console.error("Error concatenating audio files:", error);
    throw new Error(
      "Failed to concatenate audio files: " + (error.message || "Unknown error")
    );
  }
};

/**
 * Detects and trims silence from audio
 * @param {Uint8Array} inputData - Audio data to process
 * @param {Object} options - Silence detection options
 * @param {number} options.threshold - Silence threshold in dB (e.g., -30)
 * @param {number} options.duration - Minimum silence duration in seconds (e.g., 0.1)
 * @returns {Promise<Uint8Array>} - Processed audio as Uint8Array
 */
export const trimSilence = async (
  inputData,
  options = { threshold: -30, duration: 0.1 }
) => {
  try {
    console.log("Starting silence trimming with options:", options);
    await ensureFFmpegLoaded();

    // Write input file to memory
    console.log("Writing input file to FFmpeg memory");
    await ffmpeg.writeFile("input.mp3", inputData);

    // Run silence detection and trimming command
    console.log("Running FFmpeg silence detection command");
    await ffmpeg.exec([
      "-i",
      "input.mp3",
      "-af",
      `silenceremove=stop_periods=-1:stop_threshold=${options.threshold}dB:stop_duration=${options.duration}:window=0.02`,
      "-c:a",
      "libmp3lame",
      "-q:a",
      "2",
      "output_trimmed.mp3",
    ]);

    // Read the result
    console.log("Reading trimmed output");
    const outputData = await ffmpeg.readFile("output_trimmed.mp3");

    // Clean up files
    console.log("Cleaning up temporary files");
    try {
      await ffmpeg.deleteFile("input.mp3");
      await ffmpeg.deleteFile("output_trimmed.mp3");
    } catch (cleanupError) {
      console.warn("Error during cleanup:", cleanupError);
      // Continue execution even if cleanup fails
    }

    console.log("Silence trimming complete, output size:", outputData.length);
    return outputData;
  } catch (error) {
    console.error("Error trimming silence:", error);
    throw new Error(
      "Failed to trim silence: " + (error.message || "Unknown error")
    );
  }
};

/**
 * Detects and trims silence from multiple audio files
 * @param {File[]} audioFiles - Array of audio files to process
 * @param {Object} options - Silence detection options
 * @returns {Promise<Uint8Array>} - Processed audio as Uint8Array
 */
export const processAudioFiles = async (audioFiles, options) => {
  try {
    console.log(
      `Processing ${audioFiles.length} audio files with options:`,
      options
    );

    // First concatenate the files
    const concatenatedData = await concatenateAudioFiles(audioFiles);
    console.log("Concatenation complete. Size:", concatenatedData.length);

    // Then trim silence
    const trimmedData = await trimSilence(concatenatedData, options);
    console.log("Silence trimming complete. Size:", trimmedData.length);

    return trimmedData;
  } catch (error) {
    console.error("Error in audio processing pipeline:", error);
    throw error;
  }
};

/**
 * Test function to verify FFmpeg is working
 * @returns {Promise<boolean>} - True if FFmpeg is working
 */
export const testFFmpeg = async () => {
  try {
    console.log("Testing audio processor...");
    await ensureFFmpegLoaded();

    // Try a simple FFmpeg command
    await ffmpeg.exec(["-version"]);
    console.log("Audio processor test successful!");
    return true;
  } catch (error) {
    console.error("Audio processor test failed:", error);
    return false;
  }
};

export default {
  ensureFFmpegLoaded,
  concatenateAudioFiles,
  trimSilence,
  processAudioFiles,
  testFFmpeg,
};
