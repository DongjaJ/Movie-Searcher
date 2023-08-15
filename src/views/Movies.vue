<template>
  <Loader v-if="isLoading || isFetching"></Loader>
  <p
    v-else-if="isError"
    class="text-zinc-100">
    error
  </p>
  <p
    v-else-if="movies?.Search == null"
    class="text-zinc-100">
    No Results
  </p>
  <div v-else>
    <h3 class="text-zinc-100 p-2 pl-4 mb-4 text-2xl">
      Search Results: {{ movies?.totalResults }}
    </h3>
    <ul
      class="grid grid-col-1 p-2 gap-4 gap-y-6 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      <MovieCard
        v-for="movie in movies?.Search"
        :key="movie.imdbID"
        :movie="movie" />
    </ul>
    <ThePagination :total-pages="totalPages" />
  </div>
</template>

<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue';
import Loader from '@/components/Loader.vue';
import ThePagination from '@/components/ThePagination.vue';
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import { reactive, watch, computed } from 'vue';
import searcher from '@/apis';
import { IMovieResponse } from '@/interface/movies';

const { movies, isLoading, isError, isFetching } = useMovies();
const totalPages = computed(getTotalPages);

function getTotalPages() {
  const totalResults = parseInt(movies.value?.totalResults as string);
  return Math.ceil(totalResults / 10);
}

function useMovies() {
  const route = useRoute();
  const params = reactive(route.params);
  const queryKey = reactive(['movies', params.keyword, params.page]);
  const {
    data: movies,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery<IMovieResponse>(queryKey, () =>
    searcher.search({
      keyword: params.keyword as string,
      page: parseInt(params.page as string),
    }),
  );

  watch(
    () => route.params,
    (newParams) => {
      params.keyword = newParams.keyword;
      params.page = newParams.page;
      refetch();
    },
    { immediate: true },
  );

  return { movies, isLoading, isError, isFetching };
}
</script>
