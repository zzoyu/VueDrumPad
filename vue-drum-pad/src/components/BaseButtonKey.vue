<template>
  <div class="cell" :id="id" :class="{ bigger }" @click="$emit('activate', id)">
    {{ id }}
    <audio :src="audioSource" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },

  props: {
    audioSource: String,
    bigger: Boolean,
    id: Number,
  },
});
</script>

<style scoped>
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ease 0.2s;
  width: 100px;
  height: 100px;
  border-radius: 1rem;
  box-shadow: steelblue 0px 0px 5px;
  margin: 2px;
  user-select: none;
}

.cell.pressed {
  background-color: steelblue;
}

.cell:hover {
  background-color: steelblue;
}

#\+.pressed {
  background-color: tomato;
}

#\+:hover {
  background-color: tomato;
}

.bigger {
  flex-grow: 1;
}
</style>
