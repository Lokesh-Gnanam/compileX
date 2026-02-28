import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// Load .env file manually (Vite doesn't expose it to the config/plugin context)
const envPath = resolve(process.cwd(), '.env')
if (existsSync(envPath)) {
  const lines = readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    const key = trimmed.slice(0, idx).trim()
    const val = trimmed.slice(idx + 1).trim()
    if (!process.env[key]) process.env[key] = val
  }
}


// Local dev API handler (mirrors api/execute.js for Vercel)
const LANGUAGE_IDS = {
  javascript: 63, python: 71, java: 62, cpp: 54,
  c: 50, typescript: 74, go: 60, rust: 73, ruby: 72, php: 68,
};

function localApiPlugin() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use('/api/execute', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.writeHead(200);
          res.end();
          return;
        }
        if (req.method !== 'POST') {
          res.writeHead(405);
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }
        let body = '';
        req.on('data', chunk => (body += chunk));
        req.on('end', async () => {
          try {
            const { code, language, stdin = '' } = JSON.parse(body);
            const langId = LANGUAGE_IDS[language?.toLowerCase()];
            if (!langId) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: `Unsupported language: ${language}` }));
              return;
            }
            const apiKey = process.env.JUDGE0_API_KEY || '';
            const startTime = Date.now();
            if (!apiKey) {
              // Demo mode without API key
              await new Promise(r => setTimeout(r, 900 + Math.random() * 300));
              const demos = {
                javascript: `Hello, World! Welcome to CompileX.\nFibonacci: 0 1 1 2 3 5 8 13 21 34 \n[Demo Mode] Configure JUDGE0_API_KEY for real execution`,
                python: `Hello, Developer! Writing Python on CompileX.\nFibonacci: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]\nSquares: [1, 4, 9, 16, 25]\n[Demo Mode] Configure JUDGE0_API_KEY for real execution`,
                java: `Hello, World! Welcome to CompileX.\nFibonacci: 0 1 1 2 3 5 8 13 21 34 \nSorted: [1, 2, 3, 5, 8, 9]\n[Demo Mode] Configure JUDGE0_API_KEY for real execution`,
                cpp: `Hello, World! Welcome to CompileX.\nFibonacci: 0 1 1 2 3 5 8 13 21 34 \nSorted: 1 2 3 5 8 9 \n[Demo Mode] Configure JUDGE0_API_KEY for real execution`,
                c: `Hello, World! Welcome to CompileX.\nFibonacci: 0 1 1 2 3 5 8 13 21 34 \nSorted: 1 2 3 5 8 9 \n[Demo Mode] Configure JUDGE0_API_KEY for real execution`,
                typescript: `Hello, Developer! Writing TypeScript on CompileX.\n42\nCompileX\nDirection: UP\n[Demo Mode] Configure JUDGE0_API_KEY for real execution`,
              };
              const output = demos[language?.toLowerCase()] || `[Demo Mode] Executed ${language} code.\nConfigure JUDGE0_API_KEY for real execution.`;
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                stdout: output, stderr: '',
                status: { id: 3, description: 'Accepted' },
                time: '0.089', memory: 3200,
                executionTime: Date.now() - startTime,
              }));
              return;
            }
            // Real Judge0 call
            const apiHost = process.env.JUDGE0_API_HOST || 'judge0-ce.p.rapidapi.com';
            const baseUrl = `https://${apiHost}`;
            const resp = await fetch(`${baseUrl}/submissions?base64_encoded=false&wait=true`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': apiHost,
              },
              body: JSON.stringify({ source_code: code, language_id: langId, stdin, cpu_time_limit: 5 }),
            });
            const result = await resp.json();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ...result, executionTime: Date.now() - startTime }));

          } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), localApiPlugin()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
})
