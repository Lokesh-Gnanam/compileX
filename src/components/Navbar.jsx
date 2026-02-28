import { Play, Moon, Sun, Zap } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

export default function Navbar({
  selectedLanguage,
  onLanguageChange,
  onRun,
  isRunning,
  darkMode,
  onToggleTheme,
}) {
  return (
    <header className="glass fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-5 gap-4">
      {/* Logo */}
      <div className="flex items-center gap-2.5 no-select" id="compilex-logo">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500/20 to-yellow-400/10 border border-orange-500/30">
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
            <path d="M4 10L7 7L4 4" stroke="#FF5F00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 13H16" stroke="#FFD400" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="flex flex-col -gap-1">
          <span className="text-xl font-bold tracking-tight text-gradient-sunset leading-none">
            Compile<span className="text-white">X</span>
          </span>
          <span className="text-[9px] font-medium text-slate-500 uppercase tracking-[0.12em] leading-none mt-0.5">
            Cloud Execution
          </span>
        </div>
      </div>

      {/* Center divider */}
      <div className="flex-1" />

      {/* Language Selector */}
      <div className="flex items-center gap-3">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={onLanguageChange}
        />

        {/* Theme Toggle */}
        <button
          id="theme-toggle-btn"
          onClick={onToggleTheme}
          className="flex items-center justify-center w-9 h-9 rounded-xl
            bg-slate-800/80 hover:bg-slate-700/80
            border border-white/8 hover:border-white/14
            text-slate-400 hover:text-slate-200
            transition-all duration-200 ease-in-out"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Run Button */}
        <button
          id="run-code-btn"
          onClick={onRun}
          disabled={isRunning}
          className={`run-btn flex items-center gap-2 px-5 py-2.5 rounded-xl
            text-sm font-bold text-gray-900 no-select shadow-glow-orange
            ${isRunning ? 'opacity-70 cursor-not-allowed scale-95' : ''}`}
        >
          {isRunning ? (
            <>
              <Zap className="w-4 h-4 animate-pulse relative z-10" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-gray-900 relative z-10" />
              <span>Run Code</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
