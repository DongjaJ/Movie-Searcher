<template>
  <p
    v-if="isLoading"
    class="text-zinc-100">
    loading...
  </p>
  <p
    v-else-if="error"
    class="text-zinc-100">
    {{ error.message }}
  </p>
  <ul v-else>
    <li
      v-for="movie in movies.data.Search"
      :key="movie.imdbID"
      class="text-zinc-100">
      {{ movie.Title }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import useMovies from '../hooks/useMovies';

const { movies, isLoading, error } = useMovies();
</script>
