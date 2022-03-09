import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import SoundManager from "../classes/SoundManager";
import keyboardManager, { KeyboardManager } from "@/classes/KeyboardManager";
import Sheet from "@/classes/Sheet";
import { KeyState, SpecialKey } from "@/classes/Keyboard";
// import Stage from "@/classes/Stage";

export enum AppState {
  Idle, // 기본 모드
  Playing, // 재생중
  Recording, // 녹음중
}

export interface State {
  currentIndex: number;
  bpm: number;
  repeat: boolean;
  measures: number;
  rows: number;
  state: AppState;
  sheet?: Sheet;
  keyboardManager: KeyboardManager;
}
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: () => ({
    currentIndex: 0,
    bpm: 220, // Beats Per Minute
    repeat: true, // 반복재생
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
    currentIndex(state): AppState {
      return state.currentIndex;
    },
  },
  mutations: {
    SET_BPM(state, bpm) {
      state.bpm = bpm;
    },
    CHANGE_STATE(state, appState) {
      state.state = appState;
      if (state.state === AppState.Idle) state.currentIndex = 0;
    },
    ADD_INDEX(state) {
      if (state.state === AppState.Idle) return;
      state.currentIndex < state.measures * 4 - 1
        ? state.currentIndex++
        : (state.currentIndex = 0);
    },
    RECORD_INPUT(state, { keyId, currentIndex }) {
      state.sheet?.on(keyId, currentIndex);
    },
    TOGGLE_WHITELIST(state, name) {
      state.keyboardManager.toggleWhitelist(name);
    },
  },
  actions: {
    async initialize({ state, commit, dispatch }) {
      await SoundManager.initialize();
      console.log("Sound initialized");
      state.keyboardManager.initialize({
        recordCallback: (keyId: number) => {
          if (state.state !== AppState.Recording) return false;
          if (
            state.keyboardManager.whitelist.length === 0 ||
            state.keyboardManager.isKeyInWhiteList(keyId.toString())
          )
            commit("RECORD_INPUT", { keyId, currentIndex: state.currentIndex });
        },
        specialKeys: [
          new SpecialKey(
            {
              name: "+",
              state: KeyState.Idle,
            },
            (): boolean => {
              if (state.state !== AppState.Idle) return false;
              commit("CHANGE_STATE", AppState.Recording);
              dispatch("playSheet");
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
              dispatch("playSheet");
              return true;
            },
            () => {
              commit("CHANGE_STATE", AppState.Idle);
              return true;
            }
          ),
        ],
      });
      console.log("Keyboard initialized");
      state.sheet = new Sheet(state.rows, state.measures * 4);
      state.sheet?.setByArray([
        [true, false, false, false, false, true, false, false, false, false],
        [false, false, false, false, false, true, false, false, false, false],
        [false, false, false, false, true, true, false, false, false, false],
        [true, false, false, false, false, true, false, false, false, false],
        [true, false, false, false, false, true, false, false, false, false],
        [false, false, false, false, false, true, false, false, false, false],
        [false, false, false, false, true, true, false, false, false, false],
        [false, false, false, false, false, true, false, false, false, false],
        [true, false, false, false, false, true, false, false, false, false],
        [true, false, false, false, false, true, false, false, false, false],
        [false, false, false, false, true, true, false, false, false, false],
        [false, false, false, false, false, true, false, false, false, false],
        [true, false, false, false, false, true, false, false, false, false],
        [false, false, false, false, false, true, false, false, false, false],
        [false, false, false, false, true, true, false, false, false, false],
        [false, false, false, false, false, true, false, false, false, false],
      ]);
    },
    updateBpm({ commit }, bpm: number): void {
      commit("SET_BPM", bpm);
    },
    playSound(_, id: number): void {
      SoundManager.audioPlay(id);
    },
    playSheet({ state, commit, dispatch }) {
      if (state.state !== AppState.Idle) {
        state.sheet?.playColumn?.(state.currentIndex);
        setTimeout(() => {
          commit("ADD_INDEX");
          dispatch("playSheet");
        }, 1000 * (60 / state.bpm));
      }
    },
    clearSheet({ state }) {
      state?.sheet?.clear();
    },
    setSheet({ state }, notes: Array<Array<boolean>>) {
      state.sheet?.setByArray(notes);
    },

    toggleWhitelist({ commit }, name: string) {
      commit("TOGGLE_WHITELIST", name);
    },
  },
  modules: {},
});
