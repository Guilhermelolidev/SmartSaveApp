import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        blue: {
          600: '#2563EB',
          700: '#1D4ED8',
        },
        slate: {
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
        },
        white: '#FFFFFF',
        black: '#000000',
        green: {
          400: '#4ADE80',
          700: '#15803D',
          800: '#166534',
        },
        red: {
          400: '#F87171',
          600: '#DC2626',
        },
        yellow: {
          400: '#FACC15',
          500: '#D97706',
        },
      },
      fontFamily: {
        roboto: ['var(--font-roboto)'],
        opensans: ['var(--font-opensans)'],
      },
      fontSize: {
        13: '0.8125rem',
        14: '0.875rem',
        16: '1rem',
        18: '1.125rem',
        20: '1.25rem',
        24: '1.5rem',
        30: '1.875rem',
        32: '2rem',
      },
      borderRadius: {
        default: '1rem',
        tabs: '1.25rem',
      },
      height: {
        btn: '3.625rem',
        input: '4.375rem',
        tabs: '4.25rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
