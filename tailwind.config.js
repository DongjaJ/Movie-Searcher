export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#646cff',
      },
      backgroundImage: {
        banner: `url('/images/banner.jpg')`,
      },
    },
  },
  plugins: [],
};
