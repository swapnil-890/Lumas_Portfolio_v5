/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#090A0F', // layered charcoal base
        surface: '#0F1018', // panel
        elevated: '#12131A', // raised panel
        overlay: '#181A22', // modal / command palette
        border: '#1E2028', // default 1px border
        'border-hi': '#2A2E3A', // hover border
        muted: '#8A8E9A',
        subtle: '#5A5F6B',
        fg: '#E8E9EE',
        accent: '#4C8DFF', // scientific blue (unchanged)
        'accent-dim': '#2B5AA8',
        'accent-glow': 'rgba(76,141,255,0.18)',
      },
      fontFamily: {
        sans: ['"Geist"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
    },
  },
  plugins: [],
}
