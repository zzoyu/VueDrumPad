<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";

const text = ref<HTMLInputElement>();

const store = useStore(key);

const copy = function () {
  text.value?.select(); // 선택
  document.execCommand("copy"); // 복사
  //   text.value?.setSelectionRange(0, 0); // 선택영역 초기화
};
</script>

<template>
  <div class="modal">
    <button class="close" @click="store.dispatch('toggleModal')">X</button>
    <h3>복사하기</h3>
    <div>
      <input
        ref="text"
        type="text"
        :value="store.getters.sheet.getByCode()"
        readonly
      />
      <button @click="copy">복사</button>
    </div>
  </div>
</template>

<style>
.close {
  position: absolute;
  right: 5px;
  top: 5px;
  color: slategray;
  background: none;
  border: none;
  padding: 0;
  font-weight: bolder;
  font-size: large;
}
h3 {
  padding: 0;
  margin: 0;
}
.modal {
  width: 50vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border: 0.5rem solid slategray;
  max-width: 300px;
  max-height: 100px;
  border-radius: 1rem;
}
</style>
