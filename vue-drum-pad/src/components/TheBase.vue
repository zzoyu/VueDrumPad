<template>
  <article>
    <the-num-pad />
    <the-sheet />
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheNumPad from "./TheNumPad.vue";
import TheSheet from "./TheSheet.vue";

export default defineComponent({
  components: { TheSheet, TheNumPad },
  setup() {
    return {};
  },
});
</script>
