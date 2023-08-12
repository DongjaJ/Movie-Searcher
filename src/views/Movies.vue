<template>
  <Loader v-if="isLoading || isFetching"></Loader>
  <p
    v-else-if="error"
    class="text-zinc-100">
    {{ error.message }}
  </p>
  <ul
    v-else
    class="grid grid-col-1 p-2 gap-4 gap-y-6 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
    <MovieCard
      v-for="movie in movies.Search"
      :key="movie.imdbID"
      :movie="movie" />
  </ul>
</template>

<script setup lang="ts">
import MovieCard from '../components/MovieCard.vue';
import Loader from '../components/Loader.vue';
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import searcher from '../apis';

const { movies, isLoading, error, isFetching } = useMovies();

function useMovies() {
  const route = useRoute();
  const { keyword } = route.params;
  const keywordRef = ref(keyword);
  const {
    data: movies,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useQuery(['movies', keywordRef.value], () =>
    searcher.search({ keyword: keywordRef.value as string }),
  );

  watch(
    () => route.params,
    (params) => {
      if (params?.keyword) {
        keywordRef.value = params.keyword;
        refetch();
      }
    },
    { immediate: true },
  );

  return { movies, isLoading, error, isFetching };
}
</script>
