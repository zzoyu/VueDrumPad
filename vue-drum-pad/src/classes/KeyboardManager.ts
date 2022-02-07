export enum KeyState {
  Idle,
  Pressed,
  Recording,
}

export interface Key {
  id: string;
  state: KeyState;
  src: string;
}

export class KeyboardManager {
  keyList: Array<Key> = [];

  constructor() {
    this.addKey({
      id: "0",
      state: KeyState.Idle,
      src: "",
    });
  }

  addKey(key: Key) {
    this.keyList.push(key);
  }
}
