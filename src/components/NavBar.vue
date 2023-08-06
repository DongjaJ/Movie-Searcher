<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'NavBar'
  })
</script>

<template>
  <header class="flex w-full text-2xl p-4 items-center border-b mb-2">
    <div class="flex items-center gap-2 text-normal-vite">
      <i class="fa-solid fa-video text-4xl "></i>
      <h1 class="font-bold text-3xl ml-2">Movies</h1>
    </div>
    <form class="flex justify-center w-full">
      <input class="w-7/12 p-3 bg-black text-zinc-300 outline-none border-s rounded-s-lg" placeholder='Search...'>
      <button class="bg-zinc-600 px-4 text-white border-e rounded-e-lg">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  </header>
</template>

