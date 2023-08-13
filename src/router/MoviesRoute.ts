import Movies from '@/views/Movies.vue';

const routes = [
  {
    path: '/movies/:keyword/:page',
    name: 'Movies',
    component: Movies,
  },
];
export default routes;
