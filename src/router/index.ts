import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Movies from '@/views/Movies.vue';
import MovieDetail from '@/views/MovieDetail.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/movies/:keyword/:page',
      name: 'Movies',
      component: Movies,
    },
    {
      path: '/movie/detail/:movieId',
      name: 'MovieDetail',
      component: MovieDetail,
    },
  ],
});

export default router;
