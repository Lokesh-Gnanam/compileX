import { useState, useCallback, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import CodeEditor from './components/CodeEditor';
import InputPanel from './components/InputPanel';
import OutputPanel from './components/OutputPanel';
import StatusBar from './components/StatusBar';
import Footer from './components/Footer';
import { LANGUAGES, getLanguageById, DEFAULT_LANGUAGE_ID } from './constants/languages';
import { executeCode } from './services/api';

const MIN_EDITOR_WIDTH = 35; // percentage
const MAX_EDITOR_WIDTH = 80;

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE_ID);
  const [code, setCode] = useState(getLanguageById(DEFAULT_LANGUAGE_ID).defaultCode);
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [serverOnline, setServerOnline] = useState(true);
  const [cooldownSeconds, setCooldownSeconds] = useState(0); // 30-sec cooldown after run
  const cooldownTimerRef = useRef(null);
  // Resizable split pane state
  const [editorWidth, setEditorWidth] = useState(60);
  const isDragging = useRef(false);
  const containerRef = useRef(null);
  const dividerRef = useRef(null);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0F172A';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#F1F5F9';
    }
  }, [darkMode]);

  const handleLanguageChange = useCallback((langId) => {
    setSelectedLanguage(langId);
    setCode(getLanguageById(langId).defaultCode);
    setOutput(null);
    setError(false);
    setExecutionTime(null);
  }, []);

  const startCooldown = () => {
    // Clear any existing cooldown timer
    if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    setCooldownSeconds(30);
    cooldownTimerRef.current = setInterval(() => {
      setCooldownSeconds(prev => {
        if (prev <= 1) {
          clearInterval(cooldownTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleRun = async () => {
    if (isRunning || cooldownSeconds > 0) return;
    setIsRunning(true);
    setOutput(null);
    setError(false);
    setExecutionTime(null);

    const startTime = Date.now();
    try {
      const result = await executeCode({
        code,
        language: selectedLanguage,
        stdin,
      });

      const elapsed = result.executionTime || (Date.now() - startTime);
      setExecutionTime(elapsed);
      setServerOnline(true);

      // Determine if there's an error
      const statusId = result.status?.id;
      if (statusId && statusId !== 3 && statusId !== 0) {
        // Non-accepted status
        const errText = result.stderr || result.stdout || `Runtime Error (Status: ${result.status?.description})`;
        setOutput(errText);
        setError(true);
      } else if (result.stderr && !result.stdout) {
        setOutput(result.stderr);
        setError(true);
      } else {
        setOutput(result.stdout || '(No output)');
        setError(false);
      }
    } catch (err) {
      setServerOnline(false);
      setExecutionTime(Date.now() - startTime);
      setOutput(err.response?.data?.error || err.message || 'Failed to connect to execution server.');
      setError(true);
    } finally {
      setIsRunning(false);
      startCooldown();
    }
  };

  // Cleanup cooldown timer on unmount
  useEffect(() => {
    return () => { if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current); };
  }, []);

  // Drag-to-resize logic
  const handleDividerMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
    if (dividerRef.current) {
      dividerRef.current.classList.add('dragging');
    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(MAX_EDITOR_WIDTH, Math.max(MIN_EDITOR_WIDTH, newWidth));
    setEditorWidth(clamped);
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    if (dividerRef.current) {
      dividerRef.current.classList.remove('dragging');
    }
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  // Keyboard shortcut: Ctrl+Enter to run
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, selectedLanguage, stdin, isRunning]);

  return (
    <div
      className={`flex flex-col h-screen overflow-hidden ${darkMode ? 'bg-slate-950' : 'bg-slate-100'}`}
    >
      {/* Top Navigation */}
      <Navbar
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        onRun={handleRun}
        isRunning={isRunning}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(prev => !prev)}
        cooldownSeconds={cooldownSeconds}
      />

      {/* Main Workspace */}
      <main
        ref={containerRef}
        className="flex flex-1 overflow-hidden"
        style={{ marginTop: '64px', marginBottom: '36px' }}
        id="main-workspace"
      >
        {/* Code Editor Pane */}
        {/* Desktop: side-by-side with resize; Mobile: stacked */}
        <div
          className={`hidden md:flex flex-col overflow-hidden
            ${darkMode ? 'bg-slate-900/60' : 'bg-white/80'}
            border-r border-white/5`}
          style={{ width: `${editorWidth}%`, flexShrink: 0 }}
        >
          <CodeEditor
            language={selectedLanguage}
            code={code}
            onChange={setCode}
            darkMode={darkMode}
          />
        </div>

        {/* Resize Handle (Desktop only) */}
        <div
          ref={dividerRef}
          className="hidden md:block resize-handle"
          onMouseDown={handleDividerMouseDown}
          title="Drag to resize"
        />

        {/* Right Pane: Input + Output */}
        <div
          className={`flex flex-col flex-1 min-w-0 overflow-hidden
            ${darkMode ? 'bg-slate-900/40' : 'bg-slate-50/80'}`}
        >
          {/* Input Panel */}
          <div
            className={`flex-1 flex flex-col overflow-hidden border-b
              ${darkMode ? 'border-white/6 bg-slate-800/30' : 'border-slate-200 bg-white/60'}`}
            style={{ minHeight: 0 }}
          >
            <InputPanel value={stdin} onChange={setStdin} />
          </div>

          {/* Output Panel */}
          <div
            className={`flex-1 flex flex-col overflow-hidden
              ${darkMode ? 'bg-black/70' : 'bg-slate-900/95'}`}
            style={{ minHeight: 0 }}
          >
            <OutputPanel
              output={output}
              isRunning={isRunning}
              executionTime={executionTime}
              error={error}
            />
          </div>
        </div>

        {/* Mobile: stacked layout */}
        <div className="flex md:hidden flex-col w-full overflow-hidden">
          {/* Mobile Editor */}
          <div
            className={`flex-1 overflow-hidden border-b ${darkMode ? 'border-white/6 bg-slate-900/60' : 'border-slate-200 bg-white'}`}
            style={{ minHeight: '280px', maxHeight: '45vh' }}
          >
            <CodeEditor
              language={selectedLanguage}
              code={code}
              onChange={setCode}
              darkMode={darkMode}
            />
          </div>
          {/* Mobile Input */}
          <div
            className={`overflow-hidden border-b ${darkMode ? 'border-white/6 bg-slate-800/30' : 'border-slate-200 bg-white/60'}`}
            style={{ height: '140px' }}
          >
            <InputPanel value={stdin} onChange={setStdin} />
          </div>
          {/* Mobile Output */}
          <div
            className={`flex-1 overflow-hidden ${darkMode ? 'bg-black/80' : 'bg-slate-900/95'}`}
            style={{ minHeight: '180px' }}
          >
            <OutputPanel
              output={output}
              isRunning={isRunning}
              executionTime={executionTime}
              error={error}
            />
          </div>
        </div>
      </main>

      {/* Footer with links and attribution */}
      <Footer />
    </div>
  );
}
