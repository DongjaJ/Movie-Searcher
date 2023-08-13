export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#646cff',
      },
      backgroundImage: {
        banner: `url('/images/banner.jpg')`,
        InternetMovieDatabase: `url('/images/imdb.svg')`,
        RottenTomatoes: `url('/images/rottenTomato.svg')`,
        Metacritic: `url('/images/metacritic.svg')`,
      },
    },
  },
  plugins: [],
};
