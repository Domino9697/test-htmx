<template>
  <div class="home">
    <div v-if="movies.length !== 0" class="gallery">
      <div
        class="gallery-panel"
        v-for="movie in movies"
        :key="movie._id"
        @click="openDetails(movie._id)"
      >
        <img :src="movie.poster_path" />
        <p>{{ movie.title }}</p>
      </div>
      <div ref="target"></div>
    </div>
  </div>

  <Modal v-model="showModal" :close="closeModal">
    <div class="modal">
      <div class="modal-content">
        <MovieDetails :movieId="currentMovieId" />
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { onMounted, ref, watchEffect } from "@vue/runtime-core";
import { useIntersectionObserver } from "@vueuse/core";
import MovieDetails from "./MovieDetails.vue"

const getMovies = async (page = 0) => {
  const response = await fetch(
    `http://localhost:3000/api/movies/list?page=${page}`
  );
  const movies = await response.json();
  console.log(movies);
  return movies;
};

const target = ref(null);
const targetIsVisible = ref(false);

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    targetIsVisible.value = isIntersecting;
  }
);

const page = ref(0);
const movies = ref([]);

onMounted(async () => {
  console.log(movies.value);
  movies.value = await getMovies();
  console.log(movies.value);
});

watchEffect(async () => {
  if (targetIsVisible.value) {
    page.value++;
    const newMovies = await getMovies(page.value);
    movies.value = [...movies.value, ...newMovies];
  }
});

const showModal = ref(false)
const currentMovieId = ref(null)

const openDetails = (movieId) => {
  currentMovieId.value = movieId
  showModal.value = true
};

const closeModal = () => {
  currentMovieId.value = null
  showModal.value = false
}

</script>

<style>
.home {
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 1rem;
  max-width: 80rem;
  margin: 5rem auto;
  padding: 0 5rem;
}

.gallery-panel {
  text-align: center;
}

.gallery-panel img {
  width: 100%;
  object-fit: cover;
  border-radius: 0.75rem;
}

.gallery-panel img:hover {
  opacity: 50%;
  cursor: pointer;
}

.modal {
  /* Underlay covers entire screen. */
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: rgba(0, 0, 0, 0.5);

  /* Flexbox centers the .modal-content vertically and horizontally */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-content {
  /* Position visible dialog near the top of the window */
  margin-top: 10vh;

  /* Sizing for visible dialog */
  width: 80%;
  max-width: 600px;

  /* Display properties for visible dialog*/
  border: solid 1px #999;
  border-radius: 8px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
  background-color: white;
  padding: 20px;
}
</style>
