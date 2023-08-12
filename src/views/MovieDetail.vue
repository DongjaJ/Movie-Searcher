<script setup lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import axios, { Axios } from 'axios';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute();
const queryClient = useQueryClient();

const API_END_POINT = 'https://omdbapi.com';

async function getMovieDetail(movieId) {
  const axiosInstance: Axios = axios.create({
    baseURL: API_END_POINT,
    params: {
      apikey: import.meta.env.VITE_API_KEY,
    },
  });
  const response = await axiosInstance.get('', {
    params: { i: movieId, plot: 'full' },
  });
  return response.data;
}

function useMovieDetail() {
  const { movieId } = route.params;
  const movieIdRef = ref(movieId);
  const { data, isLoading, error, isFetching } = useQuery(
    ['movieDetail', movieIdRef.value],
    () => getMovieDetail(movieIdRef.value),
  );

  watch(
    () => route.params.movieId,
    (newMovieId: string) => {
      movieIdRef.value = newMovieId;
      queryClient.invalidateQueries('movieDetail');
    },
    { immediate: false },
  );

  return { movieDetail: data, isLoading, error, isFetching };
}

const { movieDetail, isLoading, error, isFetching } = useMovieDetail();
</script>

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
  <section
    v-else
    class="text-zinc-100">
    <h2>{{ movieDetail.Title }}</h2>
    <div class="flex">
      <p>{{ movieDetail.Type }}</p>
      <p>{{ movieDetail.Year }}</p>
      <p>{{ movieDetail.Rated }}</p>
    </div>
    <section class="basic-infromation">
      <h3>기본 정보</h3>
      <div class="flex">
        <img
          :src="
            movieDetail.Poster !== 'N/A'
              ? movieDetail.Poster.replace('SX300', 'SX700')
              : movieDetail.Poster
          "
          :alt="movieDetail.Title" />
        <div>
          <p>outline: {{ movieDetail.Genre }}</p>
          <p>{{ movieDetail.Country }}</p>
          <p>{{ movieDetail.Runtime }}</p>
          <p>released: {{ movieDetail.Released }}</p>
          <p>{{ movieDetail.Plot }}</p>
          <p>rating: {{ movieDetail.imdbRating }}</p>
          <p>boxOffice: {{ movieDetail.BoxOffice }}</p>
        </div>
      </div>
    </section>
    <section class="director-and-actors">
      <h3>감독 및 출연</h3>
      <p>감독: {{ movieDetail.Director }}</p>
      <p>작가: {{ movieDetail.Writer }}</p>
      <p>배우: {{ movieDetail.Actors }}</p>
    </section>
    <section class="rating">
      <h3>평점</h3>
      <ul>
        <li
          v-for="rating in movieDetail.Ratings"
          :key="rating.Source">
          <p>{{ rating.Source }}</p>
          <p>{{ rating.Value }}</p>
        </li>
      </ul>
    </section>
  </section>
</template>
