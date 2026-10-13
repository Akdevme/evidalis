/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // User's Exact 6 Color Palette
        wheat: {
          DEFAULT: '#D5CBB9',
          light: '#E7DFD2',
          dark: '#BDB19C',
        },
        greige: {
          DEFAULT: '#C4BEB2',
          light: '#DCD7CE',
          dark: '#9F988A',
        },
        oat: {
          DEFAULT: '#E2D9CA',
          canvas: '#F7F5EF',
          surface: '#FAF7F2',
          border: '#D8CEBD',
        },
        charcoal: {
          DEFAULT: '#454641',
          dark: '#2B2C27',
          muted: '#686A63',
          dim: '#8F9188',
        },
        slate: {
          blue: '#71849A',
          'blue-hover': '#5E7086',
          'blue-light': 'rgba(113, 132, 154, 0.15)',
          'blue-border': 'rgba(113, 132, 154, 0.35)',
        },
        sage: {
          DEFAULT: '#78846A',
          hover: '#667159',
          light: 'rgba(120, 132, 106, 0.15)',
          border: 'rgba(120, 132, 106, 0.35)',
        },

        // Typography System per Contrast & Readability Refinement
        typography: {
          heading: '#35332F',
          body: '#45433D',
          secondary: '#625D54',
          muted: '#6B655B',
          placeholder: '#716A60',
          button: '#F4EFE6',
          link: '#425B72',
        },

        // Semantic Polarity (negative: red, positive: green)
        semantic: {
          positive: '#2E7D32',
          'positive-bg': 'rgba(46, 125, 50, 0.12)',
          'positive-border': 'rgba(46, 125, 50, 0.28)',
          negative: '#C62828',
          'negative-bg': 'rgba(198, 40, 40, 0.10)',
          'negative-border': 'rgba(198, 40, 40, 0.25)',
          warning: '#996515',
          'warning-bg': 'rgba(153, 101, 21, 0.12)',
          'warning-border': 'rgba(153, 101, 21, 0.25)',
        },

        // Brand System aliases mapped to user's palette
        brand: {
          primary: '#71849A',       // Slate blue
          'primary-hover': '#5E7086',
          secondary: '#78846A',     // Sage
          surface: '#ECECEC',
          'surface-warm': '#FAF7F2',// Warm Oat surface
          canvas: '#F7F5EF',        // Soft Oat canvas
          ink: '#454641',           // Charcoal
          'ink-muted': '#686A63',
          border: '#C4BEB2',        // Greige
          'border-light': '#DCD7CE',
          wheat: '#D5CBB9',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        wordmark: ["'Nearo Rounded'", 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(80% 80% at 50% 0%, #E8DFD1 0%, #F7F5EF 70%)',
        'subtle-oat': 'linear-gradient(180deg, #F7F5EF 0%, #EDE6D9 100%)',
      },
      boxShadow: {
        'card-soft': '0 2px 10px rgba(69, 70, 65, 0.06)',
        'card-elevated': '0 10px 30px rgba(69, 70, 65, 0.10)',
        'popover': '0 12px 36px rgba(69, 70, 65, 0.14)',
      },
    },
  },
  plugins: [],
};
