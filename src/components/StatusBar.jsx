import { Wifi, WifiOff } from 'lucide-react';
import { getLanguageById } from '../constants/languages';

export default function StatusBar({ language, executionTime, serverOnline }) {
  const lang = getLanguageById(language);

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-50 h-8 flex items-center justify-between px-5
        bg-slate-950/95 border-t border-white/5 backdrop-blur-sm text-xs"
      id="status-bar"
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Language */}
        <div className="flex items-center gap-1.5 text-slate-400">
          <span>{lang.icon}</span>
          <span className="font-medium">{lang.name}</span>
        </div>

        <div className="w-px h-3.5 bg-slate-700" />

        {/* Server Status */}
        <div className="flex items-center gap-2 text-slate-500">
          {serverOnline ? (
            <>
              <div className="status-dot" />
              <span className="text-green-500/80">Server Online</span>
            </>
          ) : (
            <>
              <div className="status-dot error" />
              <span className="text-red-400/80">Server Offline</span>
            </>
          )}
        </div>

        <div className="w-px h-3.5 bg-slate-700" />

        {/* Branding */}
        <span className="text-slate-600 font-medium">
          CompileX <span className="text-slate-700">v1.0.0</span>
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 text-slate-500">
        {executionTime !== null && (
          <>
            <span>
              Execution: <span className="text-slate-400 font-medium">{executionTime}ms</span>
            </span>
            <div className="w-px h-3.5 bg-slate-700" />
          </>
        )}
        <span className="text-slate-600">
          UTF-8 &nbsp;•&nbsp; LF &nbsp;•&nbsp; Spaces: 2
        </span>
      </div>
    </footer>
  );
}
