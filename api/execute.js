// Vercel Serverless Function - /api/execute.js
// Uses the free public Judge0 CE endpoint — no API key required

const PUBLIC_JUDGE0 = 'https://ce.judge0.com';

// Standard CE language IDs (match ce.judge0.com exactly)
const LANGUAGE_IDS = {
  javascript: 63,   // Node.js (12.14.0)
  python: 71,       // Python (3.8.1)
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

    // Submit to public Judge0 CE
    const submitResponse = await fetch(`${PUBLIC_JUDGE0}/submissions?base64_encoded=false&wait=true`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: stdin,
        cpu_time_limit: 5,
        memory_limit: 128000,
      }),
    });

    if (!submitResponse.ok) {
      const errText = await submitResponse.text();
      return res.status(502).json({ error: `Judge0 error (HTTP ${submitResponse.status}): ${errText}` });
    }

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
