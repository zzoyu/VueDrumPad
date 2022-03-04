<script setup lang="ts">
import Beat from "@/classes/Beat";
import { AppState } from "@/store";

const props = withDefaults(
  defineProps<{ modelValue: Beat; state: AppState }>(),
  {
    // modelValue: false,
    state: AppState.Idle,
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: Beat): void;
}>();

const click = () => {
  const temp = props.modelValue;
  temp.isOn = !temp.isOn;
  emit("update:modelValue", temp);
};
</script>

<template>
  <div
    class="note"
    @click="click"
    :class="{
      pressed: props.modelValue.isOn,
      playing: state === AppState.Playing,
      recording: state === AppState.Recording,
    }"
  ></div>
</template>

<style scoped>
.note:nth-of-type(8n + 2),
.note:nth-of-type(8n + 3),
.note:nth-of-type(8n + 4),
.note:nth-of-type(8n + 5) {
  background-color: rgba(192, 192, 192, 0.6);
}

.note:nth-of-type(8n + 6),
.note:nth-of-type(8n + 7),
.note:nth-of-type(8n + 8),
.note:nth-of-type(8n + 9) {
  background-color: rgba(176, 196, 222, 0.6);
}
.note.playing {
  box-shadow: blue 0px 0px 5px;
}
.note.recording {
  box-shadow: red 0px 0px 5px;
}

.note.pressed {
  border: darkblue -1px solid;
  background-color: blue;
}
</style>
