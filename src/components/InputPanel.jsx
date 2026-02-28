import { Trash2 } from 'lucide-react';

export default function InputPanel({ value, onChange }) {
  return (
    <div className="flex flex-col h-full" id="input-panel">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/6 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 rounded-full bg-gradient-to-b from-accent-violet to-accent-indigo" />
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Standard Input
          </h3>
          <span className="lang-badge">stdin</span>
        </div>
        <button
          id="clear-input-btn"
          onClick={() => onChange('')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs
            text-slate-500 hover:text-red-400 hover:bg-red-500/10
            border border-transparent hover:border-red-500/20
            transition-all duration-200 ease-in-out"
          title="Clear Input"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>
      </div>

      {/* Textarea */}
      <div className="flex-1 relative">
        <textarea
          id="stdin-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter program input here (stdin)&#10;&#10;Example:&#10;5&#10;hello world"
          className="absolute inset-0 w-full h-full resize-none
            bg-transparent
            font-mono text-sm text-slate-300 placeholder-slate-600
            px-4 py-3 outline-none
            transition-colors duration-200
            leading-relaxed"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
