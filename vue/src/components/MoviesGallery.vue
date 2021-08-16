<template>
  <div class="home">
    <div class="gallery">
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
</template>

<script setup>
import { onMounted, ref, watchEffect } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useIntersectionObserver } from "@vueuse/core";

const getMovies = async (page = 0) => {
  const response = await fetch(`http://localhost:3000/api/movies/list?page=${page}`);
  const movies = await response.json();

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

const page = ref(0)
const movies = ref([]);

onMounted(async () => {
  movies.value = await getMovies();
});

watchEffect(async () => {
	if (targetIsVisible.value) {
		page.value++
		const newMovies = await getMovies(page.value)
		movies.value = [...movies.value, ...newMovies]
	}
})

const router = useRouter();

const openDetails = (movieId) => {
  console.log(movieId);
  router.push({
    name: "movieDetails",
    params: { movieId },
  });
};
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
</style>
