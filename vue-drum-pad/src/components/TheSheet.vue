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

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
// import SheetRow from "./SheetRow.vue";

export default defineComponent({
  // components: { SheetRow },

  setup() {
    const store = useStore(key);
    const rows = computed(() => {
      return store.getters.rows;
    });
    const measures = computed(() => {
      return store.getters.measures;
    });
    return { rows, measures };
  },
});
</script>

<style></style>
