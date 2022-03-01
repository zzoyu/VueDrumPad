<script setup lang="ts">
import { useStore } from "vuex";
import { key } from "@/store";

import SoundManager from "@/classes/SoundManager";
import KeyboardManager from "@/classes/KeyboardManager";
import AppController from "./AppController.vue";

const store = useStore(key);
await store.dispatch("initialize");
</script>

<template>
  <AppController />
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
