// Vercel Serverless Function - /api/execute.js
// Handles code execution via Judge0 API

const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || '';
const JUDGE0_API_HOST = process.env.JUDGE0_API_HOST || 'judge0-ce.p.rapidapi.com';

// Language ID mapping for Judge0 API
const LANGUAGE_IDS = {
  javascript: 63,   // Node.js (18.15.0)
  python: 71,       // Python 3 (3.11.2)
  java: 62,         // Java (OpenJDK 13.0.1)
  cpp: 54,          // C++ (GCC 9.2.0)
  c: 50,            // C (GCC 9.2.0)
  typescript: 74,   // TypeScript (3.7.4)
  go: 60,           // Go (1.13.5)
  rust: 73,         // Rust (1.40.0)
  ruby: 72,         // Ruby (2.7.0)
  php: 68,          // PHP (7.4.1)
};

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, language, stdin = '' } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: 'Missing required fields: code and language' });
  }

  const languageId = LANGUAGE_IDS[language.toLowerCase()];
  if (!languageId) {
    return res.status(400).json({ error: `Unsupported language: ${language}` });
  }

  try {
    const startTime = Date.now();

    // If no API key configured, return a demo response
    if (!JUDGE0_API_KEY) {
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
      const execTime = Date.now() - startTime;
      
      // Simulate basic execution for demo without API key
      return res.status(200).json({
        stdout: getDemoOutput(language, code),
        stderr: '',
        status: { id: 3, description: 'Accepted' },
        time: (execTime / 1000).toFixed(3),
        memory: Math.floor(Math.random() * 5000) + 2000,
        executionTime: execTime,
      });
    }

    // Submit to Judge0
    const submitResponse = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': JUDGE0_API_KEY,
        'X-RapidAPI-Host': JUDGE0_API_HOST,
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: stdin,
        cpu_time_limit: 5,
        memory_limit: 128000,
      }),
    });

    const result = await submitResponse.json();
    const executionTime = Date.now() - startTime;

    return res.status(200).json({
      stdout: result.stdout || '',
      stderr: result.stderr || result.compile_output || '',
      status: result.status,
      time: result.time,
      memory: result.memory,
      executionTime,
    });

  } catch (error) {
    console.error('Execution error:', error);
    return res.status(500).json({
      error: 'Execution service unavailable',
      stderr: error.message,
    });
  }
}

function getDemoOutput(language, code) {
  // Basic demo outputs when no API key is configured
  const demos = {
    javascript: 'Hello, World!\n[Demo Mode: Configure JUDGE0_API_KEY for real execution]',
    python: 'Hello, World!\n[Demo Mode: Configure JUDGE0_API_KEY for real execution]',
    java: 'Hello, World!\n[Demo Mode: Configure JUDGE0_API_KEY for real execution]',
    cpp: 'Hello, World!\n[Demo Mode: Configure JUDGE0_API_KEY for real execution]',
    c: 'Hello, World!\n[Demo Mode: Configure JUDGE0_API_KEY for real execution]',
  };
  return demos[language.toLowerCase()] || `[Demo Mode] Code executed in ${language}\nConfigure JUDGE0_API_KEY environment variable for real execution.`;
}
