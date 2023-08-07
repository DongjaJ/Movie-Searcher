import Movies from '@/views/Movies.vue';

const routes = [
  {
    path: '/movies/:keyword',
    name: 'Movies',
    component: Movies,
  },
];
export default routes;
