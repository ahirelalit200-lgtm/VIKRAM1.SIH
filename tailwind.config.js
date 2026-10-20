/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        command: {
          bg: '#040812',
          surface: '#091122',
          card: '#0D1830',
          cardHover: '#132244',
          border: '#1B2C52',
          borderLight: '#2A437C',
          cyan: '#00F0FF',
          blue: '#1E6BFF',
          accent: '#00D8F6',
          textMuted: '#8E9EB8',
          textBright: '#F0F4FC',
          radarGreen: '#00FF88',
          radarGreenDim: '#00AA55',
          alertRed: '#FF3355',
          warningAmber: '#FFB020',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', 'Rajdhani', 'system-ui', 'sans-serif'],
        display: ['Rajdhani', 'Orbitron', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -3px rgba(0, 240, 255, 0.35)',
        'glow-green': '0 0 20px -3px rgba(0, 255, 136, 0.35)',
        'glow-red': '0 0 20px -3px rgba(255, 51, 85, 0.35)',
        'hud-border': 'inset 0 0 15px rgba(0, 240, 255, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
