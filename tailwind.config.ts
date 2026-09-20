import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Single Source-of-Truth Semantic Tokens (§15.1)
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-border': 'var(--color-border)',
        'surface-border-strong': 'var(--color-border-strong)',
        fg: 'var(--color-fg)',
        'fg-dim': 'var(--color-fg-dim)',
        'fg-muted': 'var(--color-fg-muted)',
        signal: 'var(--color-signal)',

        // Deep tech & soft dark surfaces
        'deep-tech': '#08080a',
        'soft-dark': '#121216',

        // Vibrant Accents
        cyan: {
          DEFAULT: '#00f5ff',
          400: '#00f5ff',
          500: '#00b4d8',
        },
        violet: {
          DEFAULT: '#7c5cff',
          400: '#7c5cff',
          500: '#6342e6',
        },
        pink: {
          DEFAULT: '#ff3d9a',
          400: '#ff3d9a',
        },

        // Glass tokens
        glass: 'rgba(255, 255, 255, 0.028)',
        'glass-hover': 'rgba(255, 255, 255, 0.055)',

        // Border tokens
        'border-soft': 'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',

        slate: {
          950: '#020617',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
        },
        accent: {
          DEFAULT: '#f59e0b',
          muted: '#b45309',
        },
      },
      backgroundImage: {
        'gradient-v6': 'linear-gradient(110deg, #00e5ff 0%, #7c5cff 55%, #ff3d9a 100%)',
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(0, 229, 255, 0.25)',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#cbd5e1',
            '--tw-prose-headings': '#f1f5f9',
            '--tw-prose-links': '#f59e0b',
            '--tw-prose-code': '#f1f5f9',
            '--tw-prose-pre-bg': '#0f172a',
            '--tw-prose-pre-code': '#e2e8f0',
            '--tw-prose-quotes': '#94a3b8',
            '--tw-prose-captions': '#64748b',
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
