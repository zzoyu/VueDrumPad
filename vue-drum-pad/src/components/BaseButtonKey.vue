<script setup lang="ts">
import Key, { KeyState } from "@/classes/Keyboard";

interface Props {
  // audioSource: string;
  bigger?: boolean;
  keyData?: Key;
  play?: boolean;
  record?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  // bigger: false,
});

const disabled = !props.keyData?.sound;
</script>

<template>
  <div
    class="cell"
    :class="{
      bigger: props.bigger,
      pressed: props.keyData?.key?.state === KeyState.Pressed,
      play: props.play,
      record: props.record,
      disabled,
    }"
    @mousedown="props.keyData?.pressDown()"
    @mouseup="props.keyData?.pressUp()"
    @touchstart="props.keyData?.pressDown()"
    @touchend="props.keyData?.pressUp()"
  >
    <slot v-if="disabled === false">{{ props.keyData?.key?.name }}</slot>
    <slot v-else>{{ props.keyData?.key?.name }}</slot>
  </div>
</template>

<style scoped>
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ease 0.2s;
  width: 100px;
  height: 100px;
  border-radius: 1rem;
  box-shadow: steelblue 0px 0px 5px;
  margin: 2px;
  user-select: none;
}

.cell.disabled:not(.play, .record) {
  background-color: lightgray;
}

.cell.pressed {
  background-color: steelblue;
}

.cell:hover {
  background-color: steelblue;
}

.record.pressed {
  background-color: tomato;
}

.record:hover {
  background-color: tomato;
}

.bigger {
  flex-grow: 1;
}
</style>
