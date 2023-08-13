<template>
  <Loader v-if="isLoading || isFetching"></Loader>
  <p
    v-else-if="isError"
    class="text-zinc-100">
    error
  </p>
  <ul
    v-else-if="movies"
    class="grid grid-col-1 p-2 gap-4 gap-y-6 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
    <MovieCard
      v-for="movie in movies?.Search"
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

export interface ResponseValue {
  Search: Movie[];
  totalResults: string;
  Response: string;
}
export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const { movies, isLoading, isError, isFetching } = useMovies();

function useMovies() {
  const route = useRoute();
  const { keyword } = route.params;
  const keywordRef = ref(keyword);
  const {
    data: movies,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery<ResponseValue>(['movies', keywordRef.value], () =>
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

  return { movies, isLoading, isError, isFetching };
}
</script>
