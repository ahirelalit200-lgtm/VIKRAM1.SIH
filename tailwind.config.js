/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          bg: '#F4F6F8',
          sidebar: '#1F2933',
          sidebarHover: '#2A3644',
          sidebarActive: '#15202B',
          primary: '#1E3A5F',
          primaryHover: '#162C47',
          steel: '#526B82',
          steelLight: '#E8ECF0',
          card: '#FFFFFF',
          border: '#D5DCE3',
          borderLight: '#E5EAEF',
          text: '#263238',
          textMuted: '#60717D',
          success: '#2E7D5B',
          successBg: '#EDF7F2',
          warning: '#B7791F',
          warningBg: '#FFF8EB',
          critical: '#B84242',
          criticalBg: '#FDF2F2',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        DEFAULT: '6px',
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
      }
    },
  },
  plugins: [],
}
