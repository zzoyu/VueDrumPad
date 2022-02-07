<template>
  <div class="col">
    <the-header />
    <div class="row">
      <div class="col">
        <div class="row" v-for="row in 3" :key="`row_${row}`">
          <base-button-key
            :id="10 - (4 - col + (row - 1) * 3)"
            v-for="col in 3"
            :key="`row_${row}_${col}`"
            v-on:activate="activate"
          />
        </div>
        <div class="row">
          <base-button-key :id="0" bigger v-on:activate="activate" />
          <base-button-key id="." />
        </div>
      </div>
      <div class="col">
        <base-button-key id="+" bigger />
        <base-button-key id="Enter" bigger />
      </div>
    </div>
    <the-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import BaseButtonKey from "./BaseButtonKey.vue";
import TheFooter from "./TheFooter.vue";
import TheHeader from "./TheHeader.vue";

export default defineComponent({
  components: { BaseButtonKey, TheHeader, TheFooter },
  setup() {
    const store = useStore();

    return {
      activate(id: number) {
        store.dispatch("playSound", id);
      },
    };
  },

  data() {
    return {};
  },
});
</script>

<style></style>
