<script setup lang="ts">
import AppController from "@/components/AppController.vue";
</script>

<template>
  <Suspense>
    <app-controller />
    <template #fallback>
      <h1>Initializing ...</h1>
    </template>
  </Suspense>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
