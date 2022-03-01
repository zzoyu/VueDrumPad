import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import SoundManager from "../classes/SoundManager";
import KeyboardManager from "@/classes/KeyboardManager";
import Sheet from "@/classes/Sheet";
// import Stage from "@/classes/Stage";

enum AppState {
  Idle, // 기본 모드
  Playing, // 재생중
  Recording, // 녹음중
}

export interface State {
  bpm: number;
  measures: number;
  rows: number;
  state: AppState;
  sheet?: Sheet;
}
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: () => ({
    bpm: 220, // Beats Per Minute
    measures: 4, // 마디 수
    rows: 10, // 악기 수
    state: AppState.Idle, // 현재 상태
  }),
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
    async initialize({ state }) {
      await SoundManager.initialize();
      console.log("Sound initialized");
      KeyboardManager.initialize();
      state.sheet = new Sheet(state.rows, state.measures * 4);
    },
    updateBpm({ commit }, bpm: number): void {
      commit("bpm", bpm);
    },
    playSound(_, id: number): void {
      SoundManager.audioPlay(id);
    },
  },
  modules: {},
});
