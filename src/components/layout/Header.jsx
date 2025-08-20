import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white py-8 sm:py-12 mb-6 sm:mb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            🎵 Silence Cutter
          </h1>
          <p className="text-white text-base sm:text-lg max-w-xl mx-auto px-4">
            Remove silence from audio files with advanced audio processing
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
