import { useState } from 'react';
import { Copy, Check, Terminal, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export default function OutputPanel({ output, isRunning, executionTime, error }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasOutput = output !== null && output !== undefined && output !== '';
  const isSuccess = hasOutput && !error;
  const isError = !!error;

  return (
    <div className="flex flex-col h-full" id="output-panel">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/6 shrink-0">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-4 h-4 text-slate-500" />
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Output Terminal
          </h3>

          {/* Status Badge */}
          {isRunning && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md
              bg-yellow-500/10 border border-yellow-500/20 animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <span className="text-[11px] font-medium text-yellow-400">Executing...</span>
            </div>
          )}
          {!isRunning && isSuccess && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md
              bg-green-500/10 border border-green-500/20 animate-fade-in">
              <CheckCircle2 className="w-3 h-3 text-green-400" />
              <span className="text-[11px] font-medium text-green-400">Success</span>
            </div>
          )}
          {!isRunning && isError && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md
              bg-red-500/10 border border-red-500/20 animate-fade-in">
              <AlertCircle className="w-3 h-3 text-red-400" />
              <span className="text-[11px] font-medium text-red-400">Error</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Execution time */}
          {executionTime !== null && !isRunning && (
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <Clock className="w-3 h-3" />
              <span>{executionTime}ms</span>
            </div>
          )}
          {/* Copy button */}
          <button
            id="copy-output-btn"
            onClick={handleCopy}
            disabled={!hasOutput}
            className={`flex items-center justify-center w-7 h-7 rounded-lg
              transition-all duration-200 ease-in-out
              ${hasOutput
                ? 'text-slate-400 hover:text-slate-200 hover:bg-white/8 cursor-pointer'
                : 'text-slate-600 cursor-not-allowed opacity-50'
              }`}
            title="Copy Output"
          >
            {copied
              ? <Check className="w-3.5 h-3.5 text-green-400" />
              : <Copy className="w-3.5 h-3.5" />
            }
          </button>
        </div>
      </div>

      {/* Terminal Area */}
      <div className="flex-1 output-terminal p-4 overflow-auto relative">
        {/* Running spinner */}
        {isRunning && (
          <div className="flex items-center gap-3 text-yellow-400 font-mono text-sm animate-pulse">
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-yellow-400"
                  style={{
                    animation: `bounce 0.8s ease-in-out ${i * 0.15}s infinite`,
                  }}
                />
              ))}
            </div>
            <span className="text-slate-400">Compiling and executing...</span>
          </div>
        )}

        {/* No output state */}
        {!isRunning && !hasOutput && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <Terminal className="w-10 h-10 text-slate-700" />
            <div>
              <p className="text-slate-600 text-sm font-medium">No output yet</p>
              <p className="text-slate-700 text-xs mt-1">Click <span className="text-orange-500 font-semibold">Run Code</span> to execute your program</p>
            </div>
          </div>
        )}

        {/* Output/Error content */}
        {!isRunning && hasOutput && (
          <div className="animate-fade-in">
            {/* Prompt */}
            <div className="flex items-center gap-2 mb-3 text-xs text-slate-600">
              <span className="text-green-500">▶</span>
              <span>Program Output</span>
              <span className="flex-1 border-t border-slate-800 ml-2" />
            </div>
            {/* Output text */}
            <pre
              className={`font-mono text-sm leading-relaxed whitespace-pre-wrap break-words
                ${isError ? 'text-red-400' : 'text-green-300'}`}
            >
              {output}
            </pre>
          </div>
        )}

        {/* Blinking cursor */}
        {!isRunning && (
          <span
            className="inline-block w-2 h-4 bg-green-500 ml-0.5 align-middle"
            style={{ animation: 'cursorBlink 1.2s step-end infinite' }}
          />
        )}
      </div>

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
