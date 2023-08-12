<template>
  <p
    v-if="isLoading || isFetching"
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
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import searcher from '../apis';

const route = useRoute();
const queryClient = useQueryClient();

function useMovies() {
  const { keyword } = route.params;
  const keywordRef = ref(keyword);
  const { data, isLoading, error, isFetching } = useQuery(
    ['movies', keywordRef.value],
    () => searcher.search({ keyword: keywordRef.value }),
  );

  watch(
    () => route.params.keyword,
    (newKeyword: string) => {
      keywordRef.value = newKeyword;
      queryClient.invalidateQueries('movies');
    },
    { immediate: false },
  );

  return { movies: data, isLoading, error, isFetching };
}

const { movies, isLoading, error, isFetching } = useMovies();
</script>
