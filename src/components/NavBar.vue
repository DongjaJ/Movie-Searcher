<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const keyword = ref(route.params.keyword ?? '');

function handleSubmit(): void {
  const trimedKeyword = keyword.value.trim();
  const isEmptyKeyword = trimedKeyword.length === 0;
  if (isEmptyKeyword) {
    return;
  }

  router.push({ name: 'Movies', params: { keyword: trimedKeyword } });
}

function handleInput({ target }: InputEvent): void {
  keyword.value = (target as HTMLInputElement).value;
}

watch(
  () => route.params,
  (params) => {
    keyword.value = params?.keyword ? params.keyword : '';
  },
  { immediate: true },
);
</script>

<template>
  <header class="flex w-full text-2xl p-4 items-center">
    <RouterLink to="/">
      <div class="flex items-center gap-2 text-normal-vite">
        <i class="fa-solid fa-video text-4xl"></i>
        <h1 class="font-bold text-3xl ml-2">Movies</h1>
      </div>
    </RouterLink>
    <form
      class="flex justify-center w-full"
      @submit.prevent="handleSubmit">
      <input
        class="w-7/12 p-3 pl-5 bg-black text-light-vite outline-none border-s rounded-s-lg placeholder:text-zinc-400"
        placeholder="Search..."
        :value="keyword"
        @input="handleInput" />
      <button class="bg-normal-vite px-4 text-zinc-100 border-e rounded-e-lg">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  </header>
</template>
