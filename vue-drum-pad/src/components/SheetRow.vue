<script setup lang="ts">
import BaseButtonNote from "./BaseButtonNote.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";

const store = useStore(key);

interface Props {
  index: number;
  measures: number;
}

const props = withDefaults(defineProps<Props>(), {
  index: 0,
  measures: 4,
});

const row = computed(() => {
  console.log(store.getters.sheet);
  return store.getters.sheet?.getRow?.(props.index);
});
</script>

<template>
  <div class="row">
    <div class="note_head">{{ index }}</div>
    <base-button-note
      v-for="(note, i) in row"
      :key="`row_${props.index}_note_${i}`"
      v-model="row[i].isOn"
    />
  </div>
</template>

<style>
.note {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ease 0.2s;
  width: 50px;
  height: 50px;
  border-radius: 0.5rem;
  margin: 2px;
}

.note_head {
  display: flex;
  transition: all ease 0.2s;
  width: 50px;
  height: 50px;
  border-radius: 0.5rem;
  margin: 2px;
  background-color: steelblue;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  font-weight: bold;
  font-size: large;
}

.note_head.pressed {
  background-color: tomato;
}
</style>
