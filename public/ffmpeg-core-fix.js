// FFmpeg Core Fix
// This file will attempt to preload FFmpeg's core files
// to ensure they're available when needed

document.addEventListener("DOMContentLoaded", function () {
  // Attempt to preload FFmpeg core files
  const preloadFFmpeg = async () => {
    try {
      console.log("Preloading FFmpeg core files...");

      // Create non-visible iframes to preload each core file
      const corePaths = [
        "https://unpkg.com/@ffmpeg/core@0.12.10/dist/ffmpeg-core.js",
        "https://unpkg.com/@ffmpeg/core@0.12.10/dist/ffmpeg-core.wasm",
        "https://unpkg.com/@ffmpeg/core@0.12.10/dist/ffmpeg-core.worker.js",
      ];

      // Create a hidden container
      const container = document.createElement("div");
      container.style.display = "none";
      document.body.appendChild(container);

      // Add a preload link for each file
      corePaths.forEach((path) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = path;
        link.as = path.endsWith(".js")
          ? "script"
          : path.endsWith(".wasm")
          ? "fetch"
          : "script";
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);

        // For JS files, also create a script tag
        if (path.endsWith(".js")) {
          const script = document.createElement("script");
          script.setAttribute("data-ffmpeg-preload", "true");
          script.src = path;
          script.async = true;
          script.type = "text/javascript";
          container.appendChild(script);
        }
      });

      console.log("FFmpeg core preloading setup complete");
    } catch (error) {
      console.warn("Error preloading FFmpeg:", error);
    }
  };

  // Call the preload function
  preloadFFmpeg();
});
