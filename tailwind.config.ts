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
        'recipe-overlay':
          'linear-gradient(180deg, #FFF -21.31%, rgba(255, 255, 255, 0.00) 89.4%)',
      },
      colors: {
        neutral: {
          gray: {
            1: '#F1F5F5',
            2: '#97A2B0',
            3: '#E3EBEC',
            4: '#E6EBF2',
            5: '#748189',
          },
          dark: '#0A2533',
        },
        brand: {
          primary: '#042628',
          secondary: '#70B9BE',
          dark: '#4D8194',
          danger: '#f64e4e',
        },
      },
      dropShadow: {
        nav: '0px -10px 40px rgba(149, 168, 196, 0.15)',
      },
      boxShadow: {
        card: '0px 2px 16px rgba(6, 51, 54, 0.1)',
      },
      padding: {
        nav: '5.3125rem',
      },
      height: {
        nav: '5.3125rem',
        42: '10.5rem',
      },
      maxWidth: {
        50: '12.5rem',
      },
      borderRadius: {
        'recipe-container': '1.75rem 2.125rem',
      },
    },
  },
  plugins: [],
};
export default config;
