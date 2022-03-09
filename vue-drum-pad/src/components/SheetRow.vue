<script setup lang="ts">
import BaseButtonNote from "./BaseButtonNote.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { key, AppState } from "@/store";
import BaseButtonNoteHead from "./BaseButtonNoteHead.vue";

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

const isKeyInWhiteList = computed(() => (name: string) => {
  return store.getters.keyboardManager.isKeyInWhiteList(name);
});
</script>

<template>
  <div class="row">
    <base-button-note-head
      :name="index.toString()"
      :pressed="isKeyInWhiteList(index.toString())"
      @update:record="(value:string)=>store.dispatch('toggleWhitelist', value)"
    ></base-button-note-head>
    <base-button-note
      v-for="(note, i) in row"
      :key="`row_${props.index}_note_${i}`"
      v-model="row[i]"
      :state="
        store.getters.currentIndex === i &&
        store.getters.state !== AppState.Idle
          ? store.getters.state
          : undefined
      "
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
  flex-shrink: 0;
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
  flex-shrink: 0;
  align-self: flex-start;
  position: -webkit-sticky;
  position: sticky;
}

.note_head.pressed {
  background-color: tomato;
}
</style>
