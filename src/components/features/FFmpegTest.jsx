import { useState, useRef } from "react";
import { testFFmpeg } from "../../services/ffmpeg/ffmpegService";

function FFmpegTest() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const messageRef = useRef(null);

  const load = async () => {
    try {
      setLoading(true);
      setTestResult(null);
      
      if (messageRef.current) {
        messageRef.current.innerHTML = "Testing audio processor...";
      }
      
      const result = await testFFmpeg();
      
      if (result) {
        setLoaded(true);
        setTestResult("Audio processor is working correctly!");
        if (messageRef.current) {
          messageRef.current.innerHTML = "Audio processor test successful!";
        }
      } else {
        setTestResult("Audio processor test failed!");
        if (messageRef.current) {
          messageRef.current.innerHTML = "Audio processor test failed!";
        }
      }
      
      setLoading(false);
    } catch (err) {
      console.log(err);
      setTestResult("Error: " + err.message);
      if (messageRef.current) {
        messageRef.current.innerHTML = "Error: " + err.message;
      }
      setLoading(false);
    }
  };

  return (
    <div className="bg-black bg-opacity-20 rounded-xl p-6 backdrop-blur-sm shadow-xl">
      <h3 className="text-xl font-semibold mb-4">Audio Processor Test</h3>
      
      {loaded ? (
        <>
          <div className="bg-green-900 bg-opacity-30 border border-green-700 rounded-lg p-4 mb-4">
            <p className="text-green-400 font-semibold">✅ {testResult}</p>
          </div>
          <p ref={messageRef} className="text-sm text-gray-300 mb-4"></p>
          <button 
            onClick={load}
            className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all shadow-lg transform hover:scale-105 duration-200"
          >
            Test Again
          </button>
        </>
      ) : (
        <>
          {loading && <p className="text-blue-400 mb-4">Testing audio processor...</p>}
          {testResult && testResult.includes("Error") && (
            <div className="bg-red-900 bg-opacity-30 border border-red-700 rounded-lg p-4 mb-4">
              <p className="text-red-400 font-semibold">❌ {testResult}</p>
            </div>
          )}
          <p ref={messageRef} className="text-sm text-gray-300 mb-4"></p>
          <button 
            onClick={load}
            className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all shadow-lg transform hover:scale-105 duration-200"
          >
            Test Audio Processor
          </button>
        </>
      )}
    </div>
  );
}

export default FFmpegTest;
