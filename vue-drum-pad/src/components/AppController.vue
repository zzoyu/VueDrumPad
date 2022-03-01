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

#sheet {
  padding: 5px;
  border-radius: 1rem;
  box-shadow: steelblue 0px 0px;
}

.note {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ease 0.2s;
  width: 50px;
  height: 50px;
  border-radius: 0.5rem;
  margin: 2px;
}
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

.note_head {
  display: flex;
  transition: all ease 0.2s;
  width: 50px;
  height: 50px;
  border-radius: 0.5rem;
  margin: 2px;
  background-color: steelblue;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  font-weight: bold;
  font-size: large;
}

.note_head.pressed {
  background-color: tomato;
}

.note.playing {
  box-shadow: blue 0px 0px 5px;
}
.note.pressed {
  border: darkblue -1px solid;
  background-color: blue;
}
</style>
