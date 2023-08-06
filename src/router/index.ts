import { createRouter, createWebHistory } from 'vue-router';
import homeRoute from './homeRoute';
import MovieRoute from './MoviesRoute';
import MovieDetailRoute from './MovieDetailRoute'

const routes=[
  ...homeRoute,
  ...MovieRoute,
  ...MovieDetailRoute
]

const router = createRouter({
  history:createWebHistory(),
  routes,
})

export default router
