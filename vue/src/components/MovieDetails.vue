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
import { onBeforeMount } from 'vue-demi';
const getMovie = async (movieId) => {
  const response = await fetch(`http://localhost:3000/api/movies/${movieId}`);
  const movie = await response.json();

  return movie;
};

export default {
  props: {
    movieId: String
  },
  setup({ movieId }) {
    const movie = ref(null);

    onBeforeMount(async () => {
      const movieData = await getMovie(movieId)
      movie.value = movieData
    })

    return { movie };
  }
};
</script>

<style></style>
