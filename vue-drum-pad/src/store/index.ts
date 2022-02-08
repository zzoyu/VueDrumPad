import { createStore } from "vuex";
import { SoundManager } from "../classes/SoundManager";
import { KeyboardManager } from "@/classes/KeyboardManager";
import Stage from "@/classes/Stage";

enum AppState {
  Idle, // 기본 모드
  Playing, // 재생중
  Recording, // 녹음중
}

export default createStore({
  state: {
    bpm: 220, // Beats Per Minute
    measures: 4, // 마디 수
    rows: 10, // 악기 수
    state: AppState.Idle, // 현재 상태
    stage: new Stage(),
    // soundManager: new SoundManager(),
    keyboardManager: new KeyboardManager(),
  },
  getters: {
    bpm(state) {
      return state?.bpm;
    },
    rows(state) {
      return state?.rows;
    },
    measures(state) {
      return state?.measures;
    },
  },
  mutations: {
    bpm(state, bpm) {
      state.bpm = bpm;
    },
  },
  actions: {
    updateBpm({ commit }, bpm) {
      commit("bpm", bpm);
    },
    playSound({ state }, id) {
      // state.soundManager.audioPlay(id);
      state.stage.play();
    },
  },
  modules: {},
});
