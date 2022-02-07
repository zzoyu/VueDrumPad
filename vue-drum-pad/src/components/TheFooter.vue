<template>
  <footer>
    <a href="https://github.com/zzoyu"><mark>zzoyu💩</mark></a>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped>
footer {
  padding: 1rem;
}
mark {
  border-radius: 0.5rem;
  padding: 0.3rem;
  color: white;
  background: black;
}
</style>
