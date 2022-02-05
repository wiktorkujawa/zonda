module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/App.tsx'
  ],
  theme: {
    extend: {
      colors: {
        'pale-green': '#eefafa',
        'grass-green': '#5fbd58'
      }
    },
  },
  plugins: [],
}
