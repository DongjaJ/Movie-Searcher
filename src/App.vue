<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div class="flex flex-col h-screen">
    <NavBar />
    <RouterView v-slot="{ Component }">
      <Transition>
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
