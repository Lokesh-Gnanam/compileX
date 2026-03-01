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


// Language IDs — these work for the public ce.judge0.com endpoint and judge0-ce RapidAPI
const LANGUAGE_IDS = {
  javascript: 63, python: 71, java: 62, cpp: 54,
  c: 50, typescript: 74, go: 60, rust: 73, ruby: 72, php: 68,
};

function getLanguageIds() { return LANGUAGE_IDS; }

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
            const langId = getLanguageIds()[language?.toLowerCase()];
            if (!langId) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: `Unsupported language: ${language}` }));
              return;
            }
            const startTime = Date.now();
            // Use free public Judge0 CE endpoint — no API key required
            const PUBLIC_JUDGE0 = 'https://ce.judge0.com';
            const resp = await fetch(`${PUBLIC_JUDGE0}/submissions?base64_encoded=false&wait=true`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ source_code: code, language_id: langId, stdin, cpu_time_limit: 5 }),
            });
            if (!resp.ok) {
              const errText = await resp.text();
              res.writeHead(502, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: `Judge0 API error (HTTP ${resp.status}): ${errText}` }));
              return;
            }
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
