import { createRouter, createWebHistory } from 'vue-router'

import MoviesGallery from './components/MoviesGallery.vue'
import MovieDetails from './components/MovieDetails.vue'

const routes = [
  { name: 'movieList', path: '/', component: MoviesGallery },
  { name: 'movieDetails', path: '/:movieId', component: MovieDetails },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router