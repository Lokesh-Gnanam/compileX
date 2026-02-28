/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#0F172A',
          900: '#0f1629',
          850: '#111827',
        },
        panel: '#1E293B',
        accent: {
          purple: '#C9BEFF',
          violet: '#8494FF',
          indigo: '#6367FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'run-gradient': 'linear-gradient(135deg, #FF5F00, #FFC300, #FFD400)',
        'run-gradient-hover': 'linear-gradient(135deg, #FF6B00, #FFD000, #FFE000)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-dot': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'glow-orange': '0 0 20px rgba(255, 95, 0, 0.4)',
        'glow-purple': '0 0 20px rgba(99, 103, 255, 0.3)',
        'panel': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}
