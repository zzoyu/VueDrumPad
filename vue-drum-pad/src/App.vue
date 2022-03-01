<template>
  <app-main />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppMain from "./components/AppMain.vue";

export default defineComponent({
  name: "App",
  components: {
    AppMain,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
