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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  model: {
    prop: "value",
    event: "change",
  },
});
</script>

<template>
  <div class="note" @click="click"></div>
</template>
