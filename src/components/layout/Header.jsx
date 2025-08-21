import React from "react";
import { Music } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-500 to-purple-700 text-white shadow-lg backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-3 sm:py-4">
          <div className="flex items-center space-x-3">
            <Music className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Silence Cutter
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
