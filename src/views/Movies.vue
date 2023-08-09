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
  <ul
    v-else
    class="grid grid-col-1 p-2 gap-4 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
    <MovieCard
      v-for="movie in movies.Search"
      :key="movie.imdbID"
      :movie="movie" />
  </ul>
</template>

<script setup lang="ts">
import MovieCard from '../components/MovieCard.vue';
import { useQuery, useQueryClient } from 'vue-query';
import axios, { Axios } from 'axios';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute();
const queryClient = useQueryClient();

const API_END_POINT = 'https://omdbapi.com';

async function getMovies(keyword) {
  const axiosInstance: Axios = axios.create({
    baseURL: API_END_POINT,
    params: {
      apikey: import.meta.env.VITE_API_KEY,
    },
  });
  const response = await axiosInstance.get('', { params: { s: keyword } });
  return response.data;
}

function useMovies() {
  const { keyword } = route.params;
  const keywordRef = ref(keyword);
  const { data, isLoading, error } = useQuery(
    ['movies', keywordRef.value],
    () => getMovies(keywordRef.value),
  );

  watch(
    () => route.params.keyword,
    (newKeyword) => {
      keywordRef.value = newKeyword;
      queryClient.invalidateQueries('movies');
    },
    { immediate: false },
  );

  return { movies: data, isLoading, error };
}

const { movies, isLoading, error } = useMovies();
</script>
