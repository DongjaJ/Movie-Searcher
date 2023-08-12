<script setup lang="ts">
import { useRouter } from 'vue-router';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const props = defineProps<{ movie: Movie }>();

const router = useRouter();

function handleClick() {
  router.push({ name: 'MovieDetail', params: { movieId: props.movie.imdbID } });
}
</script>

<template>
  <li
    class="text-zinc-100 sepia hover:sepia-0 hover:-translate-y-2 hover:scale-105 ease-in-out duration-300 cursor-pointer"
    @click="handleClick">
    <img
      :src="
        movie.Poster !== 'N/A'
          ? movie.Poster.replace('SX300', 'SX700')
          : movie.Poster
      "
      class="w-full rounded-md"
      alt="" />
    <h4 class="mb-2 font-bold text-xl">{{ movie.Title }}</h4>
    <p class="opacity-80">{{ movie.Year }}</p>
    <p class="opacity-80">{{ movie.Type }}</p>
  </li>
</template>
