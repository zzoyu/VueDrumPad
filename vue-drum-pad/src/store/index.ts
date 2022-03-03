import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import SoundManager from "../classes/SoundManager";
import keyboardManager, { KeyboardManager } from "@/classes/KeyboardManager";
import Sheet from "@/classes/Sheet";
import { KeyState, SpecialKey } from "@/classes/Keyboard";
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
  keyboardManager: KeyboardManager;
}
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: () => ({
    bpm: 220, // Beats Per Minute
    measures: 4, // 마디 수
    rows: 10, // 악기 수
    state: AppState.Idle, // 현재 상태
    keyboardManager,
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
    keyboardManager(state) {
      return state.keyboardManager;
    },
    keyState(state) {
      return state.keyboardManager.getKeyState();
    },
    key(state) {
      return state.keyboardManager.keyList;
    },
    sheet(state): Sheet | undefined {
      return state.sheet;
    },
    state(state): AppState {
      return state.state;
    },
  },
  mutations: {
    SET_BPM(state, bpm) {
      state.bpm = bpm;
    },
    CHANGE_STATE(state, appState) {
      state.state = appState;
    },
  },
  actions: {
    async initialize({ state, commit }) {
      await SoundManager.initialize();
      console.log("Sound initialized");
      state.keyboardManager.initialize([
        new SpecialKey(
          {
            name: "+",
            state: KeyState.Idle,
          },
          (): boolean => {
            if (state.state !== AppState.Idle) return false;
            commit("CHANGE_STATE", AppState.Recording);
            return true;
          },
          () => {
            commit("CHANGE_STATE", AppState.Idle);
            return true;
          }
        ),
        new SpecialKey(
          {
            name: "Enter",
            state: KeyState.Idle,
          },
          () => {
            if (state.state !== AppState.Idle) return false;
            commit("CHANGE_STATE", AppState.Playing);
            return true;
          },
          () => {
            commit("CHANGE_STATE", AppState.Idle);
            return true;
          }
        ),
      ]);
      console.log("Keyboard initialized");
      state.sheet = new Sheet(state.rows, state.measures * 4);
    },
    updateBpm({ commit }, bpm: number): void {
      commit("SET_BPM", bpm);
    },
    playSound(_, id: number): void {
      SoundManager.audioPlay(id);
    },
  },
  modules: {},
});
