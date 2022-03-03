<script setup lang="ts">
const props = withDefaults(defineProps<{ modelValue: boolean }>(), {
  modelValue: false,
});

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();

const click = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<template>
  <div class="note" @click="click" :class="{ pressed: props.modelValue }"></div>
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
.note.pressed {
  border: darkblue -1px solid;
  background-color: blue;
}
</style>
