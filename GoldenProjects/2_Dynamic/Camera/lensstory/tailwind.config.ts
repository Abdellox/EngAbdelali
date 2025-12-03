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
        'pitch-black': '#111111',
        'steel-grey': '#303030',
        'lens-blue': '#1E90FF',
        'aperture-white': '#F5F5F5',
      },
    },
  },
  plugins: [],
}
export default config
