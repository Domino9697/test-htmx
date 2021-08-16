<template>
  <div v-if="movie">
    <h1>{{ movie.title }}</h1>
    <div class="movie-info">
      <div class="movie-image-container">
        <img class="movie-image" :src="movie.poster_path" :alt="movie.title" />
      </div>
      <div class="movie-description">
        <p>{{ movie.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
const getMovie = async (movieId) => {
  const response = await fetch(`http://localhost:3000/api/movies/${movieId}`);
  const movie = await response.json();

  return movie;
};

export default {
  setup() {
    const movie = ref(null);

    return { movie };
  },

  async beforeRouteEnter(to, from, next) {
    const movie = await getMovie(to.params.movieId);
    next((vm) => {
      vm.movie = movie;
    });
  },
};
</script>

<style></style>
