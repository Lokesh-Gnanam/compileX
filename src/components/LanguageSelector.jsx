import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { LANGUAGES } from '../constants/languages';

export default function LanguageSelector({ selectedLanguage, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = LANGUAGES.find(l => l.id === selectedLanguage) || LANGUAGES[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="language-selector-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl
          bg-slate-800/80 hover:bg-slate-700/80
          border border-white/8 hover:border-white/14
          text-slate-200 text-sm font-medium
          transition-all duration-200 ease-in-out
          backdrop-blur-sm no-select"
        style={{ minWidth: 160 }}
      >
        <span className="text-base leading-none">{current.icon}</span>
        <span className="flex-1 text-left">{current.name}</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className="dropdown-menu absolute left-0 top-[calc(100%+6px)] z-50 min-w-[200px]
            glass-panel rounded-xl overflow-hidden shadow-2xl
            border border-white/8"
        >
          {LANGUAGES.map(lang => (
            <button
              key={lang.id}
              id={`lang-option-${lang.id}`}
              onClick={() => {
                onLanguageChange(lang.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left
                transition-all duration-150 ease-in-out
                ${selectedLanguage === lang.id
                  ? 'bg-accent-indigo/20 text-accent-purple border-l-2 border-accent-indigo'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                }`}
            >
              <span className="text-base">{lang.icon}</span>
              <div className="flex-1">
                <div className="font-medium">{lang.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">.{lang.fileExtension}</div>
              </div>
              {selectedLanguage === lang.id && (
                <div className="w-2 h-2 rounded-full bg-accent-violet" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
