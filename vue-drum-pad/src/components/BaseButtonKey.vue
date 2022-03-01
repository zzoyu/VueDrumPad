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
</script>

<template>
  <div
    class="cell"
    :class="{
      bigger: props.bigger,
      pressed: props.keyData?.key?.state === KeyState.Pressed,
      play: props.play,
      record: props.record,
    }"
    @mousedown="props.keyData?.pressDown()"
    @mouseup="props.keyData?.pressUp()"
    @touchstart="props.keyData?.pressDown()"
    @touchend="props.keyData?.pressUp()"
  >
    <slot>{{ props.keyData?.key?.name }}</slot>
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
