import { useState, useEffect } from "react";

function BrowserTest() {
  const [compatibility, setCompatibility] = useState({
    webAssembly: false,
    sharedArrayBuffer: false,
    crossOriginIsolated: false,
    allSupported: false
  });

  useEffect(() => {
    const checkCompatibility = () => {
      const webAssembly = typeof WebAssembly !== "undefined";
      let sharedArrayBuffer = false;
      
      try {
        // eslint-disable-next-line no-new
        new SharedArrayBuffer(1);
        sharedArrayBuffer = true;
      } catch (e) {
        console.warn("SharedArrayBuffer not supported", e);
      }

      const crossOriginIsolated = window.crossOriginIsolated;

      setCompatibility({
        webAssembly,
        sharedArrayBuffer,
        crossOriginIsolated,
        allSupported: webAssembly && sharedArrayBuffer && crossOriginIsolated
      });
    };

    checkCompatibility();
  }, []);

  return (
    <div className="bg-black bg-opacity-20 rounded-xl p-6 backdrop-blur-sm shadow-xl">
      <h3 className="text-xl font-semibold mb-4">Browser Compatibility Test</h3>
      
      <div className="space-y-2">
        <div className={`flex items-center ${compatibility.webAssembly ? 'text-green-400' : 'text-red-400'}`}>
          <span className="mr-2">{compatibility.webAssembly ? '✅' : '❌'}</span>
          WebAssembly Support
        </div>
        
        <div className={`flex items-center ${compatibility.sharedArrayBuffer ? 'text-green-400' : 'text-red-400'}`}>
          <span className="mr-2">{compatibility.sharedArrayBuffer ? '✅' : '❌'}</span>
          SharedArrayBuffer Support
        </div>
        
        <div className={`flex items-center ${compatibility.crossOriginIsolated ? 'text-green-400' : 'text-red-400'}`}>
          <span className="mr-2">{compatibility.crossOriginIsolated ? '✅' : '❌'}</span>
          Cross-Origin Isolation
        </div>
      </div>
      
      {compatibility.allSupported ? (
        <div className="mt-4 p-3 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg">
          <p className="text-green-400 font-semibold">✅ Browser is compatible with audio processing</p>
        </div>
      ) : (
        <div className="mt-4 p-3 bg-red-900 bg-opacity-30 border border-red-700 rounded-lg">
          <p className="text-red-400 font-semibold">❌ Browser is not compatible with audio processing</p>
          <p className="text-sm text-gray-300 mt-2">
            Please use a modern browser with SharedArrayBuffer support enabled.
          </p>
        </div>
      )}
    </div>
  );
}

export default BrowserTest;
