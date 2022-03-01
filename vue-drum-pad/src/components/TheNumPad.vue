<script setup lang="ts">
import { useStore } from "vuex";
import { key } from "@/store";
import TheFooter from "./TheFooter.vue";
import TheHeader from "./TheHeader.vue";
import BaseButtonKey from "./BaseButtonKey.vue";
import KeyboardManager from "@/classes/KeyboardManager";

const store = useStore(key);

const activate = (id: number) => {
  store.dispatch("playSound", id);
};
</script>

<template>
  <div class="col">
    <the-header />
    <div class="row">
      <div class="col">
        <div class="row" v-for="row in 3" :key="`row_${row}`">
          <base-button-key
            :key-data="store.getters.key[10 - (4 - col + (row - 1) * 3)]"
            v-for="col in 3"
            :key="`row_${row}_${col}`"
          />
        </div>
        <div class="row">
          <base-button-key :key-data="store.getters.key[0]" bigger />
          <base-button-key>.</base-button-key>
        </div>
      </div>
      <div class="col">
        <base-button-key
          :key-data="store.getters.keyboardManager.getKey('+')"
          bigger
          record
        ></base-button-key>
        <base-button-key
          :key-data="store.getters.keyboardManager.getKey('Enter')"
          bigger
          play
        ></base-button-key>
      </div>
    </div>
    <the-footer />
  </div>
</template>

<style></style>
