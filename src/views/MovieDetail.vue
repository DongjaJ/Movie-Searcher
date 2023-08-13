<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import searcher from '../apis';
import Loader from '../components/Loader.vue';
import { IMovieDetailResponse } from '@/interface/movieDetail';

function useMovieDetail() {
  const route = useRoute();
  const { movieId } = route.params;
  const movieIdRef = ref(movieId);
  const { data, isLoading, isError, isFetching, refetch } =
    useQuery<IMovieDetailResponse>(['movieDetail', movieIdRef.value], () =>
      searcher.getMovieDetail({ movieId: movieIdRef.value as string }),
    );

  watch(
    () => route.params.movieId,
    (movieId) => {
      movieIdRef.value = movieId;
      refetch();
    },
    { immediate: true },
  );

  return { movieDetail: data, isLoading, isError, isFetching };
}

const { movieDetail, isLoading, isError, isFetching } = useMovieDetail();

const isFullPlot = ref(false);

function togglePlot() {
  isFullPlot.value = !isFullPlot.value;
}
</script>

<template>
  <Loader v-if="isLoading || isFetching" />
  <p
    v-else-if="isError"
    class="text-zinc-100">
    error...
  </p>
  <section
    v-else-if="movieDetail"
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
      <div class="flex flex-col md:flex-row gap-4 overflow-hidden border-b p-2">
        <img
          :src="
            movieDetail.Poster !== 'N/A'
              ? movieDetail.Poster.replace('SX300', 'SX700')
              : movieDetail.Poster
          "
          :alt="movieDetail.Title"
          class="w-full basis-7/12 h-96 rounded-2xl" />
        <section class="flex flex-col gap-2">
          <h3 class="text-3xl font-bold mb-2">Basic Information</h3>
          <p class="text-2xl font-semibold">Genre</p>
          <p>
            {{ movieDetail.Genre }}
          </p>
          <p class="text-2xl font-semibold">Country</p>
          <ul class="flex">
            <li
              v-for="country in movieDetail.Country.split(',')"
              :key="country"
              class="after:content-['·'] after:mx-2 after:text-zinc-500 last:after:content=['']">
              {{ country }}
            </li>
          </ul>
          <p>
            {{ movieDetail.Runtime }}
          </p>
          <p>released: {{ movieDetail.Released }}</p>
          <p
            class="pl-2 border-l-4 border-zinc-400"
            :class="isFullPlot ? '' : 'line-clamp-3'">
            {{ movieDetail.Plot }}
          </p>
          <button
            v-if="isFullPlot"
            @click="togglePlot">
            간략히
          </button>
          <button
            v-else
            @click="togglePlot">
            더보기
          </button>
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
            <div
              :class="`bg-${rating.Source.split(' ').join('')}`"
              class="w-24 h-24 bg-cover"></div>
            <p>{{ rating.Source }}</p>
            <p>{{ rating.Value }}</p>
          </li>
        </ul>
      </section>
    </section>
  </section>
</template>
