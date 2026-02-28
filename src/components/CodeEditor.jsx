import { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { getLanguageById } from '../constants/languages';

const DARK_THEME_RULES = [
  { token: 'keyword', foreground: '8494FF', fontStyle: 'bold' },
  { token: 'keyword.control', foreground: 'C9BEFF', fontStyle: 'bold' },
  { token: 'string', foreground: 'FFD400' },
  { token: 'string.escape', foreground: 'FFC300' },
  { token: 'number', foreground: 'FF9D4D' },
  { token: 'comment', foreground: '4B5563', fontStyle: 'italic' },
  { token: 'type', foreground: '6EE7B7' },
  { token: 'variable', foreground: 'E2E8F0' },
  { token: 'function', foreground: '93C5FD' },
  { token: 'operator', foreground: 'C9BEFF' },
];

function beforeMount(monaco) {
  monaco.editor.defineTheme('compilex-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: DARK_THEME_RULES,
    colors: {
      'editor.background': '#0D1525',
      'editor.foreground': '#E2E8F0',
      'editorLineNumber.foreground': '#334155',
      'editorLineNumber.activeForeground': '#8494FF',
      'editor.lineHighlightBackground': '#1E293B88',
      'editor.selectionBackground': '#6367FF33',
      'editor.inactiveSelectionBackground': '#6367FF1A',
      'editorCursor.foreground': '#FF5F00',
      'editor.findMatchBackground': '#FFC30033',
      'editor.findMatchHighlightBackground': '#FFD40022',
      'editorBracketMatch.background': '#6367FF22',
      'editorBracketMatch.border': '#8494FF',
      'editorIndentGuide.background': '#1E293B',
      'editorIndentGuide.activeBackground': '#334155',
      'scrollbar.shadow': '#00000066',
      'scrollbarSlider.background': '#33415566',
      'scrollbarSlider.hoverBackground': '#47556988',
      'scrollbarSlider.activeBackground': '#64748B',
    },
  });

  monaco.editor.defineTheme('compilex-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: '4F46E5', fontStyle: 'bold' },
      { token: 'string', foreground: '16A34A' },
      { token: 'number', foreground: 'EA580C' },
      { token: 'comment', foreground: '94A3B8', fontStyle: 'italic' },
    ],
    colors: {
      'editor.background': '#F8FAFC',
      'editor.foreground': '#0F172A',
      'editorLineNumber.foreground': '#CBD5E1',
      'editorLineNumber.activeForeground': '#4F46E5',
    },
  });
}

export default function CodeEditor({ language, code, onChange, darkMode }) {
  const editorRef = useRef(null);
  const langConfig = getLanguageById(language);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    editor.focus();
  }

  return (
    <div className="flex flex-col h-full" id="code-editor-panel">
      {/* File Tab */}
      <div className="flex items-center gap-2 px-4 py-2.5 panel-tab shrink-0">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg
          bg-slate-900/80 border border-white/8
          text-xs font-mono text-slate-300">
          <span>{langConfig.icon}</span>
          <span className="text-slate-400">main</span>
          <span className="text-orange-400">.{langConfig.fileExtension}</span>
        </div>
        <div className="flex items-center gap-1.5 ml-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 monaco-editor-container overflow-hidden">
        <Editor
          height="100%"
          language={langConfig.monacoId}
          value={code}
          onChange={onChange}
          beforeMount={beforeMount}
          onMount={handleEditorDidMount}
          theme={darkMode ? 'compilex-dark' : 'compilex-light'}
          options={{
            fontSize: 14,
            fontFamily: '"JetBrains Mono", "Fira Code", Consolas, monospace',
            fontLigatures: true,
            lineHeight: 1.7,
            letterSpacing: 0.5,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            renderLineHighlight: 'line',
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            padding: { top: 16, bottom: 16 },
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            detectIndentation: false,
            renderWhitespace: 'selection',
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true,
            },
            suggest: {
              showKeywords: true,
              showSnippets: true,
            },
            quickSuggestions: true,
            formatOnPaste: true,
            formatOnType: true,
            scrollbar: {
              verticalScrollbarSize: 6,
              horizontalScrollbarSize: 6,
            },
          }}
        />
      </div>
    </div>
  );
}
