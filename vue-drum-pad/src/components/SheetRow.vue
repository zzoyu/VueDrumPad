<template>
  <div class="row">
    <div class="note_head">{{ index }}</div>
    <base-button-note
      v-for="i in measures * 4"
      :key="`row_${index}_note_${i}`"
    />
  </div>
</template>

<script lang="ts">
import BaseButtonNote from "./BaseButtonNote.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { BaseButtonNote },
  setup() {
    return {};
  },

  props: {
    index: Number,
    measures: Number,
  },
});
</script>

<style></style>
