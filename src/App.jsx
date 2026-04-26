import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import FileUploader from "./components/features/FileUploader";
import Settings from "./components/features/Settings";
import ProcessingStatus from "./components/features/ProcessingStatus";
import DownloadButton from "./components/features/DownloadButton";
import { useAudioProcessor } from "./hooks/useAudioProcessor";

function App() {
  const [files, setFiles] = useState([]);
  const [settings, setSettings] = useState({ threshold: -30, duration: 0.6 });
  const [browserSupported, setBrowserSupported] = useState(true);

  const {
    isProcessing,
    progress,
    error,
    processingStats,
    hasProcessedAudio,
    processFiles,
    getDownloadUrl,
    reset,
  } = useAudioProcessor();

  // Check browser compatibility
  useEffect(() => {
    const checkBrowserSupport = () => {
      // Check for WebAssembly support
      if (typeof WebAssembly === "undefined") {
        setBrowserSupported(false);
        return;
      }

      // Check for SharedArrayBuffer support (needed for FFmpeg.wasm)
      try {
        // eslint-disable-next-line no-new
        new SharedArrayBuffer(1);
      } catch (e) {
        console.warn("SharedArrayBuffer not supported", e);
        setBrowserSupported(false);
        return;
      }

      setBrowserSupported(true);
    };

    checkBrowserSupport();
  }, []);

  const handleFilesSelected = useCallback(
    (selectedFiles) => {
      setFiles(selectedFiles);
      reset();
    },
    [reset]
  );

  const handleSettingsChange = useCallback(
    (newSettings) => {
      setSettings(newSettings);
      reset();
    },
    [reset]
  );

  const handleProcessClick = useCallback(() => {
    if (files.length > 0) {
      processFiles(files, settings);
    }
  }, [files, settings, processFiles]);

  const handleProcessAgain = useCallback(() => {
    reset();
    setFiles([]); // Clear the files array when going back to process another audio
  }, [reset]);

  if (!browserSupported) {
    return (
      <div className="min-h-screen bg-brand-bg px-6 py-10">
        <div className="mx-auto w-full max-w-5xl">
          <Header />

          <main className="mx-auto mt-10 max-w-4xl">
            <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-8 backdrop-blur-md">
              <h3 className="mb-4 text-xl font-semibold text-red-200">
                Browser Not Supported
              </h3>
              <p className="text-red-50/90">
                This application requires a modern browser with WebAssembly and
                SharedArrayBuffer support.
              </p>
              <p className="mt-4 text-red-50/90">
                Please try using the latest version of Chrome, Edge, or Firefox.
              </p>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-brand-bg">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-35" />
      <div className="pointer-events-none absolute inset-x-0 top-[-180px] mx-auto h-[520px] w-[920px] rounded-full bg-gradient-to-r from-blue-500/20 via-sky-500/20 to-cyan-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-blue-300/15 blur-3xl" />

      <Header />

      <div className="relative mx-auto w-full max-w-5xl px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <main className="mx-auto max-w-4xl space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
          >
            <p className="mb-4 inline-flex rounded-full border border-blue-300/40 bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
              Browser-based audio cleanup
            </p>
            <h2 className="text-2xl font-semibold leading-tight text-white sm:text-4xl">
              Trim silence from your audio in seconds.
            </h2>
            <p className="mt-4 max-w-3xl text-sm text-slate-300 sm:text-base">
              Upload, reorder, tune your silence settings, and export a polished
              WAV file without sending your recordings to any server.
            </p>
          </motion.section>

          <div className="space-y-8 rounded-3xl border border-white/10 bg-surface-900/45 p-4 shadow-xl backdrop-blur-xl sm:p-8">
            {/* Show upload and settings only when not processed or when processing */}
            {(!hasProcessedAudio || isProcessing) && (
              <>
                {/* Upload Area */}
                <div className="rounded-2xl border border-white/20 bg-white/95 p-3 shadow-xl sm:p-4">
                  <FileUploader onFilesSelected={handleFilesSelected} />
                </div>

                {/* Settings Area */}
                <div className="rounded-2xl border border-white/20 bg-white/95 shadow-xl">
                  <Settings
                    onChange={handleSettingsChange}
                    disabled={isProcessing}
                  />
                </div>

                {/* Process Button */}
                {files.length > 0 && !isProcessing && !hasProcessedAudio && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleProcessClick}
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-blue-700/30 transition-all duration-300 hover:scale-[1.02] hover:from-blue-500 hover:to-cyan-500 sm:text-lg"
                      disabled={isProcessing}
                    >
                      Process Audio Files
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Error Message (custom styling) */}
            {error && (
              <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-6">
                <h3 className="mb-4 flex items-center text-xl font-semibold text-red-200">
                  <span className="mr-2">⚠️</span>
                  Error
                </h3>
                <p className="text-red-50/90">{error}</p>
              </div>
            )}

            {/* Processing Status */}
            <ProcessingStatus
              isProcessing={isProcessing}
              progress={progress}
              error={null} /* Pass null to avoid default error display */
              processingStats={processingStats}
            />

            {/* Download Button */}
            <DownloadButton
              downloadUrl={hasProcessedAudio ? getDownloadUrl() : null}
            />

            {/* Process Again Button - shown only when audio has been processed */}
            {hasProcessedAudio && !isProcessing && (
              <div className="flex justify-center">
                <button
                  onClick={handleProcessAgain}
                  className="inline-flex items-center justify-center rounded-xl border border-blue-300/35 bg-blue-500/10 px-8 py-3 text-base font-semibold text-blue-100 shadow-lg shadow-blue-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300/60 hover:bg-blue-500/20 hover:shadow-blue-800/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:text-lg"
                >
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-cyan-300" />
                  Process Another Audio
                </button>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
