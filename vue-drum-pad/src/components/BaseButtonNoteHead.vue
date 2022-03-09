<script setup lang="ts">
const props = defineProps<{ pressed: boolean; name: string }>();

const emit = defineEmits<{
  (event: "update:record", value: string): void;
}>();
</script>

<template>
  <div
    class="note_head"
    :class="{ pressed: props.pressed }"
    @click="emit('update:record', props.name)"
  >
    {{ props.name }}
  </div>
</template>
