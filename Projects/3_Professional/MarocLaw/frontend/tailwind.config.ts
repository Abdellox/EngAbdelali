import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        'primary-hover': '#1d4ed8',
        secondary: '#7c3aed',
        accent: '#0891b2',
      },
    },
  },
  plugins: [],
}
export default config
