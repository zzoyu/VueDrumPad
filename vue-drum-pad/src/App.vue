<script setup lang="ts">
import AppMain from "./components/AppMain.vue";
</script>

<template>
  <Suspense>
    <app-main />
    <template #fallback>
      <h1>Loading...</h1>
    </template>
  </Suspense>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
