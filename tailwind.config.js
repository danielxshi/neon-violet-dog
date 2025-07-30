/** @type {import('tailwindcss').Config} */

const screens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

function getResponsiveValue(minWidth, maxWidth, minFontSize, maxFontSize) {
  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth)
  const yAxisIntersection = -minWidth * slope + minFontSize

  return `clamp( ${minFontSize}px, ${yAxisIntersection}px + ${slope * 100}vw, ${maxFontSize}px)`
}

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // adjust for your structure
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        // you can add other CSS vars here too (e.g. card, accent, success, etc.)
      },
      fontSize: {
        tiny: [getResponsiveValue(screens.sm, screens['2xl'], 12, 14), '1.2em'],
        small: [getResponsiveValue(screens.sm, screens['2xl'], 12, 16), '1.2em'],
        medium: [getResponsiveValue(screens.sm, screens['2xl'], 20, 30), '1.075em'],
        big: [getResponsiveValue(screens.sm, screens['2xl'], 30, 100), '1.075em'],
        articleHeader: [getResponsiveValue(screens.sm, screens['2xl'], 30, 48), '1.075em'],
        articleBody: [getResponsiveValue(screens.sm, screens['2xl'], 16, 24), '1.4em'],
      },
      letterSpacing: {
        'big-text': '-0.02em',
      },
      borderColor: {
        DEFAULT: 'hsl(var(--border) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
