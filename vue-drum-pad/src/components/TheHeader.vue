<template>
  <header>
    <h1>DrumPad🥁</h1>

    <div>
      <div>
        <input type="number" name="bpm" id="bpm" step="10" v-model="bpm" />
        <label for="bpm">BPM</label>
      </div>
      <div>
        <button @click="store.dispatch('clearSheet')">초기화</button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
  setup() {
    const store = useStore(key);
    const bpm = computed({
      get() {
        return store.getters.bpm;
      },
      set(newValue) {
        store.dispatch("updateBpm", newValue);
      },
    });
    return { bpm, store };
  },
});
</script>

<style scoped>
h1 {
  font-weight: 900;
  background: linear-gradient(to right, steelblue, lightsteelblue);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  /* display: flex; */
  flex-grow: 2;
  text-align: center;
  justify-content: center;
}

header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
#bpm {
  border-radius: 1rem;
  height: 1.5rem;
  font-size: large;
  width: 4rem;
  text-align: center;
  background: steelblue;
  color: white;
  border-width: 0;
}
header > div {
  display: flex;
  flex-grow: 1;
  justify-content: space-evenly;
  align-items: center;
}
</style>
