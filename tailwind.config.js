export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-vite': '#535bf2',
        'normal-vite': '#646cff',
        'light-vite': '#747bff',
        'vue-green': '#41B883',
        'vue-light-green': '#4dc08d',
        'vue-dark-green': '#344a5e',
        gray: '#888',
      },
      dropShadow: {
        vite: '0 0 2rem #646cffaa',
        vue: '0 0 2rem #42b883aa',
      },
    },
  },
  plugins: [],
};
