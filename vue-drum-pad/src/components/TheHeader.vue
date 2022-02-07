<template>
  <header>
    <h1>[작업중]Vue.js DrumPad🥁</h1>

    <div>
      <input type="number" name="bpm" id="bpm" step="10" v-model="bpm" />
      <label for="bpm">BPM</label>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const bpm = computed({
      get() {
        return store.getters.bpm;
      },
      set(newValue) {
        store.dispatch("updateBpm", newValue);
      },
    });
    return { bpm };
  },
});
</script>

<style scoped>
h1 {
  font-weight: 900;
  background: linear-gradient(to right, steelblue, lightsteelblue);
  background-clip: text;
  -webkit-text-fill-color: transparent;
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
</style>
