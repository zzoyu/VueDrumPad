<script setup lang="ts">
import BaseButtonNote from "./BaseButtonNote.vue";
import { ref } from "vue";

interface Props {
  index: number;
  measures: number;
}

const props = withDefaults(defineProps<Props>(), {
  index: 0,
  measures: 4,
});

const rowData = ref([false, false, false, false]);
</script>

<template>
  <div class="row">
    <div class="note_head">{{ index }}</div>
    <base-button-note
      v-for="i in props.measures * 4"
      :key="`row_${props.index}_note_${i}`"
      v-model="rowData[i]"
    />
  </div>
</template>
