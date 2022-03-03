<script setup lang="ts">
import TheBase from "./TheBase.vue";
</script>

<template>
  <the-base />
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
