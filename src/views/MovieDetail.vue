<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import { computed } from 'vue';
import searcher from '../apis';
import Loader from '../components/Loader.vue';

function useMovieDetail() {
  const route = useRoute();
  const { movieId } = route.params;
  const movieIdRef = ref(movieId);
  const { data, isLoading, error, isFetching, refetch } = useQuery(
    ['movieDetail', movieIdRef.value],
    () => searcher.getMovieDetail({ movieId: movieIdRef.value as string }),
  );

  watch(
    () => route.params.movieId,
    (movieId) => {
      movieIdRef.value = movieId;
      refetch();
    },
    { immediate: true },
  );

  return { movieDetail: data, isLoading, error, isFetching };
}

let { movieDetail, isLoading, error, isFetching } = useMovieDetail();

Chart.register(...registerables);

//imdb, rotten tamato, metacritic

const imdb = {
  datasets: [
    {
      data: [95, 5],
      backgroundColor: ['#f6c518', '#121212'],
    },
  ],
  options: {
    responsive: true,
  },
};

const rottenTamato = computed(() => ({
  datasets: [
    {
      data: [95, 5],
      backgroundColor: ['#f83206', '#ffffff'],
    },
  ],
}));

const metacritic = {
  datasets: [
    {
      data: [95, 5],
      backgroundColor: ['#ffcd31', '#111111'],
    },
  ],
};
</script>

<template>
  <Loader v-if="isLoading || isFetching" />
  <p
    v-else-if="error"
    class="text-zinc-100">
    {{ error.message }}
  </p>
  <section
    v-else
    class="text-zinc-200 p-4 px-16">
    <h2 class="text-4xl px-4">
      {{ movieDetail.Title }}
    </h2>
    <div class="flex text-2xl gap px-4">
      <p class="after:content-['·'] after:mx-2 after:text-zinc-500">
        {{ movieDetail.Type }}
      </p>
      <p class="after:content-['·'] after:mx-2 after:text-zinc-500">
        {{ movieDetail.Year }}
      </p>
      <p>{{ movieDetail.Rated }}</p>
    </div>
    <section class="bg-zinc-100 text-black my-2 rounded-2xl p-4">
      <div class="flex gap-4 overflow-hidden border-b p-2">
        <img
          :src="
            movieDetail.Poster !== 'N/A'
              ? movieDetail.Poster.replace('SX300', 'SX700')
              : movieDetail.Poster
          "
          :alt="movieDetail.Title"
          class="w-full basis-7/12 h-96 rounded-2xl" />
        <section>
          <h3 class="text-3xl font-bold mb-2">Basic Information</h3>
          <p>outline: {{ movieDetail.Genre }}</p>
          <p>{{ movieDetail.Country }}</p>
          <p>{{ movieDetail.Runtime }}</p>
          <p>released: {{ movieDetail.Released }}</p>
          <p class="line-clamp-3 pl-2 border-l-4 border-zinc-400">
            {{ movieDetail.Plot }}
          </p>
          <p>rating: {{ movieDetail.imdbRating }}</p>
          <p>boxOffice: {{ movieDetail.BoxOffice }}</p>
        </section>
      </div>
      <section class="border-b p-2">
        <h3 class="text-3xl font-bold mb-2">Directing and Appearing</h3>
        <p>Derectors: {{ movieDetail.Director }}</p>
        <p>Writers: {{ movieDetail.Writer }}</p>
        <p>Actors: {{ movieDetail.Actors }}</p>
      </section>

      <section class="p-2">
        <h3 class="text-3xl font-bold mb-2">Rating</h3>
        <ul class="flex justify-around">
          <li
            v-for="rating in movieDetail.Ratings"
            :key="rating.Source">
            <p>{{ rating.Source }}</p>
            <p>{{ rating.Value }}</p>
          </li>
        </ul>
        <div class="flex justify-between">
          <DoughnutChart :chart-data="imdb" />
          <DoughnutChart :chart-data="rottenTamato" />
          <DoughnutChart :chart-data="metacritic" />
        </div>
      </section>
    </section>
  </section>
</template>
