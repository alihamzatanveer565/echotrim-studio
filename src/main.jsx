import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Performance monitoring
const startTime = performance.now();

// Add browser compatibility check
const checkBrowserCompatibility = () => {
  // Check for WebAssembly support
  if (typeof WebAssembly === 'undefined') {
    console.warn('WebAssembly is not supported in this browser');
    return false;
  }
  
  // Check for SharedArrayBuffer support (needed for FFmpeg.wasm)
  try {
    // eslint-disable-next-line no-new
    new SharedArrayBuffer(1);
  } catch (e) {
    console.warn('SharedArrayBuffer is not supported in this browser');
    return false;
  }
  
  return true;
};

// Log browser compatibility
const isCompatible = checkBrowserCompatibility();
console.log('Browser compatibility check:', isCompatible ? 'Passed' : 'Failed');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Log performance metrics
window.addEventListener('load', () => {
  const loadTime = performance.now() - startTime;
  console.log(`Page fully loaded in ${loadTime.toFixed(2)}ms`);
});