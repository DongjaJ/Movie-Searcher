<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const keyword = ref<string | string[]>(route.params.keyword);

function handleSubmit(): void {
  if (typeof keyword.value !== 'string') {
    throw new Error('keyword is not string');
  }

  const trimedKeyword = keyword.value.trim();
  const isEmptyKeyword = trimedKeyword.length === 0;
  if (isEmptyKeyword) {
    return;
  }

  const firstPage = 1;
  router.push({
    name: 'Movies',
    params: { keyword: trimedKeyword, page: firstPage },
  });
}

function handleInput(event: Event): void {
  const { value } = event.target as HTMLInputElement;
  keyword.value = value;
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
      <div
        class="flex items-center gap-2 text-brand after:content-[''] md:after:content-['Movies'] after:ml-2 after:font-bold after:text-3xl">
        <i class="fa-solid fa-video text-4xl"></i>
      </div>
    </RouterLink>
    <form
      class="flex justify-center w-full"
      @submit.prevent="handleSubmit">
      <input
        class="w-7/12 p-3 pl-5 bg-black text-brand outline-none border-brand border rounded-s-lg placeholder:text-zinc-400"
        placeholder="Search..."
        :value="keyword"
        @input="handleInput" />
      <button
        class="bg-brand px-4 text-zinc-100 border-e rounded-e-lg hover:brightness-95">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  </header>
</template>
