<template>
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
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const props = defineProps<{ totalPages: number }>();

const route = useRoute();
const router = useRouter();
const currentPage = computed(getCurrentPage);
const currentPages = computed(getCurrentPages);

function handleClickPrevPage() {
  const isFirstPage = currentPage.value === 1;
  if (isFirstPage) {
    return;
  }
  handleClickPage(currentPage.value - 1);
}

function handleClickNextPage() {
  const isLastPage = currentPage.value === props.totalPages;
  if (isLastPage) {
    return;
  }
  handleClickPage(currentPage.value + 1);
}

function handleClickPage(page: number) {
  if (isCurrentPage(page)) return;
  router.push({
    name: 'Movies',
    params: {
      keyword: route.params.keyword,
      page,
    },
  });
}

function isCurrentPage(page: number) {
  return currentPage.value === page;
}

function getCurrentPage() {
  return parseInt(route.params.page as string);
}

function getCurrentPages() {
  const start = Math.floor((currentPage.value - 1) / 5) * 5 + 1;
  const end = Math.min(start + 4, props.totalPages);
  const pages = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index,
  );
  return pages;
}
</script>
