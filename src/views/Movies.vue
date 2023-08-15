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
    <div class="my-4 flex gap-4 justify-center items-center text-brand">
      <button
        class="w-8 h-8 md:w-16 md:h-16 rounded-full border text-sm md:text-2xl hover:bg-brand hover:text-zinc-200"
        @click="handleClickPrevPage">
        <i class="fa-solid fa-caret-left"></i>
      </button>
      <button
        v-for="page in currentPages"
        :key="page"
        class="w-8 h-8 md:w-16 md:h-16 rounded-full border text-sm md:text-2xl hover:bg-brand hover:text-zinc-200"
        :class="
          isCurrentPage(page)
            ? 'bg-brand text-zinc-200 brightness-90 hover:brightness-100 transition-colors'
            : ''
        "
        @click="handleClickPage(page)">
        {{ page }}
      </button>
      <button
        class="w-8 h-8 md:w-16 md:h-16 rounded-full border text-sm md:text-2xl hover:bg-brand hover:text-zinc-200"
        @click="handleClickNextPage">
        <i class="fa-solid fa-caret-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue';
import Loader from '@/components/Loader.vue';
import { useQuery } from '@tanstack/vue-query';
import { useRoute, useRouter } from 'vue-router';
import { reactive, watch, computed } from 'vue';
import searcher from '@/apis';
import { IMovieResponse } from '@/interface/movies';

const { movies, isLoading, isError, isFetching } = useMovies();

const route = useRoute();
const router = useRouter();

function getTotalPageNumber() {
  const totalResults = parseInt(movies.value?.totalResults as string);
  return Math.ceil(totalResults / 10);
}

function handleClickPrevPage() {
  const currentPage = parseInt(route.params.page as string);
  if (currentPage === 1) {
    return;
  }
  handleClickPage(currentPage - 1);
}

function handleClickNextPage() {
  const currentPage = parseInt(route.params.page as string);
  if (currentPage < getTotalPageNumber()) {
    handleClickPage(currentPage + 1);
  }
}

function handleClickPage(page: number) {
  const currentPage = parseInt(route.params.page as string);
  if (currentPage === page) return;
  router.push({
    name: '',
    params: {
      keyword: route.params.keyword,
      page,
    },
  });
}

function isCurrentPage(page: number) {
  const currentPage = parseInt(route.params.page as string);
  return currentPage === page;
}

const currentPages = computed(() => {
  const currentPage = parseInt(route.params.page as string);
  const start = Math.floor((currentPage - 1) / 5) * 5 + 1;
  const end = Math.min(start + 4, getTotalPageNumber());
  const pages = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index,
  );
  return pages;
});

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
