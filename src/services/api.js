import axios from 'axios';

const API_BASE = '/api';

export async function executeCode({ code, language, stdin = '' }) {
  const response = await axios.post(`${API_BASE}/execute`, {
    code,
    language,
    stdin,
  }, {
    timeout: 30000, // 30 second timeout
  });
  return response.data;
}
