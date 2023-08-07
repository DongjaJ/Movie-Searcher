import MovieDetail from '@/views/MovieDetail.vue';

const routes = [
  {
    path: '/movie/detail/:movieId',
    name: 'MovieDetail',
    component: MovieDetail,
  },
];
export default routes;
