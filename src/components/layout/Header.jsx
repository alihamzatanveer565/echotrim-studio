import React from "react";
import { Music } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-surface-950/55 text-white shadow-lg backdrop-blur-xl">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-sky-700 p-2 shadow-md shadow-blue-900/50">
              <Music className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold sm:text-2xl">EchoTrim Studio</h1>
              <p className="text-xs text-slate-300 sm:text-sm">
                Privacy-first silence remover
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
