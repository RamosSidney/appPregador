/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-space': '#07090E',
        'dark-card': '#0F172A',
        'dark-surface': '#1E293B',
        'neon-purple': '#A855F7',
        'neon-cyan': '#06B6D4',
        'neon-amber': '#F59E0B',
        'neon-pink': '#EC4899',
        'neon-emerald': '#10B981',
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.35)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.35)',
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.35)',
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
