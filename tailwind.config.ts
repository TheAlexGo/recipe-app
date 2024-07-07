import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        neutral: {
          gray: {
            1: '#F1F5F5',
            2: '#97A2B0',
            dark: '#0A2533',
          },
        },
        brand: {
          secondary: '#70B9BE',
          dark: '#4D8194',
        },
      },
      dropShadow: {
        nav: '0px -10px 40px rgba(149, 168, 196, 0.15)',
      },
      boxShadow: {
        card: '0px 2px 16px 0px rgba(6, 51, 54, 0.10)',
      },
      height: {
        nav: '85px',
        42: '10.5rem',
      },
      maxWidth: {
        50: '12.5rem',
      },
    },
  },
  plugins: [],
};
export default config;
