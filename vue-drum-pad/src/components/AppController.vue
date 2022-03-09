<script setup lang="ts">
import { computed } from "vue";
import TheBase from "@/components/TheBase.vue";
import TheCopyDialog from "@/components/TheCopyDialog.vue";
import { useStore } from "vuex";
import { key } from "@/store";

const store = useStore(key);
await store.dispatch("initialize");

const showModal = computed(() => store.getters.isShowModal);
</script>

<template>
  <the-base :class="{ blur: showModal }" />
  <the-copy-dialog v-if="showModal"></the-copy-dialog>
</template>

<style>
div {
  padding: 0px;
  margin: 0px;
}
article {
  display: flex;
  flex-direction: row;
}

.blur {
  filter: blur(2px);
  pointer-events: none;
}

.row {
  display: flex;
  flex-direction: row;
}

.col {
  display: flex;
  flex-direction: column;
  width: fit-content;
}
</style>
