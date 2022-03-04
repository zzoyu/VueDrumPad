<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import SheetRow from "./SheetRow.vue";

const store = useStore(key);
const rows = computed(() => {
  return store.getters.rows;
});
const measures = computed(() => {
  return store.getters.measures;
});
</script>

<template>
  <div class="col" id="sheet">
    <sheet-row
      v-for="row in rows"
      :key="`row_${rows - row}`"
      :index="rows - row"
      :measures="measures"
    />
  </div>
</template>

<style>
#sheet {
  padding: 5px;
  border-radius: 1rem;
  box-shadow: steelblue 0px 0px;
  display: flex;
  /* overflow-x: scroll; */
}
</style>
