<script setup lang="ts">
import { getImageUrl } from '@/utils';

defineProps<{ src: string; title: string; year: string; type: string }>();
</script>

<template>
  <li
    class="text-zinc-100 sepia hover:sepia-0 hover:-translate-y-2 hover:scale-105 ease-in-out duration-300 cursor-pointer shadow-lg shadow-neutral-400">
    <img
      :src="getImageUrl(src)"
      class="w-full rounded-md"
      :alt="title" />
    <h4 class="mb-2 font-bold text-xl">{{ title }}</h4>
    <p class="opacity-80">{{ year }}</p>
    <p class="opacity-80">{{ type }}</p>
  </li>
</template>
