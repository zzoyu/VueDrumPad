<script setup lang="ts">
import { useStore } from "vuex";
import { key } from "@/store";

import AppController from "./AppController.vue";

const store = useStore(key);
await store.dispatch("initialize");
</script>

<template>
  <transition name="fade">
    <app-controller />
  </transition>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
